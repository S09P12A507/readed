package ssafy.readed.domain.bookclub.service;

import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.ConnectionProperties.Builder;
import io.openvidu.java.client.ConnectionType;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.Session;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import javax.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import ssafy.readed.domain.book.entity.Book;
import ssafy.readed.domain.book.repository.BookRepository;
import ssafy.readed.domain.bookclub.controller.dto.OpenBookclubRequestDto;
import ssafy.readed.domain.bookclub.entity.Bookclub;
import ssafy.readed.domain.bookclub.entity.Participant;
import ssafy.readed.domain.bookclub.repository.BookclubRepository;
import ssafy.readed.domain.bookclub.repository.ParticipantRepository;
import ssafy.readed.domain.bookclub.service.dto.BookclubResponseDto;
import ssafy.readed.domain.bookclub.service.dto.MemberDto;
import ssafy.readed.domain.member.entity.Member;
import ssafy.readed.domain.member.repository.MemberRepository;
import ssafy.readed.global.exception.GlobalRuntimeException;
import ssafy.readed.global.service.S3FileService;

@Service
@Slf4j
public class BookclubServiceImpl implements BookclubService {

    BookclubRepository bookclubRepository;

    BookRepository bookRepository;

    MemberRepository memberRepository;

    ParticipantRepository participantRepository;

    S3FileService s3FileService;

    private Map<Long, List<Member>> memberList; //각 방의 멤버 리스트

    private Map<Long, Session> sessionMap; // roomId -> Session

    private Map<Long, String> tokenMap;

    private Map<Long, Bookclub> bookclubMap;
    private String url;
    private String secret;
    private OpenVidu openVidu;

    private Long roomId;

    public BookclubServiceImpl(BookclubRepository bookclubRepository, BookRepository bookRepository,
            MemberRepository memberRepository, ParticipantRepository participantRepository, S3FileService s3FileService,
            @Value("${openvidu.url}") String url, @Value("${openvidu.secret}") String secret) {
        this.bookclubRepository = bookclubRepository;
        this.bookRepository = bookRepository;
        this.memberRepository = memberRepository;
        this.participantRepository = participantRepository;
        this.s3FileService = s3FileService;
        this.url = url;
        this.secret = secret;
        this.openVidu = new OpenVidu(this.url, this.secret);
        this.memberList = new ConcurrentHashMap<>();
        this.sessionMap = new ConcurrentHashMap<>();
        this.tokenMap = new ConcurrentHashMap<>();
        this.bookclubMap = new ConcurrentHashMap<>();
        this.roomId = 1L;
    }

    @Override
    @Transactional
    public void openBookclubSession(Member member,
            OpenBookclubRequestDto requestDto) {

        try {

            Session session = this.openVidu.createSession();
            ConnectionProperties connectionProperties = new Builder().type(ConnectionType.WEBRTC)
                    .build();
            String token = session.createConnection(connectionProperties).getToken();


            if(isEnrolled(member.getId())){
                throw new GlobalRuntimeException("이미 다른 방에 들어가 있습니다.",HttpStatus.CONFLICT);
            }

            //Find Book
            Book findBook = bookRepository.findById(requestDto.getBookId()).orElseThrow(
                    () -> new GlobalRuntimeException("존재하지 않는 책 번호입니다", HttpStatus.NOT_FOUND));

            //Find Host Member
            Member findMember = memberRepository.findById(member.getId()).orElseThrow(
                    () -> new GlobalRuntimeException("없는 멤버입니다.", HttpStatus.NOT_FOUND));

            Bookclub bookclub = requestDto.toEntity(findMember,findBook, roomId);

//            bookclubMap.put(bookclubId, bookclub);
//            participantRepository.save(
//                    Participant.builder().member(findMember).bookclub(bookclub).build());
//            findMember.getBookclubList().add(bookclub);

            bookclubMap.put(roomId, bookclub);
            sessionMap.put(roomId, session);
            tokenMap.put(member.getId(), session.getSessionId());
            memberList.put(roomId, new ArrayList<>());
            memberList.get(roomId).add(findMember);
            roomId++;

        } catch (Exception e) {
            e.printStackTrace();
            throw new GlobalRuntimeException("북클럽 생성 에러", HttpStatus.CONFLICT);
        }
    }

    @Override
    public void joinBookclubSession(Long bookclubId, Member member) {
        try {
            ConnectionProperties connectionProperties = new ConnectionProperties.Builder().type(
                    ConnectionType.WEBRTC).build();

            String token = this.sessionMap.get(bookclubId).createConnection(connectionProperties)
                    .getToken();

            Member findMember = memberRepository.findById(member.getId()).orElseThrow(
                    () -> new GlobalRuntimeException("없는 멤버입니다.", HttpStatus.NOT_FOUND));


            if(isEnrolled(member.getId())){
                throw new GlobalRuntimeException("이미 다른 방에 들어가 있습니다.",HttpStatus.CONFLICT);
            }

            if (isFull(bookclubId)) {
                throw new GlobalRuntimeException("방이 꽉 찼습니다.", HttpStatus.PRECONDITION_FAILED);
            }

            if (!isExist(bookclubId)) {
                throw new GlobalRuntimeException("방이 없습니다.", HttpStatus.NOT_FOUND);
            }

            memberList.get(bookclubId).add(findMember);

            tokenMap.put(member.getId(), sessionMap.get(bookclubId).getSessionId());

        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
            e.printStackTrace();
            throw new GlobalRuntimeException("북클럽 참가 에러", HttpStatus.CONFLICT);
        }
    }



    @Override
    public List<BookclubResponseDto> getBookclubList() {
        List<BookclubResponseDto> list = new ArrayList<>();
        for (Bookclub bookclub : bookclubMap.values()) {
            String url = s3FileService.getS3Url(bookclub.getBook().getBookCoverFile());
            List<MemberDto> memberDtoList = new ArrayList<>();
            List<Member> curMemberList = memberList.get(bookclub.getRoomId());
            for (Member member : curMemberList) {
                MemberDto memberDto = MemberDto.builder()
                        .memberId(member.getId())
                        .memberNickname(member.getNickname())
                        .memberProfileImage(s3FileService.getS3Url(member.getMemberProfileFile()))
                        .build();
                memberDtoList.add(memberDto);
            }
            list.add(BookclubResponseDto.from(bookclub,url,memberDtoList,false));
            log.info("bookclub title : "+bookclub.getBookclubTitle());
            log.info("bookclub img url : "+url);
        }

        return list;
    }

    @Override
    public BookclubResponseDto getBookclubDetail(Long roomId, Member authMember) {
        List<MemberDto> memberDtoList = new ArrayList<>();
        Bookclub bookclub = bookclubMap.get(roomId);
        String url = s3FileService.getS3Url(bookclub.getBook().getBookCoverFile());
        List<Member> curMemberList = memberList.get(roomId);

        Boolean isJoined = false;
        for (Member member : curMemberList) {
            if(member.getId() == authMember.getId())
                isJoined = true;
            MemberDto memberDto = MemberDto.builder()
                    .memberId(member.getId())
                    .memberNickname(member.getNickname())
                    .memberProfileImage(s3FileService.getS3Url(member.getMemberProfileFile()))
                    .build();
            memberDtoList.add(memberDto);
        }
        return BookclubResponseDto.from(bookclub,url,memberDtoList,isJoined);
    }

    @Override
    public List<BookclubResponseDto> getMyBookclubList(Member member) {
        List<BookclubResponseDto> dtoList = new ArrayList<>();

        List<Participant> participants = bookclubRepository.selectParticipantsByMemeberIdFetchJoin(
                member.getId());
        List<Bookclub> list = participants.stream()
                .map(Participant::getBookclub).toList();

        for (Bookclub bookclub : list) {
            String url = s3FileService.getS3Url(bookclub.getBook().getBookCoverFile());
            BookclubResponseDto dto = BookclubResponseDto.from(bookclub, url, null,false);
            dtoList.add(dto);
        }

        return dtoList;
    }


    private static void authCheck(Long memberId, Member member) {
        if (!memberId.equals(member.getId())) {
            throw new GlobalRuntimeException("해당 id 이용자의 북클럽 리스트를 불러올 권한이 없습니다.",
                    HttpStatus.FORBIDDEN);
        }
    }

    private Bookclub getBookclub(Long bookClubId) {
        return bookclubRepository.findById(bookClubId).orElseThrow(
                () -> new GlobalRuntimeException("해당 id의 북클럽이 존재하지 않습니다.", HttpStatus.NOT_FOUND));
    }



    private boolean isFull(Long bookclubId) {
        Integer maxMember = bookclubMap.get(bookclubId).getParticipantCount();
        return maxMember <= memberList.get(bookclubId).size();
    }


    private boolean isExist(Long bookclubId) {
        return sessionMap.get(bookclubId) != null;
    }

    private boolean isEnrolled(Long memberId) {
        return tokenMap.get(memberId) != null;
    }


    @Override
    public void deleteBookclub(Long bookclubId, Member member) {
        Bookclub findBookclub = getBookclub(bookclubId);
        sessionMap.remove(bookclubId);
        memberList.remove(bookclubId);
        findBookclub.finish();
    }

    @Override
    public void leaveBookclub(Long bookclubId, Member member) {

        Long id = member.getId();

        List<Member> curMemberList = memberList.get(bookclubId);

        Member findMember = memberRepository.findById(member.getId()).orElseThrow(
                () -> new GlobalRuntimeException("없는 멤버입니다.", HttpStatus.NOT_FOUND));

        for (Member member1 : curMemberList) {
            if(member1.getId().equals(id)){
                curMemberList.remove(member1);
                break;
            }
        }

        log.info("나간 멤버 : "+findMember.getNickname());

        tokenMap.remove(findMember.getId());

        for (Member member1 : curMemberList) {
            log.info("현재 member 닉네임 : "+member1.getNickname());
        }

        if(curMemberList.size() == 0){
            sessionMap.remove(bookclubId);
            bookclubMap.remove(bookclubId);
        }

    }

    @Override
    public String startBookclubSession(Member member) {
        String token = tokenMap.get(member.getId());

        if(token == null){
            throw new GlobalRuntimeException("해당 북클럽에 참가한 유저가 아닙니다.",HttpStatus.CONFLICT);
        }

        return token;
    }


}

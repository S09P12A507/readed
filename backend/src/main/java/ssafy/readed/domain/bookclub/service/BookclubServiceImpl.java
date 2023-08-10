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
import javax.annotation.PostConstruct;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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
import ssafy.readed.domain.bookclub.service.dto.OpenBookclubResponseDto;
import ssafy.readed.domain.member.entity.Member;
import ssafy.readed.domain.member.repository.MemberRepository;
import ssafy.readed.global.exception.GlobalRuntimeException;

@Service
public class BookclubServiceImpl implements BookclubService {

    BookclubRepository bookclubRepository;

    BookRepository bookRepository;

    MemberRepository memberRepository;

    ParticipantRepository participantRepository;

    private Map<Long, List<Member>> memberList; //각 방의 멤버 리스트

    private Map<Long, Session> sessionMap; // roomId -> Session

    private String url;
    private String secret;
    private OpenVidu openVidu;

    public BookclubServiceImpl(BookclubRepository bookclubRepository, BookRepository bookRepository,
            MemberRepository memberRepository, ParticipantRepository participantRepository,
            @Value("${openvidu.url}") String url, @Value("${openvidu.secret}") String secret) {
        this.bookclubRepository = bookclubRepository;
        this.bookRepository = bookRepository;
        this.memberRepository = memberRepository;
        this.participantRepository = participantRepository;
        this.url = url;
        this.secret = secret;
        this.openVidu = new OpenVidu(this.url, this.secret);
        this.memberList = new ConcurrentHashMap<>();
        this.sessionMap = new ConcurrentHashMap<>();
    }

    @Override
    @Transactional
    public OpenBookclubResponseDto openBookclubSession(Member member,
            OpenBookclubRequestDto requestDto) {

        try {

            Session session = this.openVidu.createSession();
            ConnectionProperties connectionProperties = new Builder().type(ConnectionType.WEBRTC)
                    .build();
            String token = session.createConnection(connectionProperties).getToken();

            //Find Book
            Book findBook = bookRepository.findById(requestDto.getBookId()).orElseThrow(
                    () -> new GlobalRuntimeException("존재하지 않는 책 번호입니다", HttpStatus.NOT_FOUND));

            //Find Host Member
            Member findMember = memberRepository.findById(member.getId()).orElseThrow(
                    () -> new GlobalRuntimeException("없는 멤버입니다.", HttpStatus.NOT_FOUND));

            Bookclub bookclub = requestDto.toEntity(findMember,findBook);

            bookclubRepository.save(bookclub);
            participantRepository.save(
                    Participant.builder().member(findMember).bookclub(bookclub).build());
            findMember.getBookclubList().add(bookclub);

            sessionMap.put(bookclub.getId(), session);
            memberList.put(bookclub.getId(), new ArrayList<>());
            memberList.get(bookclub.getId()).add(findMember);

            return OpenBookclubResponseDto.builder().token(token).build();

        } catch (Exception e) {
            e.printStackTrace();
            throw new GlobalRuntimeException("북클럽 생성 에러", HttpStatus.CONFLICT);
        }
    }

    @Override
    public String getBookclubToken(Long bookclubId, Member member) {
        try {
            ConnectionProperties connectionProperties = new ConnectionProperties.Builder().type(
                    ConnectionType.WEBRTC).build();

            String token = this.sessionMap.get(bookclubId).createConnection(connectionProperties)
                    .getToken();

            memberList.get(bookclubId).add(member);

            if (isFull(bookclubId)) {
                throw new GlobalRuntimeException("방이 꽉 찼습니다.", HttpStatus.PRECONDITION_FAILED);
            }

            if (!isExist(bookclubId)) {
                throw new GlobalRuntimeException("방이 없습니다.", HttpStatus.NOT_FOUND);
            }

            return token;
        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
            e.printStackTrace();
            throw new GlobalRuntimeException("북클럽 참가 에러", HttpStatus.CONFLICT);
        }
    }

    @Override
    public List<BookclubResponseDto> getBookclubList() {
        return bookclubRepository.findAllByIsFinished(false).stream().map(BookclubResponseDto::from).toList();
    }

    @Override
    public BookclubResponseDto getBookclubDetail(Long bookClubId) {
        return BookclubResponseDto.from(getBookclub(bookClubId));
    }

    @Override
    public List<BookclubResponseDto> getMyBookclubList(Member member) {
        return bookclubRepository.selectParticipantsByMemeberIdFetchJoin(member.getId()).stream()
                .map(Participant::getBookclub).map(BookclubResponseDto::from).toList();
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


    @Override
    public boolean isFull(Long bookclubId) {
        Integer maxMember = getBookclub(bookclubId).getParticipantCount();
        return maxMember <= memberList.get(bookclubId).size();
    }

    @Override
    public boolean isExist(Long bookclubId) {
        return sessionMap.get(bookclubId) != null;
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
        Bookclub findBookclub = getBookclub(bookclubId);
        Member findMember = memberRepository.findById(member.getId()).orElseThrow(
                () -> new GlobalRuntimeException("해당하는 id의 멤버가 없습니다", HttpStatus.NOT_FOUND));

        List<Member> curMemberList = memberList.get(bookclubId);

        curMemberList.remove(findMember);
//        findBookclub.get
        //TODO: 북클럽 떠나는거 구현

    }


}

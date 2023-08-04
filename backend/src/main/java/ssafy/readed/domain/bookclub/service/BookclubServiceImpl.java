package ssafy.readed.domain.bookclub.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import ssafy.readed.domain.bookclub.entity.Bookclub;
import ssafy.readed.domain.bookclub.entity.Participant;
import ssafy.readed.domain.bookclub.repository.BookclubRepository;
import ssafy.readed.domain.bookclub.service.dto.BookclubResponseDto;
import ssafy.readed.domain.member.entity.Member;
import ssafy.readed.global.exception.GlobalRuntimeException;

@Service
@RequiredArgsConstructor
public class BookclubServiceImpl implements BookclubService {

    private final BookclubRepository bookclubRepository;

    @Override
    public List<BookclubResponseDto> getBookclubList() {
        return bookclubRepository.findAll().stream().map(BookclubResponseDto::from).toList();
    }

    @Override
    public BookclubResponseDto getBookclubDetail(Long bookClubId) {
        return BookclubResponseDto.from(getBookclub(bookClubId));
    }

    @Override
    public List<BookclubResponseDto> getMyBookclubList(Long memberId, Member member) {
        authCheck(memberId, member);

        return bookclubRepository.selectParticipantsByMemeberIdFetchJoin(memberId)
                .stream().map(Participant::getBookclub).map(BookclubResponseDto::from).toList();
    }

    private static void authCheck(Long memberId, Member member) {
        if (!memberId.equals(member.getId())) {
            throw new GlobalRuntimeException("해당 id 이용자의 북클럽 리스트를 불러올 권한이 없습니다.",
                    HttpStatus.FORBIDDEN);
        }
    }

    private Bookclub getBookclub(Long bookClubId) {
        Bookclub bookclub = bookclubRepository.findById(bookClubId).orElseThrow(
                () -> new GlobalRuntimeException("해당 id의 북클럽이 존재하지 않습니다.", HttpStatus.BAD_REQUEST));
        return bookclub;
    }
}

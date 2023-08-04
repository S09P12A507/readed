package ssafy.readed.domain.bookclub.service;


import java.util.List;
import ssafy.readed.domain.bookclub.service.dto.BookclubResponseDto;
import ssafy.readed.domain.member.entity.Member;

public interface BookclubService {

    List<BookclubResponseDto> getBookclubList();

    BookclubResponseDto getBookclubDetail(Long bookClubId);

    List<BookclubResponseDto> getMyBookclubList(Long memberId, Member member);
}

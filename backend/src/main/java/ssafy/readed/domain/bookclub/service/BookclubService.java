package ssafy.readed.domain.bookclub.service;


import java.util.List;
import ssafy.readed.domain.bookclub.controller.dto.OpenBookclubRequestDto;
import ssafy.readed.domain.bookclub.service.dto.BookclubResponseDto;
import ssafy.readed.domain.bookclub.service.dto.OpenBookclubResponseDto;
import ssafy.readed.domain.member.entity.Member;

public interface BookclubService {

    List<BookclubResponseDto> getBookclubList();

    BookclubResponseDto getBookclubDetail(Long bookClubId);

    List<BookclubResponseDto> getMyBookclubList(Long memberId, Member member);

    OpenBookclubResponseDto openBookclubSession(Member member, OpenBookclubRequestDto requestDto);

    String getBookclubToken(Long bookclubId, Member member);

    boolean isFull(Long bookclubId);

    boolean isExist(Long bookclubId);

    void deleteBookclub(Long bookclubId, Member member);

    void leaveBookclub(Long bookclubId, Member member);
}

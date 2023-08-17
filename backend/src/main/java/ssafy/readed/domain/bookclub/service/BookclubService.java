package ssafy.readed.domain.bookclub.service;


import java.util.List;
import ssafy.readed.domain.bookclub.controller.dto.OpenBookclubRequestDto;
import ssafy.readed.domain.bookclub.service.dto.BookclubResponseDto;
import ssafy.readed.domain.bookclub.service.dto.OpenBookclubResponseDto;
import ssafy.readed.domain.member.entity.Member;

public interface BookclubService {

    List<BookclubResponseDto> getBookclubList();

    BookclubResponseDto getBookclubDetail(Long bookClubId, Member authMember);

    List<BookclubResponseDto> getMyBookclubList(Member member);

    void openBookclubSession(Member member, OpenBookclubRequestDto requestDto);

    void joinBookclubSession(Long bookclubId, Member member);

    void deleteBookclub(Long bookclubId, Member member);

    void leaveBookclub(Long bookclubId, Member member);

    String startBookclubSession(Member member);
}

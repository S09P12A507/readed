package ssafy.readed.domain.bookclub.service;


import java.util.List;
import ssafy.readed.domain.bookclub.service.dto.BookclubResponseDto;

public interface BookclubService {

    List<BookclubResponseDto> getBookClubList();

    BookclubResponseDto selectBookClub(Long bookClubId);
}

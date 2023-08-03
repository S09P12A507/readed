package ssafy.readed.domain.bookclub.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ssafy.readed.domain.bookclub.service.dto.BookclubResponseDto;

@Service
@RequiredArgsConstructor
public class BookclubServiceImpl implements BookclubService {

    @Override
    public List<BookclubResponseDto> getBookClubList() {
        return null;
    }

    @Override
    public BookclubResponseDto selectBookClub(Long bookClubId) {
        return null;
    }
}

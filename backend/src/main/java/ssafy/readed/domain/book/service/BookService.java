package ssafy.readed.domain.book.service;

import java.util.List;
import ssafy.readed.domain.book.service.dto.BookBriefResponseDto;
import ssafy.readed.domain.book.service.dto.BookDetailResponseDto;
import ssafy.readed.domain.member.entity.Member;

public interface BookService {

    BookDetailResponseDto getDetail(Long bookId, Member member);

    List<BookBriefResponseDto> getBestsellerList(Integer year, Integer month, Integer week);

    List<BookBriefResponseDto> searchBookByTitle(String keyword);
}

package ssafy.readed.domain.book.service;

import ssafy.readed.domain.book.service.dto.BookBriefResponseDto;
import ssafy.readed.domain.book.service.dto.BookDetailResponseDto;
import ssafy.readed.domain.member.entity.Member;

import java.util.List;

public interface BookService {

    BookDetailResponseDto getDetail(Long bookId, Member member);

    List<BookBriefResponseDto> getBestsellerList(Integer year, Integer month, Integer week);

    List<BookBriefResponseDto> searchBookByTitle(String keyword);

    List<BookBriefResponseDto> getReadedTopTen();

    List<BookBriefResponseDto> getRecommendBooks(Integer genreId);
}

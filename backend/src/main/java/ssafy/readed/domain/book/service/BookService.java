package ssafy.readed.domain.book.service;

import ssafy.readed.domain.book.controller.dto.BestsellerRequestDto;
import ssafy.readed.domain.book.service.dto.BookBriefResponseDto;
import ssafy.readed.domain.book.service.dto.BookDetailResponseDto;

import java.util.List;

public interface BookService {

    BookDetailResponseDto getDetail(Long bookId);

    List<BookBriefResponseDto> getBestsellerList(BestsellerRequestDto bestsellerRequestDto);
}

package ssafy.readed.domain.book.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.readed.domain.book.service.BookService;
import ssafy.readed.domain.book.service.dto.BookBriefResponseDto;
import ssafy.readed.domain.book.service.dto.BookDetailResponseDto;
import ssafy.readed.global.response.BaseResponse;
import ssafy.readed.global.response.JsonResponse;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;

    @GetMapping("/{book-id}")
    public ResponseEntity<BaseResponse<BookDetailResponseDto>> getBookDetail(@PathVariable("book-id") Long bookId) {
        BookDetailResponseDto bookDetail = bookService.getDetail(bookId);
        return JsonResponse.ok("책 가져오기 성공", bookDetail);
    }

    @GetMapping("/bestsellers/{year}/{month}/{week}")
    public ResponseEntity<BaseResponse<List<BookBriefResponseDto>>> getBestsellerList(@PathVariable Integer year, @PathVariable Integer month, @PathVariable Integer week) {
        List<BookBriefResponseDto> bestsellerDtoList = bookService.getBestsellerList(year, month, week);
        return JsonResponse.ok("베스트셀러 10권 가져오기 성공", bestsellerDtoList);
    }
}

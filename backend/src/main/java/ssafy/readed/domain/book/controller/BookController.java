package ssafy.readed.domain.book.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ssafy.readed.domain.book.controller.dto.BestsellerRequestDto;
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

    @GetMapping("/bestsellers")
    public ResponseEntity<BaseResponse<List<BookBriefResponseDto>>> getBestsellerList(@RequestBody BestsellerRequestDto bestsellerRequestDto) {
        List<BookBriefResponseDto> bestsellerDtoList = bookService.getBestsellerList(bestsellerRequestDto);
        return JsonResponse.ok("베스트셀러 10권 가져오기 성공", bestsellerDtoList);
    }
}

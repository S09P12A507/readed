package ssafy.readed.domain.book.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.readed.domain.book.service.BookService;
import ssafy.readed.domain.book.service.dto.BookBriefResponseDto;
import ssafy.readed.domain.book.service.dto.BookDetailResponseDto;
import ssafy.readed.domain.member.entity.Member;
import ssafy.readed.global.response.BaseResponse;
import ssafy.readed.global.response.JsonResponse;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;

    @GetMapping("/{book-id}")
    public ResponseEntity<BaseResponse<BookDetailResponseDto>> getBookDetail(
            @PathVariable("book-id") Long bookId, @AuthenticationPrincipal Member member) {
        BookDetailResponseDto bookDetail = bookService.getDetail(bookId, member);
        return JsonResponse.ok("책 가져오기 성공", bookDetail);
    }

    @GetMapping("/bestsellers/{year}/{month}/{week}")
    public ResponseEntity<BaseResponse<List<BookBriefResponseDto>>> getBestsellerList(
            @PathVariable Integer year, @PathVariable Integer month, @PathVariable Integer week) {
        List<BookBriefResponseDto> bestsellerDtoList = bookService.getBestsellerList(year, month,
                week);
        return JsonResponse.ok("베스트셀러 10권 가져오기 성공", bestsellerDtoList);
    }

    @GetMapping("/topten")
    public ResponseEntity<BaseResponse<List<BookBriefResponseDto>>> getReadedTopTen() {
        return JsonResponse.ok("리디드 Top10 가져오기 성공", bookService.getReadedTopTen());
    }

    @GetMapping("/recommend/{genre-id}")
    public ResponseEntity<BaseResponse<List<BookBriefResponseDto>>> getRecommendBooks(@PathVariable("genre-id") Integer genreId) {
        return JsonResponse.ok("추천 장르 100권 가져오기 성공", bookService.getRecommendBooks(genreId));
    }
}

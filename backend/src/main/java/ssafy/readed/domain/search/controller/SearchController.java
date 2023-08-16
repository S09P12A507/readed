package ssafy.readed.domain.search.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ssafy.readed.domain.book.service.BookService;
import ssafy.readed.domain.book.service.dto.BookBriefResponseDto;
import ssafy.readed.global.response.BaseResponse;
import ssafy.readed.global.response.JsonResponse;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/search")
public class SearchController {

    private final BookService bookService;

    @GetMapping
    public ResponseEntity<BaseResponse<List<BookBriefResponseDto>>> searchBook(@RequestParam(value = "kw") String keyword) {
        return JsonResponse.ok("검색 결과 반환", bookService.searchBookByTitle(keyword));
    }

}

package ssafy.readed.domain.book.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.readed.domain.book.service.AuthorService;
import ssafy.readed.domain.book.service.dto.AuthorDetailResponseDto;
import ssafy.readed.global.response.BaseResponse;
import ssafy.readed.global.response.JsonResponse;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/authors")
public class AuthorController {

    private final AuthorService authorService;

    @GetMapping("/{author-id}")
    public ResponseEntity<BaseResponse<AuthorDetailResponseDto>> getAuthorDetail(@PathVariable("author-id") Long authorId) {
        AuthorDetailResponseDto authorDetail = authorService.getDetail(authorId);
        String msg = "저자 {" + authorId + "} 가져오기";
        return JsonResponse.ok(msg, authorDetail);
    }

}

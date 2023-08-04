package ssafy.readed.domain.bookclub.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.readed.domain.bookclub.service.BookclubService;
import ssafy.readed.domain.bookclub.service.dto.BookclubResponseDto;
import ssafy.readed.domain.member.entity.Member;
import ssafy.readed.global.response.JsonResponse;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping(value = "/api/bookclubs")
public class BookclubController {

    private final BookclubService bookclubService;

    @GetMapping
    public ResponseEntity<?> selectBookclubList() {
        List<BookclubResponseDto> bookclubList = bookclubService.getBookclubList();
        return JsonResponse.ok("전체 북클럽 리스트를 불러왔습니다.", bookclubList);
    }

    @GetMapping("/{bookclub-id}")
    public ResponseEntity<?> selectBookclub(@PathVariable(name = "bookclub-id") Long bookclubId) {
        BookclubResponseDto bookclub = bookclubService.getBookclubDetail(bookclubId);
        return JsonResponse.ok("해당 id의 북클럽을 불러왔습니다.", bookclub);
    }

    @GetMapping("/members/{member-id}")
    public ResponseEntity<?> selectMyBookclubList(@PathVariable(name = "member-id") Long memberId,
            @AuthenticationPrincipal Member member) {
        List<BookclubResponseDto> myBookclubList =
                bookclubService.getMyBookclubList(memberId, member);
        return JsonResponse.ok("내가 참여한 북클럽 리스트를 불러왔습니다.", myBookclubList);
    }

}

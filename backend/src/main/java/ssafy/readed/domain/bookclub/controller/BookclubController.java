package ssafy.readed.domain.bookclub.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.readed.domain.bookclub.controller.dto.OpenBookclubRequestDto;
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

    @PostMapping
    public ResponseEntity<?> openBookclub(@AuthenticationPrincipal Member member, @RequestBody
    OpenBookclubRequestDto requestDto) {
        bookclubService.openBookclubSession(member,
                requestDto);
        return JsonResponse.ok("북클럽 생성 신청 완료");
    }

    @GetMapping("/join/{bookclub-id}")
    public ResponseEntity<?> getBookclubToken(@PathVariable("bookclub-id") Long bookclubId,
            @AuthenticationPrincipal Member member) {
        bookclubService.joinBookclubSession(bookclubId, member);
        return JsonResponse.ok("북클럽 참가 신청 완료");
    }

    @DeleteMapping("/{bookclub-id}")
    public ResponseEntity<?> deleteBookclub(@PathVariable("bookclub-id") Long bookclubId,
            @AuthenticationPrincipal Member member) {
        bookclubService.deleteBookclub(bookclubId, member);
        return JsonResponse.ok("북클럽 삭제 성공");
    }


    @DeleteMapping("/leave/{bookclub-id}")
    public ResponseEntity<?> leaveBookclub(@AuthenticationPrincipal Member member,
            @PathVariable("bookclub-id") Long bookclubId) {
        bookclubService.leaveBookclub(bookclubId, member);
        return JsonResponse.ok("북클럽 나가기 성공");
    }

    @GetMapping
    public ResponseEntity<?> getBookclubList() {
        List<BookclubResponseDto> bookclubList = bookclubService.getBookclubList();
        return JsonResponse.ok("전체 북클럽 리스트를 불러왔습니다.", bookclubList);
    }

    @GetMapping("/{bookclub-id}")
    public ResponseEntity<?> getBookclubDetail(@PathVariable(name = "bookclub-id") Long bookclubId,
            @AuthenticationPrincipal Member authMember) {
        BookclubResponseDto bookclub = bookclubService.getBookclubDetail(bookclubId, authMember);
        return JsonResponse.ok("해당 Room ID의 북클럽을 불러왔습니다.", bookclub);
    }

    @GetMapping("/mylist")
    public ResponseEntity<?> selectMyBookclubList(
            @AuthenticationPrincipal Member member) {
        List<BookclubResponseDto> myBookclubList =
                bookclubService.getMyBookclubList(member);
        return JsonResponse.ok("내가 참여한 북클럽 리스트를 불러왔습니다.", myBookclubList);
    }

    @PostMapping("/start")
    public ResponseEntity<?> startBookclubSession(@AuthenticationPrincipal Member member) {
        String bookclubSessionToken = bookclubService.startBookclubSession(member);

        return JsonResponse.ok("북클럽 세션 토큰 반환 완료", bookclubSessionToken);
    }

}

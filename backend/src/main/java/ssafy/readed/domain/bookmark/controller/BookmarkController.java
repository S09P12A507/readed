package ssafy.readed.domain.bookmark.controller;

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
import ssafy.readed.domain.bookmark.controller.dto.DeleteBookmarkListRequestDto;
import ssafy.readed.domain.bookmark.service.BookmarkService;
import ssafy.readed.domain.bookmark.service.dto.BookmarkResponseDto;
import ssafy.readed.domain.member.entity.Member;
import ssafy.readed.global.response.JsonResponse;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/bookmarks")
@CrossOrigin("*")
public class BookmarkController {

    private final BookmarkService bookmarkService;

    @PostMapping(value = "/{book-id}")
    public ResponseEntity<?> save(@PathVariable(name = "book-id") Long bookId,
            @AuthenticationPrincipal Member member) {
        bookmarkService.saveBookmark(bookId, member);
        return JsonResponse.ok("해당 책을 찜하였습니다.");
    }

    @GetMapping
    private ResponseEntity<?> selectBookmarkList(@AuthenticationPrincipal Member member) {
        List<BookmarkResponseDto> responseDtoList = bookmarkService.selectBookmarkList(member);
        return JsonResponse.ok("사용자의 찜목록을 불러왔습니다.", responseDtoList);
    }

    @DeleteMapping(value = "/{book-id}")
    public ResponseEntity<?> deleteBookmark(@PathVariable(name = "book-id") Long bookId,
            @AuthenticationPrincipal Member member) {
        bookmarkService.deleteBookmark(bookId, member);
        return JsonResponse.ok("해당 찜을 취소했습니다.");
    }

    @DeleteMapping
    private ResponseEntity<?> deleteBookmarkInList(@AuthenticationPrincipal Member member,
            @RequestBody List<DeleteBookmarkListRequestDto> requestDtoList) {
        bookmarkService.deleteBookmarkInList(member, requestDtoList);
        return JsonResponse.ok("선택한 찜 취소가 모두 완료되었습니다.");
    }

}

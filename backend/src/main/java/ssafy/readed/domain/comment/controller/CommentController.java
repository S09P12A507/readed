package ssafy.readed.domain.comment.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.readed.domain.comment.controller.dto.CommentRequestDto;
import ssafy.readed.domain.comment.service.CommentResponseDto;
import ssafy.readed.domain.comment.service.CommentService;
import ssafy.readed.domain.member.entity.Member;
import ssafy.readed.global.exception.GlobalRuntimeException;
import ssafy.readed.global.response.JsonResponse;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/comments")
@CrossOrigin("*")
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/{book-id}")
    public ResponseEntity<?> save(@PathVariable(name = "book-id") Long bookId,
            @AuthenticationPrincipal Member member,
            @RequestBody CommentRequestDto commentRequestDto) {
        commentService.saveComment(bookId, member, commentRequestDto);
        return JsonResponse.ok("코멘트 작성이 완료되었습니다.");
    }

    @GetMapping(value = "/{comment-id}")
    public ResponseEntity<?> getComment(@PathVariable(name = "comment-id") Long commentId,
            @AuthenticationPrincipal Member member) {
        CommentResponseDto commentResponseDto = commentService.selectComment(commentId, member);

        return JsonResponse.ok("코멘트 1개를 불러왔습니다.", commentResponseDto);
    }

    @GetMapping(value = "/members")
    public ResponseEntity<?> getMemberCommentList(Long id, @AuthenticationPrincipal Member member) {
        List<CommentResponseDto> commentList = commentService.getMemberCommentList(id, member);

        if (commentList == null) {
            throw new GlobalRuntimeException("해당 회원의 코멘트가 존재하지 않습니다.", HttpStatus.BAD_REQUEST);
        }
        return JsonResponse.ok("회원 코멘트 리스트를 불러왔습니다.", commentList);
    }

    @GetMapping(value = "/books/{book-id}")
    public ResponseEntity<?> getBookCommentList(@PathVariable(name = "book-id") Long bookId,
            @AuthenticationPrincipal Member member) {
        List<CommentResponseDto> commentList = commentService.getBookCommentList(bookId, member);

        if (commentList == null) {
            throw new GlobalRuntimeException("해당 책의 코멘트가 존재하지 않습니다.", HttpStatus.BAD_REQUEST);
        }
        return JsonResponse.ok("책 코멘트 리스트를 불러왔습니다.", commentList);
    }

    @PatchMapping(value = "/{comment-id}")
    public ResponseEntity<?> updateComment(@PathVariable(name = "comment-id") Long commentId,
            @AuthenticationPrincipal Member member,
            @RequestBody CommentRequestDto commentRequestDto) {
        commentService.updateComment(commentId, member, commentRequestDto);
        return JsonResponse.ok("코멘트가 수정되었습니다.");
    }

    @DeleteMapping(value = "/{comment-id}")
    public ResponseEntity<?> deleteReport(@PathVariable(name = "comment-id") Long commentId,
            @AuthenticationPrincipal Member member) {
        commentService.deleteComment(commentId, member);
        return JsonResponse.ok("코멘트가 삭제되었습니다.");
    }

    @PostMapping("/likes/{comment-id}")
    public ResponseEntity<?> likeComment(@PathVariable(name = "comment-id") Long commentId,
            @AuthenticationPrincipal Member member) {
        commentService.likeComment(commentId, member);
        return JsonResponse.ok("코멘트 좋아요를 완료했습니다.");
    }

    @DeleteMapping("/likes/{comment-id}")
    public ResponseEntity<?> unlikeComment(@PathVariable(name = "comment-id") Long commentId,
            @AuthenticationPrincipal Member member) {
        commentService.unlikeComment(commentId, member);
        return JsonResponse.ok("코멘트 좋아요 취소가 완료되었습니다.");
    }
}

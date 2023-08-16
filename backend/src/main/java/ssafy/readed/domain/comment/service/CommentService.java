package ssafy.readed.domain.comment.service;

import java.util.List;
import ssafy.readed.domain.comment.controller.dto.CommentRequestDto;
import ssafy.readed.domain.member.entity.Member;

public interface CommentService {

    void saveComment(Long bookId, Member member, CommentRequestDto commentRequestDto);

    CommentResponseDto selectComment(Long commentId, Member member);

    List<CommentResponseDto> getMemberCommentList(Long memberId, Member member);

    List<CommentResponseDto> getBookCommentList(Long bookId, Member member);

    void updateComment(Long commentId, Member member, CommentRequestDto commentRequestDto);

    void updateCommentByBookAndMember(Long bookId, Member member,
            CommentRequestDto commentRequestDto);

    void deleteComment(Long commentId, Member member);

    void likeComment(Long commentId, Member member);

    void unlikeComment(Long commentId, Member member);

}

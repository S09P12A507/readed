package ssafy.readed.domain.comment.service;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import ssafy.readed.domain.comment.entity.Comment;

@Getter
@AllArgsConstructor
@Builder
public class CommentResponseDto {

    private Long id;
    private Long memberId;
    private Long bookId;
    private String commentContent;
    private Long rating;
    private Long likeCount;
    private Boolean isSpoiler;
    private String bookTitle;
    private String bookCover;
    private String memberNickname;
    private Boolean isLiked;

    // 엔티티를 디티오로 바꾸는 메서드 static
    public static CommentResponseDto from(Comment comment, Boolean isLiked) {
        return CommentResponseDto.builder()
                .id(comment.getId())
                .memberId(comment.getMember().getId())
                .bookId(comment.getBook().getId())
                .commentContent(comment.getCommentContent())
                .rating(comment.getRating())
                .likeCount(comment.getLikeCount())
                .isSpoiler(comment.getIsSpoiler())
                .bookTitle(comment.getBook().getTitle())
                .memberNickname(comment.getMember().getNickname())
                .isLiked(isLiked)
                .build();
    }

}

package ssafy.readed.domain.comment.service;

import java.time.LocalDateTime;
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
    private LocalDateTime createdAt;
    private String bookTitle;
    private String bookCover;
    private String memberNickname;
    private String profileImage;
    private Boolean isLiked;

    // 엔티티를 디티오로 바꾸는 메서드 static
    public static CommentResponseDto from(Comment comment, String url, Boolean isLiked) {
        return CommentResponseDto.builder()
                .id(comment.getId())
                .memberId(comment.getMember().getId())
                .bookId(comment.getBook().getId())
                .commentContent(comment.getCommentContent())
                .rating(comment.getRating())
                .likeCount(comment.getLikeCount())
                .isSpoiler(comment.getIsSpoiler())
                .createdAt(comment.getCreatedAt())
                .bookTitle(comment.getBook().getTitle())
                .memberNickname(comment.getMember().getNickname())
                .profileImage(url)
                .isLiked(isLiked)
                .build();
    }

}

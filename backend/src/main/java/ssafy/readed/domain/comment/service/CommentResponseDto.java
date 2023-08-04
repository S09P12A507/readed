package ssafy.readed.domain.comment.service;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class CommentResponseDto {

    private Boolean isLiked;

    // 엔티티를 디티오로 바꾸는 메서드 static

}

package ssafy.readed.domain.comment.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CommentRequestDto {

    private String commentContent;
    private Long rating;
    private Boolean isSpoiler;

}

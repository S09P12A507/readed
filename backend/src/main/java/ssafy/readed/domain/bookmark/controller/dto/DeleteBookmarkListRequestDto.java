package ssafy.readed.domain.bookmark.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DeleteBookmarkListRequestDto {

    private Long bookId;
    private Boolean isChecked;
}

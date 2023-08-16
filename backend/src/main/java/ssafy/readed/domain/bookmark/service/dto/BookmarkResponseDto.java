package ssafy.readed.domain.bookmark.service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.readed.domain.bookmark.entity.Bookmark;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookmarkResponseDto {

    Long id;
    String bookCover;

    public static BookmarkResponseDto from(Bookmark bookmark, String s3Url) {
        return BookmarkResponseDto.builder()
                .id(bookmark.getId())
                .bookCover(s3Url)
                .build();
    }
}

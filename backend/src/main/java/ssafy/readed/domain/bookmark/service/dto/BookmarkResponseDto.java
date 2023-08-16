package ssafy.readed.domain.bookmark.service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.readed.domain.book.entity.BookCoverFile;
import ssafy.readed.domain.bookmark.entity.Bookmark;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookmarkResponseDto {

    Long id;
    BookCoverFile bookCover;

    public static BookmarkResponseDto from(Bookmark bookmark) {
        return BookmarkResponseDto.builder()
                .id(bookmark.getId())
                .bookCover(bookmark.getBook().getBookCoverFile())
                .build();
    }
}

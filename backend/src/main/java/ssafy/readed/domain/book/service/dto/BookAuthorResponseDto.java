package ssafy.readed.domain.book.service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.readed.domain.book.entity.Author;
import ssafy.readed.domain.book.entity.BookAuthor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookAuthorResponseDto {

    private Long authorId;
    private String authorName;
    private String authorRole;
    private String authorProfileImage;

    public static BookAuthorResponseDto from(BookAuthor bookAuthor, String s3Url) {
        Author author = bookAuthor.getAuthor();
        return BookAuthorResponseDto.builder()
                .authorId(author.getId())
                .authorName(author.getKoreanName())
                .authorRole(bookAuthor.getRoleType())
                .authorProfileImage(s3Url)
                .build();
    }
}


package ssafy.readed.domain.book.service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.readed.domain.book.entity.Book;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookBriefResponseDto {

    private Long bookId;
    private String bookTitle;
    private String coverImage;
    private Double avgRating;
    private String author;
    private String publisher;

    public static BookBriefResponseDto from(Book book, String coverImageS3Url) {
        String authorName = book.getBookAuthorList().size() != 0 ? book.getBookAuthorList().get(0).getAuthor().getKoreanName() : null;
        String publisherName = book.getPublisher() != null ? book.getPublisher().getName() : null;

        return BookBriefResponseDto.builder()
                .bookId(book.getId())
                .bookTitle(book.getTitle())
                .coverImage(coverImageS3Url)
                .avgRating(book.getAvgRating())
                .author(authorName)
                .publisher(publisherName)
                .build();
    }
}

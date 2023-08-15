package ssafy.readed.domain.book.service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.readed.domain.book.entity.Book;
import ssafy.readed.domain.book.entity.BookCode;
import ssafy.readed.domain.book.entity.Publisher;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookDetailResponseDto {

    private Long bookId;
    private String bookTitle;
    private String bookDescription;
    private String coverImage;
    private Long commentCount;
    private Double avgRating;
    private Long star_0p5_count;
    private Long star_1_count;
    private Long star_1p5_count;
    private Long star_2_count;
    private Long star_2p5_count;
    private Long star_3_count;
    private Long star_3p5_count;
    private Long star_4_count;
    private Long star_4p5_count;
    private Long star_5_count;
    private LinkResponseDto link;
    private PublisherResponseDto publisher;
    private List<BookAuthorResponseDto> author = new ArrayList<>();

    public static BookDetailResponseDto from(Book book, String coverImageS3Url, String publisherS3Url, List<BookAuthorResponseDto> bookAuthorResponseDtoList) {

        BookCode bookCode = book.getBookCode();
        Publisher publisher = book.getPublisher();

        LinkResponseDto linkDto = LinkResponseDto.builder()
                .offline(OfflineLinkResponseDto.builder()
                        .aladinUrl(bookCode.getAladinId())
                        .kyoboUrl(bookCode.getKyoboId())
                        .yes24Url(bookCode.getYes24Id())
                        .build()
                )
                .ebook(EbookLinkResponseDto.builder()
                        .aladinUrl(bookCode.getEAladinId())
                        .kyoboUrl(bookCode.getEKyoboId())
                        .yes24Url(bookCode.getEYes24Id())
                        .ridiUrl(bookCode.getERidiId())
                        .millieUrl(bookCode.getEMillieId())
                        .build()
                ).build();

        PublisherResponseDto publisherDto = PublisherResponseDto.builder()
                .publisherId(publisher.getId())
                .publisherName(publisher.getName())
                .publisherLogo(publisherS3Url)
                .build();

        BookDetailResponseDto bookDetailResponseDto = BookDetailResponseDto.builder()
                .bookId(book.getId())
                .bookTitle(book.getTitle())
                .bookDescription(book.getDescription())
                .coverImage(coverImageS3Url)
                .commentCount(book.getCommentCount())
                .avgRating(book.getAvgRating())
                .star_0p5_count(book.getStar_0p5_count())
                .star_1_count(book.getStar_1_count())
                .star_1p5_count(book.getStar_1p5_count())
                .star_2_count(book.getStar_2_count())
                .star_2p5_count(book.getStar_2p5_count())
                .star_3_count(book.getStar_3_count())
                .star_3p5_count(book.getStar_3p5_count())
                .star_4_count(book.getStar_4_count())
                .star_4p5_count(book.getStar_4p5_count())
                .star_5_count(book.getStar_5_count())
                .link(linkDto)
                .publisher(publisherDto)
                .build();

        bookAuthorResponseDtoList.forEach(bookDetailResponseDto.getAuthor()::add);

        return bookDetailResponseDto;
    }
}

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
class LinkResponseDto {

    private OfflineLinkResponseDto offline;
    private EbookLinkResponseDto ebook;

}

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
class OfflineLinkResponseDto {

    private String aladinUrl;
    private String kyoboUrl;
    private String yes24Url;

}

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
class EbookLinkResponseDto {

    private String aladinUrl;
    private String kyoboUrl;
    private String yes24Url;
    private String ridiUrl;
    private String millieUrl;

}

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
class PublisherResponseDto {

    private Long publisherId;
    private String publisherName;
    private String publisherLogo;

}

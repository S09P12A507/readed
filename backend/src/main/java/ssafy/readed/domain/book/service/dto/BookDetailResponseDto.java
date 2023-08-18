package ssafy.readed.domain.book.service.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.readed.domain.book.entity.Book;
import ssafy.readed.domain.book.entity.BookCode;
import ssafy.readed.domain.book.entity.Publisher;
import ssafy.readed.domain.comment.entity.Comment;
import ssafy.readed.global.util.ItemType;
import ssafy.readed.global.util.UrlConverter;

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
    private List<BookAuthorResponseDto> author;
    private Boolean isBookmarkChecked;
    private Long commentId;
    private String commentContent;
    private Long commentRating;

    public static BookDetailResponseDto from(Book book, String coverImageS3Url,
            String publisherS3Url, List<BookAuthorResponseDto> bookAuthorResponseDtoList,
            Boolean isBookmarkChecked, Comment comment) {

        BookCode bookCode = book.getBookCode();
        Publisher publisher = book.getPublisher();

        LinkResponseDto linkDto = LinkResponseDto.builder()
                .offline(OfflineLinkResponseDto.builder()
                        .aladinUrl(UrlConverter.getLinkUrl(ItemType.ALADIN, bookCode.getAladinId()))
                        .kyoboUrl(UrlConverter.getLinkUrl(ItemType.KYOBO, bookCode.getKyoboId()))
                        .yes24Url(UrlConverter.getLinkUrl(ItemType.YES24, bookCode.getYes24Id()))
                        .build()
                )
                .ebook(EbookLinkResponseDto.builder()
                        .aladinUrl(
                                UrlConverter.getLinkUrl(ItemType.E_ALADIN, bookCode.getEAladinId()))
                        .kyoboUrl(UrlConverter.getLinkUrl(ItemType.E_KYOBO, bookCode.getEKyoboId()))
                        .yes24Url(UrlConverter.getLinkUrl(ItemType.E_YES24, bookCode.getEYes24Id()))
                        .ridiUrl(UrlConverter.getLinkUrl(ItemType.E_RIDI, bookCode.getERidiId()))
                        .millieUrl(
                                UrlConverter.getLinkUrl(ItemType.E_MILLIE, bookCode.getEMillieId()))
                        .build()
                ).build();

        PublisherResponseDto publisherDto = publisher != null ? PublisherResponseDto.builder()
                .publisherId(publisher.getId())
                .publisherName(publisher.getName())
                .publisherLogo(publisherS3Url)
                .build() : null;

        return BookDetailResponseDto.builder()
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
                .author(bookAuthorResponseDtoList)
                .isBookmarkChecked(isBookmarkChecked)
                .commentId(comment.getId())
                .commentContent(comment.getCommentContent())
                .commentRating(comment.getRating())
                .build();
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

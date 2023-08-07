package ssafy.readed.domain.book.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.readed.domain.report.entity.Report;
import ssafy.readed.global.entity.BaseEntity;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Book extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_id")
    private Long id;

    @Column(name = "book_title")
    private String title;

    private String originalTitle;

    private String subtitle;

    @Column(name = "book_description")
    private String description;

    @Column(name = "book_toc")
    private String toc;

    private LocalDateTime publishedDate;

    private Long pageCount;

    private Boolean isAdult;

    private String packingStyle;

    private Long sizeWeight;

    private Long sizeDepth;

    private Long sizeHeight;

    private Long sizeWidth;

    @OneToOne(mappedBy = "book", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private BookCoverFile bookCoverFile;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_code_id")
    private BookCode bookCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "publisher_id")
    private Publisher publisher;

    @OneToMany(mappedBy = "book", fetch = FetchType.LAZY)
    private List<BookAuthor> bookAuthorList = new ArrayList<>();

    @OneToMany(mappedBy = "book", fetch = FetchType.LAZY)
    private List<Report> reportList = new ArrayList<>();

    private Long commentCount = 0L;
    private Double avgRating = 0.0;
    private Long star_0p5_count = 0L;
    private Long star_1_count = 0L;
    private Long star_1p5_count = 0L;
    private Long star_2_count = 0L;
    private Long star_2p5_count = 0L;
    private Long star_3_count = 0L;
    private Long star_3p5_count = 0L;
    private Long star_4_count = 0L;
    private Long star_4p5_count = 0L;
    private Long star_5_count = 0L;

    @Builder
    public Book(String title, String originalTitle, String subtitle, String description, String toc, LocalDateTime publishedDate, Long pageCount, Boolean isAdult, String packingStyle, Long sizeWeight, Long sizeDepth, Long sizeHeight, Long sizeWidth, BookCoverFile bookCoverFile, BookCode bookCode, Category category, Publisher publisher) {
        this.title = title;
        this.originalTitle = originalTitle;
        this.subtitle = subtitle;
        this.description = description;
        this.toc = toc;
        this.publishedDate = publishedDate;
        this.pageCount = pageCount;
        this.isAdult = isAdult;
        this.packingStyle = packingStyle;
        this.sizeWeight = sizeWeight;
        this.sizeDepth = sizeDepth;
        this.sizeHeight = sizeHeight;
        this.sizeWidth = sizeWidth;
        this.bookCoverFile = bookCoverFile;
        this.bookCode = bookCode;
        this.category = category;
        this.publisher = publisher;
    }
}

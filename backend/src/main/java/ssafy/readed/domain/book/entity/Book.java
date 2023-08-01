package ssafy.readed.domain.book.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.readed.domain.report.entity.Report;
import ssafy.readed.global.entity.BaseEntity;

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

    private Long pages;

    private Boolean isAdult;

    @Column(name = "book_cover")
    private String cover;

    private Long commentCount;

    private String packingStyle;

    private Long weight;

    private Long sizeDepth;

    private Long sizeHeight;

    private Long sizeWeight;

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
    private List<Report> reports = new ArrayList<>();


    @Builder
    public Book(String title, String originalTitle, String subtitle, String description, String toc,
            LocalDateTime publishedDate, Long pages, Boolean isAdult, String cover,
            Long commentCount,
            String packingStyle, Long weight, Long sizeDepth, Long sizeHeight, Long sizeWeight,
            BookCode bookCode, Category category, Publisher publisher) {
        this.title = title;
        this.originalTitle = originalTitle;
        this.subtitle = subtitle;
        this.description = description;
        this.toc = toc;
        this.publishedDate = publishedDate;
        this.pages = pages;
        this.isAdult = isAdult;
        this.cover = cover;
        this.commentCount = commentCount;
        this.packingStyle = packingStyle;
        this.weight = weight;
        this.sizeDepth = sizeDepth;
        this.sizeHeight = sizeHeight;
        this.sizeWeight = sizeWeight;
        this.bookCode = bookCode;
        this.category = category;
        this.publisher = publisher;
    }
}

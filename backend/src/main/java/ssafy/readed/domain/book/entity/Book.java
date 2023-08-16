package ssafy.readed.domain.book.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
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
import ssafy.readed.domain.bookmark.entity.Bookmark;
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

    @Column(name = "book_description", columnDefinition = "TEXT")
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

    @OneToMany(mappedBy = "book", fetch = FetchType.LAZY)
    private List<Bookmark> bookmarkList = new ArrayList<>();

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
    public Book(String title, String originalTitle, String subtitle, String description, String toc,
            LocalDateTime publishedDate, Long pageCount, Boolean isAdult, String packingStyle,
            Long sizeWeight, Long sizeDepth, Long sizeHeight, Long sizeWidth,
            BookCoverFile bookCoverFile, BookCode bookCode, Category category,
            Publisher publisher) {
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

    public void addComment(Long rating) {
        this.commentCount++;
        getStarCount(rating, true);
        this.avgRating = calcAvgRating();
    }

    public void deleteComment(Long rating) {
        this.commentCount--;
        getStarCount(rating, false);
        this.avgRating = calcAvgRating();
    }

    private void getStarCount(Long rating, boolean isIncrease) {
        int add = isIncrease ? 1 : -1;

        if (rating == 1) {
            this.star_0p5_count += add;
        } else if (rating == 2) {
            this.star_1_count += add;
        } else if (rating == 3) {
            this.star_1p5_count += add;
        } else if (rating == 4) {
            this.star_2_count += add;
        } else if (rating == 5) {
            this.star_2p5_count += add;
        } else if (rating == 6) {
            this.star_3_count += add;
        } else if (rating == 7) {
            this.star_3p5_count += add;
        } else if (rating == 8) {
            this.star_4_count += add;
        } else if (rating == 9) {
            this.star_4p5_count += add;
        } else if (rating == 10) {
            this.star_5_count += add;
        }
    }

    private Double calcAvgRating() {
        return (this.star_0p5_count * 0.5 + this.star_1_count * 1 +
                this.star_1p5_count * 1.5 + this.star_2_count * 2 +
                this.star_2p5_count * 2.5 + this.star_3_count * 3 +
                this.star_3p5_count * 3.5 + this.star_4_count * 4 +
                this.star_4p5_count * 4.5 + this.star_5_count * 5) /
                (this.star_0p5_count + this.star_1_count +
                        this.star_1p5_count + this.star_2_count +
                        this.star_2p5_count + this.star_3_count +
                        this.star_3p5_count + this.star_4_count +
                        this.star_4p5_count + this.star_5_count);
    }


}

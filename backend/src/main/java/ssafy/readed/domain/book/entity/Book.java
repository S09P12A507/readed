package ssafy.readed.domain.book.entity;

import lombok.AccessLevel;
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

}

package ssafy.readed.domain.bookclub.entity;

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
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.readed.domain.book.entity.Book;
import ssafy.readed.domain.member.entity.Member;
import ssafy.readed.global.entity.BaseEntity;

@Entity
@Getter
@NoArgsConstructor
public class Bookclub extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bookclub_id")
    private Long id;

    private String bookclubTitle;

    @Column(columnDefinition = "TEXT")
    private String bookclubContent;

    @Column(name = "bookclub_time")
    private LocalDateTime startTime;

    private Integer participantCount;

    private Boolean isPublic;

    private String bookclubPassword;

    private Boolean isFinished;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id")
    private Book book;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "host_id")
    private Member host;

    @OneToMany(mappedBy = "bookclub", fetch = FetchType.LAZY)
    private List<Participant> participantList = new ArrayList<>();

    @Builder
    public Bookclub(String bookclubTitle, String bookclubContent, LocalDateTime startTime,
            Integer participantCount, Boolean isPublic, String bookclubPassword,
            Boolean isFinished) {
        this.bookclubTitle = bookclubTitle;
        this.bookclubContent = bookclubContent;
        this.startTime = startTime;
        this.participantCount = participantCount;
        this.isPublic = isPublic;
        this.bookclubPassword = bookclubPassword;
        this.isFinished = isFinished;
    }
}
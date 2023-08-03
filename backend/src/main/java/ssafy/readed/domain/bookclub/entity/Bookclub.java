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

    @Column(name = "bookclub_title")
    private String bookClubTitle;

    @Column(name = "bookclub_content", columnDefinition = "TEXT")
    private String bookClubContent;

    @Column(name = "bookclub_time")
    private LocalDateTime startTime;

    @Column(name = "participantCount")
    private Integer participantCount;

    @Column(name = "is_public")
    private Boolean isPublic;

    @Column(name = "bookclub_password")
    private String bookClubPassword;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id")
    private Book book;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "host_id")
    private Member host;

    @OneToMany(mappedBy = "bookclub", fetch = FetchType.LAZY)
    private List<Participant> participantList = new ArrayList<>();

    @Builder
    public Bookclub(String bookClubTitle, String bookClubContent, LocalDateTime startTime,
            Integer participantCount, Boolean isPublic, String bookClubPassword) {
        this.bookClubTitle = bookClubTitle;
        this.bookClubContent = bookClubContent;
        this.startTime = startTime;
        this.participantCount = participantCount;
        this.isPublic = isPublic;
        this.bookClubPassword = bookClubPassword;
    }
}

package ssafy.readed.domain.bookclub.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.readed.domain.member.entity.Member;
import ssafy.readed.global.entity.BaseEntity;

@Entity
@Getter
@NoArgsConstructor
public class Participant extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "participant_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bookclub_id")
    private Bookclub bookclub;

    @Builder
    public Participant(Member member, Bookclub bookclub) {
        this.member = member;
        this.bookclub = bookclub;
    }
}

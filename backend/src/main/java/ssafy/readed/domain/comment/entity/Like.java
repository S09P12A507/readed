package ssafy.readed.domain.comment.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.readed.domain.member.entity.Member;
import ssafy.readed.global.entity.BaseEntity;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "likes")
public class Like extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "like_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    @JoinColumn(name = "comment_id")
    private Comment comment;

    @Builder
    private Like(Member member, Comment comment) {
        this.member = member;
        this.comment = comment;
    }

    public static Like createLike(Member member, Comment comment) {
        Like like = Like.builder()
                .member(member)
                .comment(comment)
                .build();

        comment.increaseOneLike();
        return like;
    }

    public static void deleteLike(Comment comment) {
        comment.decreaseOneLike();
    }

}

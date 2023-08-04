package ssafy.readed.domain.comment.entity;

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
import ssafy.readed.domain.book.entity.Book;
import ssafy.readed.domain.comment.controller.dto.CommentRequestDto;
import ssafy.readed.domain.member.entity.Member;
import ssafy.readed.global.entity.BaseEntity;

@Entity
@Getter
@NoArgsConstructor
public class Comment extends BaseEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id")
    private Book book;

    @Column(columnDefinition = "TEXT")
    private String commentContent;

    private Long rating;

    private Long likeCount;

    private Boolean isSpoiler;

    private Boolean isValid;

    @Builder
    public Comment(Member member, Book book, String commentContent, Long rating, Long likeCount,
            Boolean isSpoiler, Boolean isValid) {
        this.member = member;
        this.book = book;
        this.commentContent = commentContent;
        this.rating = rating;
        this.likeCount = likeCount;
        this.isSpoiler = isSpoiler;
        this.isValid = isValid;
    }

    public void update(CommentRequestDto requestDto) {
        this.commentContent = requestDto.getCommentContent();
        this.rating = requestDto.getRating();
        this.isSpoiler = requestDto.getIsSpoiler();
    }

    public void increaseOneLike() {
        this.likeCount++;
    }

    public void decreaseOneLike() {
        this.likeCount--;
    }

}
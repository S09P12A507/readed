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

    @Builder
    public Comment(Member member, Book book, String commentContent, Long rating, Long likeCount,
            Boolean isSpoiler) {
        this.member = member;
        this.book = book;
        this.commentContent = commentContent;
        this.rating = rating;
        this.likeCount = likeCount;
        this.isSpoiler = isSpoiler;
    }

    public static Comment createComment(Member member, Book book,
            CommentRequestDto commentRequestDto) {
        Comment comment = Comment.builder()
                .member(member)
                .book(book)
                .commentContent(commentRequestDto.getCommentContent())
                .rating(commentRequestDto.getRating())
                .likeCount(0L)
                .isSpoiler(commentRequestDto.getIsSpoiler())
                .build();

        member.addComment(book.getPageCount(),
                Math.toIntExact(commentRequestDto.getRating()));
        return comment;
    }

    public static void deleteComment(Member member, Comment comment) {
        member.deleteComment(comment.getBook().getPageCount(),
                Math.toIntExact(comment.getRating()));
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
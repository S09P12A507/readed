package ssafy.readed.domain.comment.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ssafy.readed.domain.comment.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query("select c from Comment c where c.member.id=:memberId")
    List<Comment> findAllByMemberId(Long memberId);

    @Query("select c from Comment c where c.book.id=:bookId")
    List<Comment> findAllByBookId(Long bookId);
}

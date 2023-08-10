package ssafy.readed.domain.comment.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.readed.domain.comment.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    //@Query("select c from Comment c where c.member.id=:memberId")
    List<Comment> findAllByMember_Id(Long memberId);

    List<Comment> findAllByBook_Id(Long bookId);
}

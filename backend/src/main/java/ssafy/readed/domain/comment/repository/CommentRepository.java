package ssafy.readed.domain.comment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.readed.domain.comment.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {


}

package ssafy.readed.domain.comment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.readed.domain.comment.entity.Like;

public interface LikeRepository extends JpaRepository<Like, Long> {

}

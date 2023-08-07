package ssafy.readed.domain.comment.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import ssafy.readed.domain.comment.entity.Like;

public interface LikeRepository extends JpaRepository<Like, Long> {

    @Query("select l from Like l join fetch l.member join fetch l.comment where l.member.id=:memberId and l.comment.id=:commentId")
    Optional<Like> findByCommentAndMember(Long commentId, Long memberId);


    @Modifying
    @Query("delete from Like l where l.comment.id=:commentId")
    void deleteByComment(Long commentId);

}

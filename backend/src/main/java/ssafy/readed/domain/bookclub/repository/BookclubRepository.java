package ssafy.readed.domain.bookclub.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ssafy.readed.domain.bookclub.entity.Bookclub;
import ssafy.readed.domain.bookclub.entity.Participant;


public interface BookclubRepository extends JpaRepository<Bookclub, Long> {

    @Query("SELECT DISTINCT p FROM Participant p JOIN FETCH p.bookclub WHERE p.member.id =:memberId")
    List<Participant> selectParticipantsByMemeberIdFetchJoin(Long memberId);

    List<Bookclub> findAllByIsFinished(boolean isFinished);

}

package ssafy.readed.domain.bookclub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.readed.domain.bookclub.entity.Participant;

public interface ParticipantRepository extends JpaRepository<Participant, Long> {

}

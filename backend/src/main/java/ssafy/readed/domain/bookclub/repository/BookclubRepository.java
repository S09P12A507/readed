package ssafy.readed.domain.bookclub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.readed.domain.bookclub.entity.Bookclub;


public interface BookclubRepository extends JpaRepository<Bookclub, Long> {

}

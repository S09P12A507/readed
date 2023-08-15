package ssafy.readed.domain.book.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.readed.domain.book.entity.Bestseller;

import java.util.Optional;

public interface BestsellerRepository extends JpaRepository<Bestseller, Long> {

    Optional<Bestseller> findByYearAndMonthAndWeek(Integer year, Integer month, Integer week);
}

package ssafy.readed.domain.book.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.readed.domain.book.entity.Bestseller;

public interface BestsellerRepository extends JpaRepository<Bestseller, Long> {
}

package ssafy.readed.domain.book.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ssafy.readed.domain.book.entity.BestsellerBook;

import java.util.List;

public interface BestsellerBookRepository extends JpaRepository<BestsellerBook, Long> {

    @Query(nativeQuery = true, value = "select * from bestseller_book bb join bestseller b on bb.bestseller_id = b.bestseller_id where b.year = :year and b.month = :month and b.week = :week LIMIT 10")
    List<BestsellerBook> findTop10(Integer year, Integer month, Integer week);
}

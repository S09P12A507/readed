package ssafy.readed.domain.book.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ssafy.readed.domain.book.entity.Book;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {

    List<Book> findTop30ByTitleContainingIgnoreCase(String keyword);

    @Query(nativeQuery = true, value = "SELECT b.* FROM book b ORDER BY b.avg_rating * 10 + b.comment_count DESC LIMIT 10")
    List<Book> findReadedTop10();

    @Query(nativeQuery = true, value = "SELECT b.* FROM book b JOIN category c ON b.category_id = c.category_id WHERE b.category_id IN (SELECT c.category_id FROM category c WHERE c.depth2 REGEXP (:keyword)) ORDER BY b.avg_rating * 10 + b.comment_count DESC LIMIT 100")
    List<Book> findBooksByRecommendGenre(String keyword);
}

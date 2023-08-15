package ssafy.readed.domain.book.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.readed.domain.book.entity.Book;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {

    List<Book> findByTitleContainingIgnoreCase(String keyword);
}

package ssafy.readed.domain.book.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.readed.domain.book.entity.Book;

public interface BookRepository extends JpaRepository<Book, Long> {

}

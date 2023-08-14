package ssafy.readed.domain.book.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.readed.domain.book.entity.Author;

public interface AuthorRepository extends JpaRepository<Author, Long> {
}

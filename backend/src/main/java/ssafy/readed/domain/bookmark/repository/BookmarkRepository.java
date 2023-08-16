package ssafy.readed.domain.bookmark.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ssafy.readed.domain.bookmark.entity.Bookmark;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

    @Query("select b from Bookmark b join fetch b.book join fetch b.member where b.book.id=:bookId and b.member.id=:memberId")
    Bookmark selectBookmarkByBookId(Long bookId, Long memberId);
}

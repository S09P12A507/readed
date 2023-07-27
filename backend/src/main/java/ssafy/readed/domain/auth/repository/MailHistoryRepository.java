package ssafy.readed.domain.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.readed.domain.auth.entity.MailHistory;

public interface MailHistoryRepository extends JpaRepository<MailHistory, Long> {

    MailHistory findTop1ByEmailAndIsAuthedOrderByIdDesc(String email, boolean isAuthed);
}

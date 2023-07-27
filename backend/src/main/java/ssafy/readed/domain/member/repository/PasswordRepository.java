package ssafy.readed.domain.member.repository;

import javax.persistence.Id;
import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.readed.domain.member.entity.Password;

public interface PasswordRepository extends JpaRepository<Password, Long> {

    Password findById(Id id);
}

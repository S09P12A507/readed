package ssafy.readed.domain.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.readed.domain.auth.entity.RefreshToken;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    RefreshToken findByToken(String token);

    RefreshToken findByEmail(String email);

    void deleteByEmail(String email);

}

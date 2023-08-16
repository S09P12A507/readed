package ssafy.readed.domain.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.readed.domain.member.entity.Member;
import ssafy.readed.domain.member.entity.Provider;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Member findByEmail(String email);

    Member findByNickname(String email);

    Member findByEmailAndProvider(String email, Provider provider);

    Long countBy();

    Long countByReadCountGreaterThanEqual(Long readCount);

}

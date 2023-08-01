package ssafy.readed.domain.report.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ssafy.readed.domain.report.entity.Report;

public interface ReportRepository extends JpaRepository<Report, Long> {

    @Query("select r from Report r where r.member.id=:memberId")
    List<Report> findByMemberId(Long memberId);
}

package ssafy.readed.domain.report.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.readed.domain.report.entity.Report;

public interface ReportRepository extends JpaRepository<Report, Long> {


}

package ssafy.readed.domain.report.repository;


import javax.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import ssafy.readed.ReadedApplicationTests;
import ssafy.readed.domain.book.entity.Book;
import ssafy.readed.domain.member.entity.Member;
import ssafy.readed.domain.report.entity.Report;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@Transactional
public class ReportRepositoryTest extends ReadedApplicationTests {

    @Autowired
    ReportRepository reportRepository;

    private Book book;
    private Member member;

    @Test
    public void 독후감저장() {
        Report report = Report.builder()
                .member(member)
                .book(book)
                .reportTitle("제목")
                .reportContent("내용")
                .isPublic(true)
                .build();

        reportRepository.save(report);
    }
}
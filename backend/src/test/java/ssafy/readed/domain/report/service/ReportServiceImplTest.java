package ssafy.readed.domain.report.service;


import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import ssafy.readed.domain.member.repository.MemberRepository;
import ssafy.readed.domain.report.controller.dto.ReportRequestDto;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
class ReportServiceImplTest {

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    ReportService reportService;

    @Test
    void getReportList() {
        reportService.getReportList(3L);
    }

    @Test
    void getReport() {
        reportService.getReport(3L);
    }

    @Test
    void saveReport() {
        ReportRequestDto requestDto = new ReportRequestDto("독후감 테스트 제목", "독후감 테스트 내용", true);

        reportService.saveReport(2L, memberRepository.findById(1L).orElseThrow(),
                requestDto);

    }

    @Test
    void deleteReport() {
    }

    @Test
    void updateReport() {
    }
}
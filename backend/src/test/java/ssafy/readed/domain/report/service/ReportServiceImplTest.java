package ssafy.readed.domain.report.service;


import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import ssafy.readed.domain.book.entity.Book;
import ssafy.readed.domain.member.entity.Member;
import ssafy.readed.domain.member.entity.Provider;
import ssafy.readed.domain.report.controller.dto.ReportRequestDto;
import ssafy.readed.domain.report.entity.Report;

@ExtendWith(SpringExtension.class)
@SpringBootTest
class ReportServiceImplTest {

    @Autowired
    ReportService reportService;


    @Test
    void getReportList() {
    }

    @Test
    void getReport() {
    }

    @Test
    void saveReport() {
        ReportRequestDto requestDto = ReportRequestDto.builder()
                .title("테스트 제목")
                .content("테스트 내용")
                .isPublic(true)
                .build();

        Member member = new Member("ssafy@gmail.com", "김싸피", Provider.DEFAULT, "싸피교육생");
        Book book = new Book(3L, "책 제목");

        Report report = Report.builder()
                .reportTitle(requestDto.getTitle())
                .reportContent(requestDto.getContent())
                .isPublic(requestDto.getIsPublic())
                .member(member)
                .book(book)
                .build();

        reportService.saveReport(book.getId(), member, requestDto);
    }

    @Test
    void deleteReport() {
    }

    @Test
    void updateReport() {
    }
}
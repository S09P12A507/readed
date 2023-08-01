package ssafy.readed.domain.report.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import ssafy.readed.domain.book.entity.Book;
import ssafy.readed.domain.book.repository.BookRepository;
import ssafy.readed.domain.member.entity.Member;
import ssafy.readed.domain.report.controller.dto.ReportRequestDto;
import ssafy.readed.domain.report.entity.Report;
import ssafy.readed.domain.report.repository.ReportRepository;
import ssafy.readed.global.exception.GlobalRuntimeException;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReportServiceImpl implements ReportService {

    private final ReportRepository reportRepository;
    private final BookRepository bookRepository;


    @Override
    public List<ReportResponseDto> getReportList(Long memberId) {
        return reportRepository.findByMemberId(memberId).stream()
                .map(ReportResponseDto::from).toList();
    }

    @Override
    public ReportResponseDto getReport(Long id) {

        Report report = reportRepository.findById(id).orElseThrow(
                () -> new GlobalRuntimeException("해당 id의 독후감이 존재하지 않습니다", HttpStatus.BAD_REQUEST)
        );

        return ReportResponseDto.from(report);

    }

    @Override
    public void saveReport(Long bookId, Member member, ReportRequestDto reportRequestDto) {

        Book book = getBook(bookId);

        //Member member1= new Member(2, )
        Report report = Report.builder()
                .reportTitle(reportRequestDto.getTitle())
                .reportContent(reportRequestDto.getContent())
                .book(book)
                .member(member)
                .isPublic(reportRequestDto.getIsPublic())
                .build();

        reportRepository.save(report);
    }

    @Override
    public void deleteReport(Long id) {

    }

    @Override
    public void updateReport(Long id, ReportRequestDto reportRequestDto) {

    }

    @Override
    public Book getBook(Long bookId) {
        return bookRepository.findById(bookId).orElseThrow(
                () -> new GlobalRuntimeException("해당 id의 책이 존재하지 않습니다", HttpStatus.BAD_REQUEST));

    }
}

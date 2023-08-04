package ssafy.readed.domain.report.service;

import java.util.List;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import ssafy.readed.domain.book.entity.Book;
import ssafy.readed.domain.book.repository.BookRepository;
import ssafy.readed.domain.member.entity.Member;
import ssafy.readed.domain.member.service.MemberService;
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
    private final MemberService memberService;


    @Transactional
    public List<ReportResponseDto> getReportList(Long memberId, Member member) {
        try {
            authCheck(memberId, member);
        } catch (GlobalRuntimeException e) {
            if (e.getStatusCode().equals(HttpStatus.BAD_REQUEST)) {
                throw e;
            }
            return ReportToReportResponseDto(reportRepository.findPublicReportByMemberId(memberId));
        }
        return ReportToReportResponseDto(reportRepository.findAllByMemberId(memberId));
    }

    @Override
    @Transactional
    public ReportResponseDto selectReport(Long reportId, Member member) {
        Report report = getReport(reportId);
        if (!report.getIsPublic()) {
            authCheck(report.getMember().getId(), member);
        }
        return ReportResponseDto.from(report);
    }

    @Override
    @Transactional
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
    @Transactional
    public void deleteReport(Long reportId) {
        reportRepository.delete(getReport(reportId));
    }

    @Override
    @Transactional
    public void updateReport(Long reportId, Member member, ReportRequestDto reportRequestDto) {
        Report report = getReport(reportId);

        authCheck(report.getMember().getId(), member);
        report.update(reportRequestDto);
    }

    private void authCheck(Long memberId, Member member) {
        if (memberService.selectMember(memberId).getId() == null) {
            throw new GlobalRuntimeException("해당 id의 사용자가 존재하지 않습니다.", HttpStatus.BAD_REQUEST);
        }

        if (!memberId.equals(member.getId())) {
            throw new GlobalRuntimeException("해당 id의 독후감에 접근할 권한이 없습니다.", HttpStatus.FORBIDDEN);
        }
    }

    private Book getBook(Long bookId) {
        return bookRepository.findById(bookId).orElseThrow(
                () -> new GlobalRuntimeException("해당 id의 책이 존재하지 않습니다", HttpStatus.BAD_REQUEST));
    }

    private Report getReport(Long reportId) {
        return reportRepository.findById(reportId).orElseThrow(
                () -> new GlobalRuntimeException("해당 id의 독후감이 존재하지 않습니다", HttpStatus.BAD_REQUEST)
        );
    }

    private static List<ReportResponseDto> ReportToReportResponseDto(List<Report> reports) {
        return reports.stream().map(ReportResponseDto::from).toList();
    }


}

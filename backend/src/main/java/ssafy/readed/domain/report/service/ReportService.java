package ssafy.readed.domain.report.service;

import java.util.List;
import ssafy.readed.domain.book.entity.Book;
import ssafy.readed.domain.member.entity.Member;
import ssafy.readed.domain.report.controller.dto.ReportRequestDto;

public interface ReportService {

    List<ReportResponseDto> getReportList(Long memberId);

    ReportResponseDto getReport(Long reportId);

    void saveReport(Long bookId, Member member, ReportRequestDto reportRequestDto);

    void deleteReport(Long id);

    void updateReport(Long id, ReportRequestDto reportRequestDto);

    Book getBook(Long bookId);
}

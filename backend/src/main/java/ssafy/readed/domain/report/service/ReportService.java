package ssafy.readed.domain.report.service;

import java.util.List;
import ssafy.readed.domain.member.entity.Member;
import ssafy.readed.domain.report.controller.dto.ReportRequestDto;

public interface ReportService {

    List<ReportResponseDto> getReportList(Long memberId, Member member);

    ReportResponseDto selectReport(Long reportId, Member member);

    void saveReport(Long bookId, Member member, ReportRequestDto reportRequestDto);

    void deleteReport(Long reportId);

    void updateReport(Long reportId, Member member, ReportRequestDto reportRequestDto);
}

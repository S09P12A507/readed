package ssafy.readed.domain.report.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.readed.domain.member.entity.Member;
import ssafy.readed.domain.report.controller.dto.ReportRequestDto;
import ssafy.readed.domain.report.service.ReportResponseDto;
import ssafy.readed.domain.report.service.ReportService;
import ssafy.readed.global.exception.GlobalRuntimeException;
import ssafy.readed.global.response.JsonResponse;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/reports")
@CrossOrigin("*")
public class ReportController {

    private final ReportService reportService;

    @PostMapping(value = "/{book-id}")
    public ResponseEntity<?> save(@PathVariable(name = "book-id") Long bookId,
            @AuthenticationPrincipal Member member,
            @RequestBody ReportRequestDto requestDto) {
        reportService.saveReport(bookId, member, requestDto);
        return JsonResponse.ok("독후감이 저장되었습니다.");
    }

    @GetMapping(value = "/{report-id}")
    public ResponseEntity<?> getReport(@PathVariable(name = "report-id") Long reportId,
            @AuthenticationPrincipal Member member) {
        ReportResponseDto reportResponseDto = reportService.selectReport(reportId);

        return JsonResponse.ok("독후감 1개를 불러왔습니다.", reportResponseDto);
    }

    @GetMapping(value = "/members/{member-id}")
    public ResponseEntity<?> getReportList(@PathVariable(name = "member-id") Long memberId,
            @AuthenticationPrincipal Member member) {
        List<ReportResponseDto> reportList = reportService.getReportList(memberId);

        if (reportList == null) {
            throw new GlobalRuntimeException("독후감이 하나도 존재하지 않습니다.", HttpStatus.BAD_REQUEST);
        }
        return JsonResponse.ok("독후감 리스트를 불러왔습니다.", reportList);
    }

    @PatchMapping(value = "/{report-id}")
    public ResponseEntity<?> updateReport(@PathVariable(name = "report-id") Long reportId,
            @AuthenticationPrincipal Member member,
            @RequestBody ReportRequestDto requestDto) {
        reportService.updateReport(reportId, member, requestDto);
        return JsonResponse.ok("독후감이 수정되었습니다.");
    }

    @DeleteMapping(value = "{report-id}")
    public ResponseEntity<?> deleteReport(@PathVariable(name = "report-id") Long reportId,
            @AuthenticationPrincipal Member member) {
        reportService.deleteReport(reportId);
        return JsonResponse.ok("독후감이 삭제되었습니다.");
    }


}

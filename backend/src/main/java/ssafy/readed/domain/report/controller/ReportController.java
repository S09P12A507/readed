package ssafy.readed.domain.report.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.readed.domain.member.entity.Member;
import ssafy.readed.domain.report.controller.dto.ReportRequestDto;
import ssafy.readed.domain.report.service.ReportService;
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

}

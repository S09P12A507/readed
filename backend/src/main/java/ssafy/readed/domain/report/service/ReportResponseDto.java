package ssafy.readed.domain.report.service;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.readed.domain.report.entity.Report;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReportResponseDto {

    private Long id;
    private String title;
    private String content;
    private Boolean isPublic;
    private Long bookId;
    private String bookTitle;
    private String bookCover;
    private Long memberId;
    private String memberNickname;

    public static ReportResponseDto from(Report report, String s3Url) {
        return ReportResponseDto.builder()
                .id(report.getId())
                .title(report.getReportTitle())
                .content(report.getReportContent())
                .isPublic(report.getIsPublic())
                .bookId(report.getBook().getId())
                .bookTitle(report.getBook().getTitle())
                .bookCover(s3Url)
                .memberId(report.getMember().getId())
                .memberNickname(report.getMember().getNickname())
                .build();
    }
}

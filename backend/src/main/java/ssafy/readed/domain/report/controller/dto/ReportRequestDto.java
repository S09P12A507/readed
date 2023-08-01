package ssafy.readed.domain.report.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReportRequestDto {

    private String title;
    private String content;
    private Boolean isPublic;
}

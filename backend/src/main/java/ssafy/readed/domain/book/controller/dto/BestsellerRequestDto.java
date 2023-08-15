package ssafy.readed.domain.book.controller.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BestsellerRequestDto {

    private Integer year;
    private Integer month;
    private Integer week;
}

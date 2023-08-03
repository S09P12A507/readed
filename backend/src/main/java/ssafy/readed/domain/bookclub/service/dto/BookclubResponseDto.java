package ssafy.readed.domain.bookclub.service.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.readed.domain.bookclub.entity.Bookclub;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookclubResponseDto {

    private String title;
    private String context;
    private LocalDateTime time;
    private Integer participantCount;
    private Boolean isPublic;

    public static BookclubResponseDto from(Bookclub bookclub) {
        return BookclubResponseDto.builder()
                .title(bookclub.getBookClubTitle())
                .context(bookclub.getBookClubContent())
                .time(bookclub.getStartTime())
                .isPublic(bookclub.getIsPublic())
                .build();
    }
}

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

    private Long id;
    private String title;
    private String context;
    private LocalDateTime time;
    private Integer participantCount;
    private Boolean isPublic;
    private Boolean isFinished;

    public static BookclubResponseDto from(Bookclub bookclub) {
        return BookclubResponseDto.builder()
                .id(bookclub.getId())
                .title(bookclub.getBookclubTitle())
                .context(bookclub.getBookclubContent())
                .time(bookclub.getStartTime())
                .participantCount(bookclub.getParticipantCount())
                .isPublic(bookclub.getIsPublic())
                .isFinished(bookclub.getIsFinished())
                .build();
    }
}

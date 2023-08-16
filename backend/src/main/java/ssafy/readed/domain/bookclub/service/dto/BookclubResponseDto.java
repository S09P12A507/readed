package ssafy.readed.domain.bookclub.service.dto;

import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.readed.domain.book.entity.Book;
import ssafy.readed.domain.book.entity.BookCoverFile;
import ssafy.readed.domain.bookclub.entity.Bookclub;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookclubResponseDto {

    private Long id;
    private Long roomId;
    private String title;
    private String bookTitle;
    private String bookCoverImageUrl;
    private String context;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Integer participantCount;
    private Boolean isPublic;
    private Boolean isFinished;
    private String password;
    private Integer duration;
    private List<MemberDto> memberList;

    public static BookclubResponseDto from(Bookclub bookclub, String bookCoverImageUrl, List<MemberDto> memberList) {
        return BookclubResponseDto.builder()
                .id(bookclub.getId())
                .roomId(bookclub.getRoomId())
                .title(bookclub.getBookclubTitle())
                .context(bookclub.getBookclubContent())
                .startTime(bookclub.getStartTime())
                .endTime(bookclub.getEndTime())
                .participantCount(bookclub.getParticipantCount())
                .isPublic(bookclub.getIsPublic())
                .isFinished(bookclub.getIsFinished())
                .bookTitle(bookclub.getBook().getTitle())
                .bookCoverImageUrl(bookCoverImageUrl)
                .memberList(memberList)
                .duration(bookclub.getDuration())
                .password(bookclub.getPassword())
                .build();
    }
}

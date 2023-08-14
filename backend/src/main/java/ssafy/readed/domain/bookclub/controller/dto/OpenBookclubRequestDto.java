package ssafy.readed.domain.bookclub.controller.dto;


import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.readed.domain.book.entity.Book;
import ssafy.readed.domain.bookclub.entity.Bookclub;
import ssafy.readed.domain.member.entity.Member;

@Getter
@NoArgsConstructor
public class OpenBookclubRequestDto {

    private Long bookId;
    private String title;
    private String description;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Integer maxMember;
    private boolean isPublic;
    private String password;

    @Builder
    public OpenBookclubRequestDto(Long bookId, String title, String description,
            LocalDateTime startTime, LocalDateTime endTime, Integer maxMember, boolean isPublic,
            String password) {
        this.bookId = bookId;
        this.title = title;
        this.description = description;
        this.startTime = startTime;
        this.endTime = endTime;
        this.maxMember = maxMember;
        this.isPublic = isPublic;
        this.password = password;
    }

    public Bookclub toEntity(Member member, Book book){
        return Bookclub.builder()
                .bookclubTitle(this.title)
                .bookclubContent(this.description)
                .startTime(this.startTime)
                .endTime(this.endTime)
                .participantCount(this.maxMember)
                .isPublic(this.isPublic)
                .bookclubPassword(this.password)
                .isFinished(false)
                .host(member)
                .book(book)
                .build();
    }
}

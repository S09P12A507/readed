package ssafy.readed.domain.book.service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.readed.domain.book.entity.Author;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthorDetailResponseDto {

    private Long authorId;
    private String authorKoreanName;
    private String authorOriginalName;
    private String authorImage;
    private String authorBio;

    public static AuthorDetailResponseDto from(Author author, String s3Url) {
        return AuthorDetailResponseDto.builder()
                .authorId(author.getId())
                .authorKoreanName(author.getKoreanName())
                .authorOriginalName(author.getOriginalName())
                .authorImage(s3Url)
                .authorBio(author.getBio())
                .build();
    }

}

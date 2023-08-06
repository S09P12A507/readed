package ssafy.readed.domain.book.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.readed.global.entity.File;

import javax.persistence.*;

@DiscriminatorValue("AuthorProfile")
@Getter
@Entity
@NoArgsConstructor
public class AuthorProfileFile extends File {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id")
    private Author author;

    @Builder
    public AuthorProfileFile(String originalFilename, String savedFilename, String savedPath, Author author) {
        super(originalFilename, savedFilename, savedPath);
        this.author = author;
    }

}

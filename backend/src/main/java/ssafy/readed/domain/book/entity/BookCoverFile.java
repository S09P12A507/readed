package ssafy.readed.domain.book.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.readed.global.entity.File;

import javax.persistence.*;

@DiscriminatorValue("BookCover")
@Getter
@Entity
@NoArgsConstructor
public class BookCoverFile extends File {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id")
    private Book book;

    @Builder
    public BookCoverFile(String originalFilename, String savedFilename, String savedPath, Book book) {
        super(originalFilename, savedFilename, savedPath);
        this.book = book;
    }

}

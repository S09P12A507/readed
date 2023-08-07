package ssafy.readed.domain.book.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.readed.global.entity.File;

import javax.persistence.*;

@DiscriminatorValue("PublisherLogo")
@Getter
@Entity
@NoArgsConstructor
public class PublisherLogoFile extends File {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "publisher_id")
    private Publisher publisher;

    @Builder
    public PublisherLogoFile(String originalFilename, String savedFilename, String savedPath, Publisher publisher) {
        super(originalFilename, savedFilename, savedPath);
        this.publisher = publisher;
    }

}

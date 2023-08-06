package ssafy.readed.domain.book.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.readed.global.entity.BaseEntity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Author extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "author_id")
    private Long id;

    @Column(name = "author_korean_name")
    private String koreanName;

    @Column(name = "author_original_name")
    private String originalName;

    @Column(name = "author_bio", columnDefinition = "TEXT")
    private String bio;

    private String aladinId;

    @OneToOne(mappedBy = "author", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private AuthorProfileFile authorProfileFile;

    @OneToMany(mappedBy = "author", fetch = FetchType.LAZY)
    private List<BookAuthor> bookAuthorList = new ArrayList<>();

    @Builder
    public Author(String koreanName, String originalName, String bio, String aladinId, AuthorProfileFile authorProfileFile) {
        this.koreanName = koreanName;
        this.originalName = originalName;
        this.bio = bio;
        this.aladinId = aladinId;
        this.authorProfileFile = authorProfileFile;
    }
}

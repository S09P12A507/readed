package ssafy.readed.domain.book.entity;

import lombok.AccessLevel;
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

    @Column(name = "author_image")
    private String image;

    private String aladinId;

    @OneToMany(mappedBy = "author", fetch = FetchType.LAZY)
    private List<BookAuthor> bookAuthorList = new ArrayList<>();
}

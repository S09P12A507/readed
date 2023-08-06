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
public class Publisher extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "publisher_id")
    private Long id;

    @Column(name = "publisher_name")
    private String name;

    private String aladinId;

    @OneToOne(mappedBy = "publisher", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private PublisherLogoFile publisherLogoFile;

    @OneToMany(mappedBy = "publisher", fetch = FetchType.LAZY)
    private List<Book> bookList = new ArrayList<>();

    @Builder
    public Publisher(String name, String aladinId, PublisherLogoFile publisherLogoFile) {
        this.name = name;
        this.aladinId = aladinId;
        this.publisherLogoFile = publisherLogoFile;
    }
}

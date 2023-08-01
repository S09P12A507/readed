package ssafy.readed.domain.book.entity;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.readed.global.entity.BaseEntity;

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

    @Column(name = "publisher_logo")
    private String logo;

    private String aladinId;

    @OneToMany(mappedBy = "publisher", fetch = FetchType.LAZY)
    private List<Book> bookList = new ArrayList<>();

    @Builder
    public Publisher(String name, String logo, String aladinId) {
        this.name = name;
        this.logo = logo;
        this.aladinId = aladinId;
    }
}

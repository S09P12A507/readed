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

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Long id;

    @Column(name = "category_name")
    private String name;

    private String depth0;
    private String depth1;
    private String depth2;
    private String depth3;
    private String depth4;
    private String depth5;

    @OneToMany(mappedBy = "category", fetch = FetchType.LAZY)
    private List<Book> bookList = new ArrayList<>();

    @Builder
    public Category(String name, String depth0, String depth1, String depth2,
            String depth3,
            String depth4, String depth5) {
        this.name = name;
        this.depth0 = depth0;
        this.depth1 = depth1;
        this.depth2 = depth2;
        this.depth3 = depth3;
        this.depth4 = depth4;
        this.depth5 = depth5;
    }
}

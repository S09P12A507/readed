package ssafy.readed.domain.book.entity;


import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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

}

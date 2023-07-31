package ssafy.readed.domain.book.entity;


import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BookCode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_code_id")
    private Long id;

    private String isbn;

    private String isbn13;

    private String eIsbn;

    private String eIsbn13;

    private String aladinId;

    private String kyoboId;

    @Column(name = "yes24_id")
    private String yes24Id;

    private String eAladinId;

    private String eKyoboId;

    @Column(name = "e_yes24_id")
    private String eYes24Id;

    private String eMillieId;

    private String eRidiId;

    @OneToOne(mappedBy = "bookCode", fetch = FetchType.LAZY)
    private Book book;

}

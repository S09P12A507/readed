package ssafy.readed.domain.book.entity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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

    @Builder
    public BookCode(String isbn, String isbn13, String eIsbn, String eIsbn13, String aladinId,
            String kyoboId, String yes24Id, String eAladinId, String eKyoboId, String eYes24Id,
            String eMillieId, String eRidiId) {
        this.isbn = isbn;
        this.isbn13 = isbn13;
        this.eIsbn = eIsbn;
        this.eIsbn13 = eIsbn13;
        this.aladinId = aladinId;
        this.kyoboId = kyoboId;
        this.yes24Id = yes24Id;
        this.eAladinId = eAladinId;
        this.eKyoboId = eKyoboId;
        this.eYes24Id = eYes24Id;
        this.eMillieId = eMillieId;
        this.eRidiId = eRidiId;
    }
}

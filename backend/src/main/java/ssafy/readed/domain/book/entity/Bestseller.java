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
public class Bestseller extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bestseller_id")
    private Long id;

    private Integer year;
    private Integer month;
    private Integer week;

    @Builder
    public Bestseller(Integer year, Integer month, Integer week) {
        this.year = year;
        this.month = month;
        this.week = week;
    }

    @OneToMany(mappedBy = "bestseller", fetch = FetchType.LAZY)
    private List<BestsellerBook> bestsellerBookList = new ArrayList<>();

}

package ssafy.readed.domain.member.entity;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.readed.domain.report.entity.Report;

@Entity
@Getter
@NoArgsConstructor
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "member_id")
    private Long id;
    private String email;
    @Column(name = "member_name")
    private String name;
    @Enumerated(EnumType.STRING)
    private Provider provider;
    private String nickname;
    private String profile_bio;
    private String profile_image;
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "password_id")
    private Password password;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<Report> reports = new ArrayList<>();

    private Integer readCount; // 코멘트 수
    private Integer reportCount; // 독후감 수
    private Integer bookclubCount; // 북클럽 횟수
    private Integer pageCount; // 읽은 페이지 수
    private Integer star_0p5_count; // 별점 0.5점
    private Integer star_1_count; // 별점 1점
    private Integer star_1p5_count; // 별점 1.5점
    private Integer star_2_count; // 별점 2점
    private Integer star_2p5_count; // 별점 2.5점
    private Integer star_3_count; // 별점 3점
    private Integer star_3p5_count; // 별점 3.5점
    private Integer star_4_count; // 별점 4점
    private Integer star_4p5_count; // 별점 4.5점
    private Integer star_5_count; // 별점 5점

    @Builder
    public Member(Long id, String email, String name, Provider provider, String nickname,
            String profile_bio, String profile_image, Password password) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.provider = provider;
        this.nickname = nickname;
        this.profile_bio = profile_bio;
        this.profile_image = profile_image;
        this.password = password;
    }

    @Builder
    public Member(String email, String name, Provider provider, String nickname) {
        //필수값
        this.email = email;
        this.name = name;
        this.provider = provider;
        this.nickname = nickname;
    }

    public void modify(String nickname, String profile_image, String profile_bio) {
        this.nickname = nickname;
        this.profile_bio = profile_bio;
        this.profile_image = profile_image;
    }
}

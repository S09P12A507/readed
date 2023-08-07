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
import ssafy.readed.domain.bookclub.entity.Bookclub;
import ssafy.readed.domain.bookclub.entity.Participant;
import ssafy.readed.domain.member.controller.dto.ModifyMemberProfileRequestDto;
import ssafy.readed.domain.report.entity.Report;

@Entity
@Getter
@NoArgsConstructor
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @Column(unique = true)
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
    private List<Report> reportList = new ArrayList<>();

    @OneToMany(mappedBy = "host", fetch = FetchType.LAZY)
    private List<Bookclub> bookclubList = new ArrayList<>();

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<Participant> participantList = new ArrayList<>();


    private Integer readCount = 0; // 코멘트 수
    private Integer reportCount = 0; // 독후감 수
    private Integer bookclubCount = 0; // 북클럽 횟수
    private Integer pageCount = 0; // 읽은 페이지 수
    private Integer star_0p5_count = 0; // 별점 0.5점
    private Integer star_1_count = 0; // 별점 1점
    private Integer star_1p5_count = 0; // 별점 1.5점
    private Integer star_2_count = 0; // 별점 2점
    private Integer star_2p5_count = 0; // 별점 2.5점
    private Integer star_3_count = 0; // 별점 3점
    private Integer star_3p5_count = 0; // 별점 3.5점
    private Integer star_4_count = 0; // 별점 4점
    private Integer star_4p5_count = 0; // 별점 4.5점
    private Integer star_5_count = 0; // 별점 5점

    public void modify(ModifyMemberProfileRequestDto memberProfileRequestDto) {
        this.nickname = memberProfileRequestDto.getNickname();
        this.profile_bio = memberProfileRequestDto.getProfile_bio();
        this.profile_image = memberProfileRequestDto.getProfile_image();
    }

    public void modifyPW(Password newPassword) {
        this.password = newPassword;
    }

    @Builder
    public Member(String email, String name, Provider provider, String nickname, String profile_bio,
            String profile_image, Password password) {
        this.email = email;
        this.name = name;
        this.provider = provider;
        this.nickname = nickname;
        this.profile_bio = profile_bio;
        this.profile_image = profile_image;
        this.password = password;
    }
}

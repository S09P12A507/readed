package ssafy.readed.domain.member.entity;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Convert;
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
import org.hibernate.annotations.Where;
import ssafy.readed.domain.bookclub.entity.Bookclub;
import ssafy.readed.domain.bookclub.entity.Participant;
import ssafy.readed.domain.member.controller.dto.ModifyMemberProfileRequestDto;
import ssafy.readed.domain.report.entity.Report;
import ssafy.readed.global.entity.BaseEntity;
import ssafy.readed.global.util.IntegerArrayConverter;

@Entity
@Getter
@NoArgsConstructor
@Where(clause = "is_valid=true")
public class Member extends BaseEntity {

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

    @Convert(converter = IntegerArrayConverter.class)
    private List<Integer> starCount = new ArrayList<>(
            Arrays.asList(0, 0, 0, 0, 0, 0, 0, 0, 0, 0)); //별점 갯수

    public void modify(ModifyMemberProfileRequestDto memberProfileRequestDto) {
        this.nickname = memberProfileRequestDto.getNickname();
        this.profile_bio = memberProfileRequestDto.getProfile_bio();
        this.profile_image = memberProfileRequestDto.getProfile_image();
    }

    public void modifyPW(Password newPassword) {
        this.password = newPassword;
    }

    public void addParticipant(Participant participant) {
        this.participantList.add(participant);
        this.bookclubCount++;
    }

    public void addBookclub(Bookclub bookclub) {
        this.bookclubList.add(bookclub);
    }

    public void addReport(Report report) {
        this.reportList.add(report);
        this.reportCount++;
    }

    public void addComment(int page, int star) {
        this.readCount++;
        this.pageCount += page;
        this.starCount.set(star, this.starCount.get(star) + 1);
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

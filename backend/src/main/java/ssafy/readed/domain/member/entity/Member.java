package ssafy.readed.domain.member.entity;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
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
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.Where;
import ssafy.readed.domain.bookclub.entity.Bookclub;
import ssafy.readed.domain.bookclub.entity.Participant;
import ssafy.readed.domain.bookmark.entity.Bookmark;
import ssafy.readed.domain.comment.entity.Comment;
import ssafy.readed.domain.member.controller.dto.ModifyMemberProfileRequestDto;
import ssafy.readed.domain.report.entity.Report;
import ssafy.readed.global.entity.BaseEntity;
import ssafy.readed.global.util.IntegerArrayConverter;

@Entity
@Getter
@NoArgsConstructor
@Where(clause = "is_valid=true")
@Slf4j
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @Column(unique = true)
    private String email;

    @Column(name = "member_name")
    private String name;

    private String provider;
    private String nickname;
    private String profileBio;

    @OneToOne(mappedBy = "member", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private MemberProfileFile memberProfileFile;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "password_id")
    private Password password;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<Report> reportList = new ArrayList<>();

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<Comment> commentList = new ArrayList<>();

    @OneToMany(mappedBy = "host", fetch = FetchType.LAZY)
    private List<Bookclub> bookclubList = new ArrayList<>();

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<Participant> participantList = new ArrayList<>();

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<Bookmark> bookmarkList = new ArrayList<>();


    private Long readCount = 0L; // 코멘트 수
    private Long reportCount = 0L; // 독후감 수
    private Long bookclubCount = 0L; // 북클럽 횟수
    private Long pageCount = 0L; // 읽은 페이지 수

    @Convert(converter = IntegerArrayConverter.class)
    private List<Integer> starCount = new ArrayList<>(
            Arrays.asList(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)); //별점 갯수

    public void modify(ModifyMemberProfileRequestDto memberProfileRequestDto) {
        this.nickname = memberProfileRequestDto.getNickname();
        this.profileBio = memberProfileRequestDto.getProfileBio();
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

    public void deleteReport(Report report) {
        this.reportList.remove(report);
        this.reportCount--;
    }

    public void addComment(Long page, int star) {
        this.readCount++;
        this.pageCount += page;
        this.starCount.set(star, this.starCount.get(star) + 1);
    }

    public void addBookmark(Bookmark bookmark) {
        this.bookmarkList.add(bookmark);
    }

    public void deleteBookmark(Long bookmarkId) {
        this.bookmarkList.remove(bookmarkId);
    }

    public void deleteComment(Long page, int star) {
        this.readCount--;
        this.pageCount -= page;
        this.starCount.set(star, this.starCount.get(star) - 1);
    }

    public void saveNewProfileFile(String path, String originalFilename, String savedFilename) {
        this.memberProfileFile = MemberProfileFile
                .builder()
                .savedFilename(savedFilename)
                .savedPath(path)
                .originalFilename(originalFilename)
                .member(this).build();
    }

    @Builder
    public Member(String email, String name, String provider, String nickname, String profileBio,
            Password password) {
        this.email = email;
        this.name = name;
        this.provider = provider;
        this.nickname = nickname;
        this.profileBio = profileBio;
        this.password = password;
    }
}

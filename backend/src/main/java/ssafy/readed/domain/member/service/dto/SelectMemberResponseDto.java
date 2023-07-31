package ssafy.readed.domain.member.service.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import ssafy.readed.domain.member.entity.Member;

@Getter
@NoArgsConstructor
@ToString
public class SelectMemberResponseDto {

    private Long id;
    private String nickname;
    private String profile_bio;
    private String profile_image;

    private int readCount;
    private int reportCount;
    private int bookclubCount; // 북클럽 횟수
    private int pageCount; // 읽은 페이지 수
    private int star_0_count; // 별점 0점
    private int star_0p5_count; // 별점 0.5점
    private int star_1_count; // 별점 1점
    private int star_1p5_count; // 별점 1.5점
    private int star_2_count; // 별점 2점
    private int star_2p5_count; // 별점 2.5점
    private int star_3_count; // 별점 3점
    private int star_3p5_count; // 별점 3.5점
    private int star_4_count; // 별점 4점
    private int star_4p5_count; // 별점 4.5점
    private int star_5_count; // 별점 5점

    @Builder
    public SelectMemberResponseDto(Long id, String nickname, String profile_bio,
            String profile_image,
            int readCount, int reportCount, int bookclubCount, int pageCount, int star_0_count,
            int star_0p5_count, int star_1_count, int star_1p5_count, int star_2_count,
            int star_2p5_count, int star_3_count, int star_3p5_count, int star_4_count,
            int star_4p5_count, int star_5_count) {
        this.id = id;
        this.nickname = nickname;
        this.profile_bio = profile_bio;
        this.profile_image = profile_image;
        this.readCount = readCount;
        this.reportCount = reportCount;
        this.bookclubCount = bookclubCount;
        this.pageCount = pageCount;
        this.star_0p5_count = star_0p5_count;
        this.star_1_count = star_1_count;
        this.star_1p5_count = star_1p5_count;
        this.star_2_count = star_2_count;
        this.star_2p5_count = star_2p5_count;
        this.star_3_count = star_3_count;
        this.star_3p5_count = star_3p5_count;
        this.star_4_count = star_4_count;
        this.star_4p5_count = star_4p5_count;
        this.star_5_count = star_5_count;
    }

    public static SelectMemberResponseDto from(Member member) {
        return SelectMemberResponseDto.builder()
                .id(member.getId())
                .nickname(member.getNickname())
                .profile_bio(member.getProfile_bio())
                .profile_image(member.getProfile_image())
                .readCount(member.getReadCount())
                .reportCount(member.getReportCount())
                .bookclubCount(member.getBookclubCount())
                .pageCount(member.getPageCount())
                .star_0p5_count(member.getStar_0p5_count())
                .star_1_count(member.getStar_1_count())
                .star_1p5_count(member.getStar_1p5_count())
                .star_2_count(member.getStar_2_count())
                .star_2p5_count(member.getStar_2p5_count())
                .star_3_count(member.getStar_3_count())
                .star_3p5_count(member.getStar_3p5_count())
                .star_4_count(member.getStar_4_count())
                .star_4p5_count(member.getStar_4p5_count())
                .star_5_count(member.getStar_5_count())
                .build();
    }
}

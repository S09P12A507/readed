package ssafy.readed.domain.member.service.dto;

import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import ssafy.readed.domain.member.entity.Member;

@Getter
@NoArgsConstructor
@ToString
public class SelectProfileResponseDto {

    private Long id;
    private String nickname;
    private String profileBio;
    private String profileImage;

    private Long readCount;
    private Long reportCount;
    private Long bookclubCount; // 북클럽 횟수
    private Long pageCount; // 읽은 페이지 수
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
    private Double topPercentage; // 상위 몇퍼

    @Builder
    public SelectProfileResponseDto(Long id, String nickname, String profileBio,
            String profileImage,
            Long readCount, Long reportCount, Long bookclubCount, Long pageCount,
            List<Integer> starCount, Double topPercentage) {
        this.id = id;
        this.nickname = nickname;
        this.profileBio = profileBio;
        this.profileImage = profileImage;
        this.readCount = readCount;
        this.reportCount = reportCount;
        this.bookclubCount = bookclubCount;
        this.pageCount = pageCount;
        this.star_0_count = starCount.get(0);
        this.star_0p5_count = starCount.get(1);
        this.star_1_count = starCount.get(2);
        this.star_1p5_count = starCount.get(3);
        this.star_2_count = starCount.get(4);
        this.star_2p5_count = starCount.get(5);
        this.star_3_count = starCount.get(6);
        this.star_3p5_count = starCount.get(7);
        this.star_4_count = starCount.get(8);
        this.star_4p5_count = starCount.get(9);
        this.star_5_count = starCount.get(10);
        this.topPercentage = topPercentage;
    }

    public static SelectProfileResponseDto from(Member member, String url, Double topPercentage) {

        return SelectProfileResponseDto.builder()
                .id(member.getId())
                .nickname(member.getNickname())
                .profileBio(member.getProfileBio())
                .profileImage(url)
                .readCount(member.getReadCount())
                .reportCount(member.getReportCount())
                .bookclubCount(member.getBookclubCount())
                .pageCount(member.getPageCount())
                .starCount(member.getStarCount())
                .topPercentage(topPercentage)
                .build();
    }
}

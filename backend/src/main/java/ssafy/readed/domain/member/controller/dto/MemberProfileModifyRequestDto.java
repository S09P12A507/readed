package ssafy.readed.domain.member.controller.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@ToString
public class MemberProfileModifyRequestDto {

    private String nickname;
    private String profile_image;
    private String profile_bio;

    @Builder
    public MemberProfileModifyRequestDto(String nickname, String profile_image,
            String profile_bio) {
        this.nickname = nickname;
        this.profile_image = profile_image;
        this.profile_bio = profile_bio;
    }
}

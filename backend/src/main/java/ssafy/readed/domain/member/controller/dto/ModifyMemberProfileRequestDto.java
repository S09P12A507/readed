package ssafy.readed.domain.member.controller.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@ToString
public class ModifyMemberProfileRequestDto {

    private String nickname;
    private String profileBio;

    @Builder
    public ModifyMemberProfileRequestDto(String nickname, String profileBio) {
        this.nickname = nickname;
        this.profileBio = profileBio;
    }
}

package ssafy.readed.domain.member.controller.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

@Getter
@NoArgsConstructor
@ToString
public class ModifyMemberProfileRequestDto {

    private String nickname;
    private MultipartFile profileImage;
    private String profileBio;

    @Builder
    public ModifyMemberProfileRequestDto(String nickname, MultipartFile profileImage,
            String profileBio) {
        this.nickname = nickname;
        this.profileImage = profileImage;
        this.profileBio = profileBio;
    }
}

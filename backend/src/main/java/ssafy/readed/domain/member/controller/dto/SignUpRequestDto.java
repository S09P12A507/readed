package ssafy.readed.domain.member.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SignUpRequestDto {

    private String name;
    private String email;
    private String password;
    private String password2;
    private String nickname;
    private String profileBio;
    private String socialLoginType;

}

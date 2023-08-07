package ssafy.readed.domain.member.controller.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@ToString
public class ModifyPasswordRequestDto {

    private String prevPassword;
    private String password;
    private String password2;
}

package ssafy.readed.domain.auth.vo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class Token {

    private String accessToken;
    private String refreshToken;

}

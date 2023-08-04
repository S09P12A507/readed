package ssafy.readed.domain.auth.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Builder
@AllArgsConstructor
public class Token {

    private String accessToken;
    private String refreshToken;

}

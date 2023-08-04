package ssafy.readed.domain.auth.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RefreshAccessTokenRequestDto {

    private String refreshToken;

}

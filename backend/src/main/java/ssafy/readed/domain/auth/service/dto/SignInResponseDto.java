package ssafy.readed.domain.auth.service.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ssafy.readed.domain.auth.vo.Token;

@NoArgsConstructor
@Getter
@Setter
public class SignInResponseDto {

    private String accessToken;
    private String refreshToken;
    @Builder
    public SignInResponseDto(String accessToken, String refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

    public static SignInResponseDto from(Token token){
        return SignInResponseDto.builder()
                .accessToken(token.getAccessToken())
                .refreshToken(token.getRefreshToken())
                .build();
    }
}

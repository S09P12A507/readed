package ssafy.readed.domain.auth.service.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class SignInResponseDto {

    String access_token;

    @Builder
    public SignInResponseDto(String access_token) {
        this.access_token = access_token;
    }
}

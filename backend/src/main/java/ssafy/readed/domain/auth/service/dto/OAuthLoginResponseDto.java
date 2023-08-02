package ssafy.readed.domain.auth.service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OAuthLoginResponseDto {

    private OAuthDetailDto detailDto;
    private SignInResponseDto token;
}

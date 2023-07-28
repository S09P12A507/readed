package ssafy.readed.domain.auth.service;

import ssafy.readed.domain.auth.service.dto.OAuthDetailDto;
import ssafy.readed.domain.auth.service.dto.OAuthLoginResponseDto;
import ssafy.readed.domain.auth.utility.SocialLoginType;

public interface OAuthService {

    OAuthLoginResponseDto login(SocialLoginType socialLoginType, String code);

    OAuthDetailDto getUserDetail(SocialLoginType socialLoginType, String token);

    boolean emailDuplicationCheck(String email);
}

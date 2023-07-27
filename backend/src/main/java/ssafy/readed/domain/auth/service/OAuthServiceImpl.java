package ssafy.readed.domain.auth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import ssafy.readed.domain.auth.service.dto.OAuthDetailDto;
import ssafy.readed.domain.auth.service.dto.OAuthLoginResponseDto;
import ssafy.readed.domain.auth.utility.SocialLoginType;

@Service
@Repository
@RequiredArgsConstructor
public class OAuthServiceImpl implements OAuthService {

    private final GoogleOAuthProvider googleOAuthProvider;
    private final KakaoOAuthProvider kakaoOAuthProvider;

    @Override
    public OAuthLoginResponseDto login(SocialLoginType socialLoginType, String code) {
        String access_token;
        OAuthLoginResponseDto responseDto;

        switch (socialLoginType) {
            case GOOGLE -> {
                access_token = googleOAuthProvider.getToken(code);
            }
            case KAKAO -> {
                access_token = kakaoOAuthProvider.getToken(code);
            }
            default -> {
                throw new IllegalArgumentException("알 수 없는 소셜 로그인 형식입니다.");
            }
        }

        responseDto = OAuthLoginResponseDto.builder()
                .access_token(access_token)
                .build();

        return responseDto;
    }

    @Override
    public OAuthDetailDto getUserDetail(SocialLoginType socialLoginType, String token) {
        OAuthDetailDto detailDto;

        switch (socialLoginType) {
            case GOOGLE -> {
                detailDto = googleOAuthProvider.getOAuthDetail(token);
            }
            case KAKAO -> {
                detailDto = kakaoOAuthProvider.getOAuthDetail(token);
            }
            default -> {
                throw new IllegalArgumentException("알 수 없는 소셜 로그인 형식입니다.");
            }
        }
        return detailDto;
    }
}

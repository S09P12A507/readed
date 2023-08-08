package ssafy.readed.domain.auth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import ssafy.readed.domain.auth.service.dto.OAuthDetailDto;
import ssafy.readed.domain.auth.service.dto.OAuthLoginResponseDto;
import ssafy.readed.domain.auth.service.dto.TokenDto;
import ssafy.readed.domain.auth.utility.SocialLoginType;
import ssafy.readed.domain.auth.vo.Token;
import ssafy.readed.domain.member.entity.Member;
import ssafy.readed.domain.member.repository.MemberRepository;
import ssafy.readed.global.exception.GlobalRuntimeException;
import ssafy.readed.global.security.JwtTokenProvider;

@Service
@RequiredArgsConstructor
public class OAuthServiceImpl implements OAuthService {

    private final GoogleOAuthProvider googleOAuthProvider;
    private final KakaoOAuthProvider kakaoOAuthProvider;
    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;


    @Override
    public OAuthLoginResponseDto login(SocialLoginType socialLoginType, String code) {
        String accessToken;
        OAuthLoginResponseDto oAuthLoginResponseDto;

        switch (socialLoginType) {
            case GOOGLE -> {
                accessToken = googleOAuthProvider.getToken(code);
            }
            case KAKAO -> {
                accessToken = kakaoOAuthProvider.getToken(code);
            }
            default -> {
                throw new GlobalRuntimeException("알 수 없는 소셜 로그인 형식입니다.",
                        HttpStatus.PRECONDITION_FAILED);
            }
        }

        OAuthDetailDto detailDto = getUserDetail(socialLoginType, accessToken);
        boolean isDuplicated = isEmailDuplicated(detailDto.getEmail());

        if (!isDuplicated) {
            oAuthLoginResponseDto = OAuthLoginResponseDto.builder()
                    .token(null)
                    .detailDto(detailDto)
                    .build();
        } else {
            Token token = jwtTokenProvider.createToken(detailDto.getEmail());
            TokenDto tokenDto = TokenDto.from(token);

            oAuthLoginResponseDto = OAuthLoginResponseDto.builder()
                    .token(tokenDto)
                    .detailDto(detailDto)
                    .build();
        }
        return oAuthLoginResponseDto;
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
                throw new GlobalRuntimeException("알 수 없는 소셜 로그인 형식입니다.",
                        HttpStatus.PRECONDITION_FAILED);
            }
        }

        return detailDto;
    }


    @Override
    public boolean isEmailDuplicated(String email) {
        Member member = memberRepository.findByEmail(email);

        if (member != null) {
            return true;
        }
        return false;
    }


}

package ssafy.readed.domain.auth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import ssafy.readed.domain.auth.service.dto.OAuthDetailDto;
import ssafy.readed.domain.auth.service.dto.OAuthLoginResponseDto;
import ssafy.readed.domain.auth.service.dto.SignInResponseDto;
import ssafy.readed.domain.auth.utility.SocialLoginType;
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
                throw new GlobalRuntimeException("알 수 없는 소셜 로그인 형식입니다.",
                        HttpStatus.PRECONDITION_FAILED);
            }
        }

        OAuthDetailDto detailDto = getUserDetail(socialLoginType, access_token);
        boolean isDuplicated = isEmailDuplicated(detailDto.getEmail());

        if (!isDuplicated) {
            responseDto = OAuthLoginResponseDto.builder()
                    .token(null)
                    .detailDto(detailDto)
                    .build();
        } else {
            String jwtToken = jwtTokenProvider.createToken(detailDto.getEmail());
            SignInResponseDto loginToken = SignInResponseDto.builder()
                    .access_token(jwtToken).build();

            responseDto = OAuthLoginResponseDto.builder()
                    .token(loginToken)
                    .detailDto(detailDto)
                    .build();
        }
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

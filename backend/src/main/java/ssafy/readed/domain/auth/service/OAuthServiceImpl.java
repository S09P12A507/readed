package ssafy.readed.domain.auth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import ssafy.readed.domain.auth.service.dto.OAuthDetailDto;
import ssafy.readed.domain.auth.service.dto.OAuthLoginResponseDto;
import ssafy.readed.domain.auth.utility.SocialLoginType;
import ssafy.readed.domain.member.entity.Member;
import ssafy.readed.domain.member.repository.MemberRepository;
import ssafy.readed.global.exception.GlobalRuntimeException;

@Service
@RequiredArgsConstructor
public class OAuthServiceImpl implements OAuthService {

    private final GoogleOAuthProvider googleOAuthProvider;
    private final KakaoOAuthProvider kakaoOAuthProvider;
    private final MemberRepository memberRepository;


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

        boolean isDuplicated = emailDuplicationCheck(detailDto.getEmail());

        if (!isDuplicated) {
            responseDto = OAuthLoginResponseDto.builder()
                    .isNewMember(true)
                    .detailDto(detailDto)
                    .build();
        } else {
            responseDto = OAuthLoginResponseDto.builder()
                    .isNewMember(false)
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
    public boolean emailDuplicationCheck(String email) {
        Member member = memberRepository.findByEmail(email);

        if (member != null) {
            return true;
        }
        return false;
    }


}

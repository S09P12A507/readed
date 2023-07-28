package ssafy.readed.domain.auth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import ssafy.readed.domain.auth.service.dto.OAuthDetailDto;
import ssafy.readed.domain.auth.service.dto.OAuthLoginResponseDto;
import ssafy.readed.domain.auth.utility.SocialLoginType;
import ssafy.readed.domain.member.entity.Member;
import ssafy.readed.domain.member.repository.MemberRepository;
import ssafy.readed.global.exception.GlobalRuntimeException;

@Service
@Repository
@RequiredArgsConstructor
public class OAuthServiceImpl implements OAuthService {

    private final GoogleOAuthProvider googleOAuthProvider;
    private final KakaoOAuthProvider kakaoOAuthProvider;
    MemberRepository memberRepository;

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
                throw new GlobalRuntimeException("알 수 없는 소셜 로그인 형식입니다.",
                        HttpStatus.PRECONDITION_FAILED);
            }
        }

        boolean isDuplicated = emailDuplicationCheck(detailDto.getEmail());
        if (isDuplicated == false) {
            Member member = Member.builder()
                    .email(detailDto.getEmail())
                    .name(detailDto.getName())
                    .nickname("닉네임")
                    .build();
        }

        return detailDto;
    }


    @Override
    public boolean emailDuplicationCheck(String email) {
        Member member = memberRepository.findByEmail(email);

        if (member != null) {
            //로그인
            throw new GlobalRuntimeException("이미 회원가입된 이용자", HttpStatus.CONFLICT);
        }
        return false;
    }


}

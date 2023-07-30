package ssafy.readed.domain.auth.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.readed.domain.auth.controller.dto.OAuthLoginRequestDto;
import ssafy.readed.domain.auth.service.OAuthService;
import ssafy.readed.domain.auth.service.dto.OAuthDetailDto;
import ssafy.readed.domain.auth.service.dto.OAuthLoginResponseDto;
import ssafy.readed.domain.auth.service.dto.SignInResponseDto;
import ssafy.readed.domain.auth.utility.SocialLoginType;
import ssafy.readed.global.response.JsonResponse;
import ssafy.readed.global.security.JwtTokenProvider;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/auth")
@CrossOrigin("*")
public class OAuthController {

    private final OAuthService oauthService;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping(value = "/{socialLoginType}")
    public ResponseEntity<?> socialLogin(
            @PathVariable(name = "socialLoginType") SocialLoginType socialLoginType, @RequestBody
    OAuthLoginRequestDto request) {
        OAuthLoginResponseDto oauthResponseDto;
        OAuthDetailDto detailDto;
        SignInResponseDto responseDto;

        oauthResponseDto = oauthService.login(socialLoginType, request.getCode());
        detailDto= oauthResponseDto.getDetailDto();

        if (oauthResponseDto.isNewMember()){
            return JsonResponse.ok("회원가입을 위해 추가 정보가 필요한 유저입니다.", detailDto);
        }else{
            String login_token= jwtTokenProvider.createToken(detailDto.getEmail());

             responseDto= SignInResponseDto.builder()
                    .access_token(login_token).build();

            return JsonResponse.ok("로그인 성공!", responseDto);
        }
    }
}

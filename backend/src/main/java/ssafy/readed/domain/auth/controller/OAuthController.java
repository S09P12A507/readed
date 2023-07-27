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
import ssafy.readed.domain.auth.service.dto.OAuthLoginResponseDto;
import ssafy.readed.domain.auth.utility.SocialLoginType;
import ssafy.readed.global.response.JsonResponse;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/auth")
@CrossOrigin("*")
public class OAuthController {

    private final OAuthService oauthService;

    @PostMapping(value = "/{socialLoginType}")
    public ResponseEntity<?> socialLogin(
            @PathVariable(name = "socialLoginType") SocialLoginType socialLoginType, @RequestBody
    OAuthLoginRequestDto request) {
        OAuthLoginResponseDto responseDto;

        responseDto = oauthService.login(socialLoginType, request.getCode());

        StringBuilder sb = new StringBuilder();
        sb.append(socialLoginType.toString())
                .append("로그인 성공! ^_^ ");

        return JsonResponse.ok(sb.toString(), responseDto);
    }


}

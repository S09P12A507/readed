package ssafy.readed.domain.auth.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ssafy.readed.domain.auth.controller.dto.CheckEmailRequestDto;
import ssafy.readed.domain.auth.controller.dto.RefreshAccessTokenRequestDto;
import ssafy.readed.domain.auth.controller.dto.SendEmailRequestDto;
import ssafy.readed.domain.auth.controller.dto.SignInRequestDto;
import ssafy.readed.domain.auth.service.AuthService;
import ssafy.readed.global.response.JsonResponse;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
public class AuthController {

    private final AuthService service;

    @PostMapping("/api/auth/sign-in")
    public ResponseEntity<?> defaultSignIn(@RequestBody SignInRequestDto requestDto) {
        return JsonResponse.ok("로그인 성공!", service.defaultSignIn(requestDto));
    }

    @PostMapping("/api/auth/send-email")
    public ResponseEntity<?> sendEmail(@RequestBody SendEmailRequestDto requestDto) {
        service.sendEmail(requestDto);
        return JsonResponse.ok("Email 전송 성공!!");
    }

    @PostMapping("/api/auth/check-email")
    public ResponseEntity<?> checkEmail(@RequestBody CheckEmailRequestDto requestDto) {
        service.checkEmail(requestDto);
        return JsonResponse.ok("Email 체크 성공!!");
    }

    @PostMapping("/api/auth/test")
    public ResponseEntity<?> test(@RequestBody SendEmailRequestDto requestDto) {
        return JsonResponse.ok("권한 테스트 !!");
    }

    @PostMapping("api/auth/refresh")
    public ResponseEntity<?> refresh(@RequestBody RefreshAccessTokenRequestDto requestDto) {
        String accessToken = service.refreshAccessToken(requestDto);
        return JsonResponse.ok("액세스토큰 재발급 완료", accessToken);
    }
}

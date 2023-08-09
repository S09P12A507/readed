package ssafy.readed.domain.auth.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.readed.domain.auth.controller.dto.CheckEmailRequestDto;
import ssafy.readed.domain.auth.controller.dto.RefreshAccessTokenRequestDto;
import ssafy.readed.domain.auth.controller.dto.SendEmailRequestDto;
import ssafy.readed.domain.auth.controller.dto.SignInRequestDto;
import ssafy.readed.domain.auth.service.AuthService;
import ssafy.readed.domain.member.service.MemberService;
import ssafy.readed.global.response.JsonResponse;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService service;

    private final MemberService memberService;

    @PostMapping("/sign-in")
    public ResponseEntity<?> defaultSignIn(@RequestBody SignInRequestDto requestDto) {
        return JsonResponse.ok("로그인 성공!", service.defaultSignIn(requestDto));
    }

    @PostMapping("/send-email")
    public ResponseEntity<?> sendEmail(@RequestBody SendEmailRequestDto requestDto) {
        service.sendEmail(requestDto);
        return JsonResponse.ok("Email 전송 성공!!");
    }

    @PostMapping("/check-email")
    public ResponseEntity<?> checkEmail(@RequestBody CheckEmailRequestDto requestDto) {
        service.checkEmail(requestDto);
        return JsonResponse.ok("Email 체크 성공!!");
    }

    @PostMapping("/test")
    public ResponseEntity<?> test(@RequestBody SendEmailRequestDto requestDto) {
        return JsonResponse.ok("권한 테스트 !!");
    }

    @GetMapping("/check-email-duplicate")
    public ResponseEntity<?> checkEmailDuplicate(String email) {
        memberService.emailDuplicationCheck(email);
        return JsonResponse.ok("중복 체크 완료");
    }

    @GetMapping("/check-nickname-duplicate")
    public ResponseEntity<?> checkNicknameDuplicate(String nickname) {
        memberService.nicknameDuplicationCheck(nickname);
        return JsonResponse.ok("중복 체크 완료");
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestBody RefreshAccessTokenRequestDto requestDto) {
        String accessToken = service.refreshAccessToken(requestDto);
        return JsonResponse.ok("액세스토큰 재발급 완료", accessToken);
    }
}

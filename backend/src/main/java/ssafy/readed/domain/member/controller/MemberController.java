package ssafy.readed.domain.member.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.readed.domain.auth.service.dto.TokenDto;
import ssafy.readed.domain.member.controller.dto.ModifyMemberProfileRequestDto;
import ssafy.readed.domain.member.controller.dto.ModifyPasswordRequestDto;
import ssafy.readed.domain.member.controller.dto.SignUpRequestDto;
import ssafy.readed.domain.member.entity.Member;
import ssafy.readed.domain.member.service.MemberService;
import ssafy.readed.global.response.JsonResponse;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api/members")
@Slf4j
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/sign-up")
    public ResponseEntity<?> signUp(@RequestBody SignUpRequestDto requestDto) {
        memberService.signUp(requestDto);
        return JsonResponse.ok("회원가입 성공!");
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

    @GetMapping("/profile/{member-id}")
    public ResponseEntity<?> selectProfile(@PathVariable("member-id") Long id) {
        return JsonResponse.ok("멤버 프로필 조회 성공!", memberService.selectProfile(id));
    }

    @PatchMapping("/profile/{member-id}")
    public ResponseEntity<?> updateProfile(@PathVariable("member-id") Long id,
            @AuthenticationPrincipal Member member,
            @RequestBody ModifyMemberProfileRequestDto requestDto) {
        memberService.modifyProfile(id, member, requestDto);
        return JsonResponse.ok("멤버 프로필 변경 성공!");
    }

    @GetMapping("/{member-id}")
    public ResponseEntity<?> selectMember(@PathVariable("member-id") Long id) {
        return JsonResponse.ok("멤버 회원정보 조회 성공!", memberService.selectMember(id));
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity<?> updatePassword(@PathVariable("member-id") Long id,
            @AuthenticationPrincipal Member member,
            @RequestBody ModifyPasswordRequestDto requestDto) {
        memberService.modifyPassword(id, member, requestDto);
        return JsonResponse.ok("멤버 회원정보 변경 성공!");
    }

    @DeleteMapping("/logout")
    private ResponseEntity<?> logout(@AuthenticationPrincipal Member member,
            @RequestBody TokenDto tokenDto) {

        memberService.logout(member, tokenDto);
        return JsonResponse.ok("로그아웃이 완료되었습니다.");
    }
}

package ssafy.readed.domain.member.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
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


    @GetMapping("/profile")
    public ResponseEntity<?> selectProfile(Long id) {
        return JsonResponse.ok("멤버 프로필 조회 성공!", memberService.selectProfile(id));
    }

    @PatchMapping("/profile")
    public ResponseEntity<?> updateProfile(@AuthenticationPrincipal Member member,
                                           @RequestBody ModifyMemberProfileRequestDto requestDto) {
        memberService.modifyProfile(member, requestDto);
        return JsonResponse.ok("멤버 프로필 변경 성공!");
    }

    @GetMapping
    public ResponseEntity<?> selectMember(Long id) {
        return JsonResponse.ok("멤버 회원정보 조회 성공!", memberService.selectMember(id));
    }

    @PatchMapping
    public ResponseEntity<?> updatePassword(@AuthenticationPrincipal Member member,
                                            @RequestBody ModifyPasswordRequestDto requestDto) {
        memberService.modifyPassword(member, requestDto);
        return JsonResponse.ok("멤버 회원정보 변경 성공!");
    }

    @DeleteMapping("/logout")
    public ResponseEntity<?> logout(@AuthenticationPrincipal Member member,
                                    @RequestBody TokenDto tokenDto) {

        memberService.logout(member, tokenDto);
        return JsonResponse.ok("로그아웃이 완료되었습니다.");
    }

    @DeleteMapping
    public ResponseEntity<?> deleteMember(@AuthenticationPrincipal Member member,
                                          @RequestBody TokenDto tokenDto) {
        memberService.deleteMember(member, tokenDto);
        return JsonResponse.ok("회원 탈퇴가 완료되었습니다.");
    }
}

package ssafy.readed.domain.member.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ssafy.readed.domain.member.controller.dto.ModifyMemberProfileRequestDto;
import ssafy.readed.domain.member.controller.dto.SignUpRequestDto;
import ssafy.readed.domain.member.service.MemberService;
import ssafy.readed.global.response.JsonResponse;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api/members")
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
    public ResponseEntity<?> modifyProfile(@PathVariable("member-id") Long id,
                                            @RequestBody ModifyMemberProfileRequestDto requestDto) {
        memberService.modifyProfile(id, requestDto);
        return JsonResponse.ok("멤버 프로필 변경 성공!");
    }

    @GetMapping("/{member-id}")
    public ResponseEntity<?> selectMember(@PathVariable("member-id") Long id) {
        return JsonResponse.ok("멤버 회원정보 조회 성공!", memberService.selectMember(id));
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity<?> modifyMember(@PathVariable("member-id") Long id,
                                           @RequestBody ModifyMemberProfileRequestDto requestDto) {
        memberService.modifyProfile(id, requestDto);
        return JsonResponse.ok("멤버 프로필 변경 성공!");
    }
}

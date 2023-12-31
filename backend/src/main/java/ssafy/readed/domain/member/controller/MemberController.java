package ssafy.readed.domain.member.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
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
    public ResponseEntity<?> signUp(@RequestPart SignUpRequestDto requestDto,
            @RequestParam(required = false) MultipartFile image) {
        log.info(requestDto.getEmail());
        memberService.signUp(requestDto, image);
        return JsonResponse.ok("회원가입 성공!");
    }


    @GetMapping("/profile")
    public ResponseEntity<?> selectProfile(Long id, @AuthenticationPrincipal Member member) {
        return JsonResponse.ok("멤버 프로필 조회 성공!", memberService.selectProfile(id, member));
    }

    @PatchMapping("/profile")
    public ResponseEntity<?> updateProfile(@AuthenticationPrincipal Member member,
            @RequestPart ModifyMemberProfileRequestDto requestDto,
            @RequestParam MultipartFile profileImage) {
        memberService.modifyProfile(member, requestDto, profileImage);
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

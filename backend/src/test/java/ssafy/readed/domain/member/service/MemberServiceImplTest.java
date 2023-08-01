package ssafy.readed.domain.member.service;

import javax.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import ssafy.readed.domain.member.controller.dto.ModifyMemberProfileRequestDto;
import ssafy.readed.domain.member.controller.dto.SignUpRequestDto;
import ssafy.readed.domain.member.repository.MemberRepository;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@Transactional
class MemberServiceImplTest {

    @Autowired
    MemberService memberService;
    @Autowired
    MemberRepository memberRepository;
    @Autowired
    PasswordEncoder encoder;

    @Test
    void signUp() {
        SignUpRequestDto requestDto;

        requestDto = SignUpRequestDto.builder()
                .name("김승규")
                .email("kimsg64090@gmail.com")
                .password("testpass1!")
                .password2("testpass1!")
                .nickname("sgkim6")
                .profile_bio("안녕하세요 김승규입니다")
                .profile_image("profile_image")
                .build();

        memberService.signUp(requestDto);
    }

    @Test
    void selectMemberTest() {
        signUp();

        Long id = 1L;
//        SelectMemberResponseDto dto = memberService.selectProfile(id);

//        System.out.println(dto.toString());

    }

    @Test
    void modifyMemberTest() {
        signUp();

        Long id = 1L;
        ModifyMemberProfileRequestDto dto = ModifyMemberProfileRequestDto.builder()
                .nickname("modnick")
                .profile_bio("modbio")
                .profile_image("modimage")
                .build();
        memberService.modifyProfile(1L, dto);
    }

}
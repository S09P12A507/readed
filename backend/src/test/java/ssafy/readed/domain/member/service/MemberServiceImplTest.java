package ssafy.readed.domain.member.service;

import javax.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit.jupiter.SpringExtension;
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
        SignUpRequestDto requestDto, requestDto1;

        requestDto = SignUpRequestDto.builder()
                .name("김승규")
                .email("kimsg64090@gmail.com")
                .password("testpass1!")
                .password2("testpass1!")
                .nickname("sgkim6")
                .profile_bio("안녕하세요 김승규입니다")
                .profile_image("profile_image")
                .build();

        requestDto1 = SignUpRequestDto.builder()
                .name("박소민")
                .email("yygs321@naver.com")
                .password("testpass1!")
                .password2("testpass1!")
                .nickname("somin")
                .profile_bio("안녕하세요 박소민입니다")
                .profile_image("profile_image")
                .build();
        memberService.signUp(requestDto);
        memberService.signUp(requestDto1);
    }

    @Test
    void sendEmail() {
    }

    @Test
    void checkEmail() {
    }

    @Test
    void emailDuplicationCheck() {
    }

    @Test
    void checkValidation() {
    }
}
package ssafy.readed.domain.member.service;

import java.util.regex.Pattern;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ssafy.readed.domain.member.controller.dto.SignUpRequestDto;
import ssafy.readed.domain.member.entity.Member;
import ssafy.readed.domain.member.entity.Password;
import ssafy.readed.domain.member.entity.Provider;
import ssafy.readed.domain.member.repository.MemberRepository;
import ssafy.readed.global.exception.GlobalRuntimeException;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberServiceImpl implements MemberService {


    private final MemberRepository memberRepository;

    private final PasswordEncoder passwordEncoder;

    @Override
    public void signUp(SignUpRequestDto requestDto) {

        checkValidation(requestDto);

        Password password = Password.builder()
                .passwordValue(passwordEncoder.encode(requestDto.getPassword()))
                .build();

        Member member = Member.builder()
                .name(requestDto.getName())
                .email(requestDto.getEmail())
                .provider(Provider.DEFAULT)
                .nickname(requestDto.getNickname())
                .profile_bio(requestDto.getProfile_bio())
                .profile_image(requestDto.getProfile_image())
                .password(password)
                .build();

        memberRepository.save(member);

    }

    @Override
    public void sendEmail(String email) {

    }

    @Override
    public void checkEmail(String email, String code) {

    }

    @Transactional
    public void emailDuplicationCheck(String email) {
        Member member = memberRepository.findByEmail(email);

        if (member != null) {
            throw new GlobalRuntimeException("이미 존재하는 유저입니다.", HttpStatus.BAD_REQUEST);
        }
    }

    public void checkValidation(SignUpRequestDto requestDto) {
        String email = requestDto.getEmail();
        String password1 = requestDto.getPassword();
        String password2 = requestDto.getPassword2();
        String name = requestDto.getName();
        String nickname = requestDto.getNickname();

        checkEmailRegexp(email);
        checkPasswordMatch(password1, password2);
        checkPasswordRegexp(password1);
        checkNameRegexp(name);
        checkNicknameRegexp(nickname);
        emailDuplicationCheck(email);


    }


    private void checkEmailRegexp(String email) {
        if (!Pattern.matches("\\w+@\\w+\\.\\w+(\\.\\w+)?", email)) {
            throw new GlobalRuntimeException("Email 형식이 잘못되었습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    private void checkPasswordRegexp(String password) {
        if (!Pattern.matches("^(?=.*[a-zA-Z])(?=.*\\d)(?=.*\\W).{8,15}$", password)) {
            throw new GlobalRuntimeException("Password 형식이 잘못되었습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    private void checkPasswordMatch(String password, String password2) {
        if (!password.equals(password2)) {
            throw new GlobalRuntimeException("Password 확인이 일치하지 않습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    private void checkNameRegexp(String name) {
        if (!Pattern.matches("^[ㄱ-ㅎ가-힣]{2,8}$", name)) {
            throw new GlobalRuntimeException("이름은 한글로만 입력 가능합니다.", HttpStatus.BAD_REQUEST);
        }
    }

    private void checkNicknameRegexp(String nickname) {
        if (!Pattern.matches("^[ㄱ-ㅎ가-힣a-zA-Z0-9]{2,16}$", nickname)) {
            throw new GlobalRuntimeException("닉네임은 한글 또는 영어 또는 숫자의 2~16자리로 구성되어야 합니다.",
                    HttpStatus.BAD_REQUEST);
        }
    }
}

package ssafy.readed.domain.auth.service;

import java.time.LocalDateTime;
import java.util.UUID;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ssafy.readed.domain.auth.controller.dto.CheckEmailRequestDto;
import ssafy.readed.domain.auth.controller.dto.SendEmailRequestDto;
import ssafy.readed.domain.auth.controller.dto.SignInRequestDto;
import ssafy.readed.domain.auth.entity.MailHistory;
import ssafy.readed.domain.auth.repository.MailHistoryRepository;
import ssafy.readed.domain.member.entity.Member;
import ssafy.readed.domain.member.repository.MemberRepository;
import ssafy.readed.global.exception.GlobalRuntimeException;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {

    private final EmailSender emailSender;

    private final MailHistoryRepository mailHistoryRepository;

    private final MemberRepository memberRepository;

    private final PasswordEncoder encoder;

    @Override
    @Transactional
    public void sendEmail(SendEmailRequestDto requestDto) {
        String email = requestDto.getEmail();
        String code = generateAuthCode();
        log.info(code);
        log.info(email);
        MailHistory history = MailHistory.defaultMailHistory(email, code);
        mailHistoryRepository.save(history);
        emailSender.sendEmail(code, email);
    }

    @Override
    @Transactional
    public void checkEmail(CheckEmailRequestDto requestDto) {
        String email = requestDto.getEmail();
        String code = requestDto.getCode();

        MailHistory mailHistory = mailHistoryRepository.findTop1ByEmailAndIsAuthedOrderByIdDesc(
                email, false);

        if (mailHistory == null) {
            throw new GlobalRuntimeException("메일 인증 요청 내역이 없습니다.", HttpStatus.NOT_FOUND);
        }

        if (!mailHistory.checkAuthCode(code)) {
            throw new GlobalRuntimeException("인증 코드가 다릅니다.", HttpStatus.CONFLICT);
        }

        if (mailHistory.isOverTimeLimit(LocalDateTime.now())) {
            throw new GlobalRuntimeException("인증 시간이 만료되었습니다.", HttpStatus.CONFLICT);
        }


    }

    @Override
    public ResponseEntity<?> defaultSignIn(SignInRequestDto requestDto) {

        Member member = memberRepository.findByEmail(requestDto.getEmail());

        String password = member.getPassword().getPasswordValue();

        if (member == null) {
            throw new GlobalRuntimeException("가입되지 않은 Email 입니다.", HttpStatus.NOT_FOUND);
        }

        if (!password.equals(encoder.encode(requestDto.getPassword()))) {
            throw new GlobalRuntimeException("비밀번호가 틀립니다.", HttpStatus.NOT_FOUND);
        }

        return null; //미구현
    }

    private String generateAuthCode() {
        return UUID.randomUUID().toString();
    }
}

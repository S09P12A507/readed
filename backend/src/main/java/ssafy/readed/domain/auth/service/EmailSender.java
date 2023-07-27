package ssafy.readed.domain.auth.service;

import javax.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class EmailSender {

    private final JavaMailSender javaMailSender;

    public EmailSender(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    void sendEmail(String code, String email) {

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, false,
                    "UTF-8");
            log.info("이메일 : " + email);
            mimeMessageHelper.setFrom("kimsg64090@gmail.com");
            mimeMessageHelper.setTo(email);
            mimeMessageHelper.setSubject("[Readed]회원가입 인증 코드입니다.");
            mimeMessageHelper.setText("인증 코드 : " + code);
            javaMailSender.send(mimeMessage);
        } catch (Exception e) {
            log.warn("이메일 전송 실패");
            e.printStackTrace();
        }
    }
}

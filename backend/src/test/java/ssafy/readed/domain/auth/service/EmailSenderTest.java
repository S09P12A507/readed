package ssafy.readed.domain.auth.service;

import javax.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@SpringBootTest
@ExtendWith(SpringExtension.class)
@Transactional
class EmailSenderTest {

    @Autowired
    EmailSender emailSender;

    @Test
    void sendEmail() {
        emailSender.sendEmail("asd", "yygs321@naver.com");
    }
}
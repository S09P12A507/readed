package ssafy.readed.domain.auth.service;

import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ssafy.readed.domain.auth.controller.dto.CheckEmailRequestDto;
import ssafy.readed.domain.auth.controller.dto.SendEmailRequestDto;
import ssafy.readed.domain.auth.entity.MailHistory;
import ssafy.readed.domain.auth.repository.MailHistoryRepository;

@Service
@Slf4j
public class AuthServiceImpl implements AuthService {

    @Autowired
    private EmailSender emailSender;

    @Autowired
    private MailHistoryRepository mailHistoryRepository;

    @Override
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
    public void checkEmail(CheckEmailRequestDto requestDto) {

    }

    private String generateAuthCode() {
        return UUID.randomUUID().toString();
    }
}

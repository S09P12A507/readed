package ssafy.readed.domain.auth.service;

import org.springframework.http.ResponseEntity;
import ssafy.readed.domain.auth.controller.dto.CheckEmailRequestDto;
import ssafy.readed.domain.auth.controller.dto.SendEmailRequestDto;
import ssafy.readed.domain.auth.controller.dto.SignInRequestDto;

public interface AuthService {

    void sendEmail(SendEmailRequestDto requestDto);

    void checkEmail(CheckEmailRequestDto requestDto);

    ResponseEntity<?> defaultSignIn(SignInRequestDto requestDto);
}

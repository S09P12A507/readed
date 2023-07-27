package ssafy.readed.domain.auth.service;

import ssafy.readed.domain.auth.controller.dto.CheckEmailRequestDto;
import ssafy.readed.domain.auth.controller.dto.SendEmailRequestDto;

public interface AuthService {

    void sendEmail(SendEmailRequestDto requestDto);

    void checkEmail(CheckEmailRequestDto requestDto);
}

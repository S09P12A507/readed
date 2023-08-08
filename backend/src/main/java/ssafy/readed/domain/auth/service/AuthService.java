package ssafy.readed.domain.auth.service;

import ssafy.readed.domain.auth.controller.dto.CheckEmailRequestDto;
import ssafy.readed.domain.auth.controller.dto.RefreshAccessTokenRequestDto;
import ssafy.readed.domain.auth.controller.dto.SendEmailRequestDto;
import ssafy.readed.domain.auth.controller.dto.SignInRequestDto;
import ssafy.readed.domain.auth.service.dto.TokenDto;

public interface AuthService {

    void sendEmail(SendEmailRequestDto requestDto);

    void checkEmail(CheckEmailRequestDto requestDto);

    TokenDto defaultSignIn(SignInRequestDto requestDto);

    String refreshAccessToken(RefreshAccessTokenRequestDto requestDto);
}

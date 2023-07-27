package ssafy.readed.domain.member.service;

import ssafy.readed.domain.member.controller.dto.SignUpRequestDto;

public interface MemberService {

    void signUp(SignUpRequestDto requestDto);

    void sendEmail(String email);

    void checkEmail(String email, String code);
}

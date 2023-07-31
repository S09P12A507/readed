package ssafy.readed.domain.member.service;

import ssafy.readed.domain.member.controller.dto.MemberProfileModifyRequestDto;
import ssafy.readed.domain.member.controller.dto.SignUpRequestDto;
import ssafy.readed.domain.member.service.dto.SelectMemberResponseDto;

public interface MemberService {

    void signUp(SignUpRequestDto requestDto);

    SelectMemberResponseDto selectProfile(Long id);

    void modifyProfile(Long id, MemberProfileModifyRequestDto requestDto);
}

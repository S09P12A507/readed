package ssafy.readed.domain.member.service;

import ssafy.readed.domain.member.controller.dto.ModifyMemberProfileRequestDto;
import ssafy.readed.domain.member.controller.dto.SignUpRequestDto;
import ssafy.readed.domain.member.service.dto.SelectMemberResponseDto;
import ssafy.readed.domain.member.service.dto.SelectProfileResponseDto;

public interface MemberService {

    void signUp(SignUpRequestDto requestDto);

    SelectProfileResponseDto selectProfile(Long id);

    void modifyProfile(Long id, ModifyMemberProfileRequestDto requestDto);

    SelectMemberResponseDto selectMember(Long id);

    void emailDuplicationCheck(String email);
}

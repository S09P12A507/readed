package ssafy.readed.domain.member.service;

import ssafy.readed.domain.auth.service.dto.TokenDto;
import ssafy.readed.domain.member.controller.dto.ModifyMemberProfileRequestDto;
import ssafy.readed.domain.member.controller.dto.ModifyPasswordRequestDto;
import ssafy.readed.domain.member.controller.dto.SignUpRequestDto;
import ssafy.readed.domain.member.entity.Member;
import ssafy.readed.domain.member.service.dto.SelectMemberResponseDto;
import ssafy.readed.domain.member.service.dto.SelectProfileResponseDto;

public interface MemberService {

    void signUp(SignUpRequestDto requestDto);

    SelectProfileResponseDto selectProfile(Long id);

    void modifyProfile(Long id, Member member, ModifyMemberProfileRequestDto profileRequestDto);

    SelectMemberResponseDto selectMember(Long id);

    void emailDuplicationCheck(String email);

    void nicknameDuplicationCheck(String nickname);

    void modifyPassword(Long id, Member member, ModifyPasswordRequestDto passwordRequestDto);

    void deleteMember(Long id, Member member);

    void logout(Member member, TokenDto tokenDto);
}

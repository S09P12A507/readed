package ssafy.readed.domain.member.service;

import org.springframework.web.multipart.MultipartFile;
import ssafy.readed.domain.auth.service.dto.TokenDto;
import ssafy.readed.domain.member.controller.dto.ModifyMemberProfileRequestDto;
import ssafy.readed.domain.member.controller.dto.ModifyPasswordRequestDto;
import ssafy.readed.domain.member.controller.dto.SignUpRequestDto;
import ssafy.readed.domain.member.entity.Member;
import ssafy.readed.domain.member.service.dto.SelectMemberResponseDto;
import ssafy.readed.domain.member.service.dto.SelectProfileResponseDto;

public interface MemberService {

    void signUp(SignUpRequestDto requestDto, MultipartFile image);

    SelectProfileResponseDto selectProfile(Long id, Member member);

    Member getMember(Long id);

    void modifyProfile(Member member, ModifyMemberProfileRequestDto profileRequestDto,
            MultipartFile profileImage);

    SelectMemberResponseDto selectMember(Long id);

    void emailDuplicationCheck(String email);

    void nicknameDuplicationCheck(String nickname);

    void modifyPassword(Member member, ModifyPasswordRequestDto passwordRequestDto);

    void deleteMember(Member member, TokenDto tokenDto);

    void logout(Member member, TokenDto tokenDto);
}

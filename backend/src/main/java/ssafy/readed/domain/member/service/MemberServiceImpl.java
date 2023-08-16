package ssafy.readed.domain.member.service;

import java.io.IOException;
import java.util.regex.Pattern;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ssafy.readed.domain.auth.repository.RefreshTokenRepository;
import ssafy.readed.domain.auth.service.dto.TokenDto;
import ssafy.readed.domain.member.controller.dto.ModifyMemberProfileRequestDto;
import ssafy.readed.domain.member.controller.dto.ModifyPasswordRequestDto;
import ssafy.readed.domain.member.controller.dto.SignUpRequestDto;
import ssafy.readed.domain.member.entity.Member;
import ssafy.readed.domain.member.entity.Password;
import ssafy.readed.domain.member.entity.Provider;
import ssafy.readed.domain.member.repository.MemberRepository;
import ssafy.readed.domain.member.service.dto.SelectMemberResponseDto;
import ssafy.readed.domain.member.service.dto.SelectProfileResponseDto;
import ssafy.readed.global.config.RedisUtil;
import ssafy.readed.global.exception.GlobalRuntimeException;
import ssafy.readed.global.security.JwtTokenProvider;
import ssafy.readed.global.service.S3FileService;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberServiceImpl implements MemberService {


    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final RedisUtil redisUtil;
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final S3FileService s3FileService;

    private final String path = "image/member/profile/";

    @Override
    @Transactional
    public void signUp(SignUpRequestDto requestDto, MultipartFile image) {

        checkValidation(requestDto);

        Password password = Password.builder()
                .passwordValue(passwordEncoder.encode(requestDto.getPassword()))
                .build();

        Member member = Member.builder()
                .name(requestDto.getName())
                .email(requestDto.getEmail())
                .provider(Provider.valueOf(requestDto.getSocialLoginType()))
                .nickname(requestDto.getNickname())
                .profileBio(requestDto.getProfileBio())
                .password(password)
                .build();

        try {
            saveNewProfileFile(member, image);
        } catch (IOException e) {
            throw new GlobalRuntimeException("프로필 사진 저장 실패", HttpStatus.CONFLICT);
        }

        memberRepository.save(member);
    }

    @Override
    @Transactional
    public SelectProfileResponseDto selectProfile(Long id, Member member) {
        Member findMember = (id == null) ? getMember(member.getId()) : getMember(id);

        String url = s3FileService.getS3Url(findMember.getMemberProfileFile());
        return SelectProfileResponseDto.from(findMember, url);
    }

    @Override
    @Transactional
    public Member getMember(Long id) {
        return memberRepository.findById(id).orElseThrow(
                () -> new GlobalRuntimeException("해당 ID의 유저가 없습니다", HttpStatus.BAD_REQUEST));
    }


    @Override
    @Transactional
    public void modifyProfile(Member member, ModifyMemberProfileRequestDto requestDto) {
        checkNicknameRegexp(requestDto.getNickname());

        Member modifiedMember = getMember(member.getId());

        try {
            saveNewProfileFile(modifiedMember, requestDto.getProfileImage());
        } catch (IOException e) {
            e.printStackTrace();
            throw new GlobalRuntimeException("프로필 사진 저장 실패", HttpStatus.CONFLICT);
        }

        modifiedMember.modify(requestDto);
    }

    @Override
    @Transactional
    public SelectMemberResponseDto selectMember(Long id) {
        Member member = getMember(id);

        return SelectMemberResponseDto.from(member);
    }

    @Override
    @Transactional
    public void modifyPassword(Member member,
            ModifyPasswordRequestDto passwordRequestDto) {

        Member modifiedMember = getMember(member.getId());

        checkPrevPassword(passwordRequestDto, modifiedMember);
        checkPasswordMatch(passwordRequestDto.getPassword(), passwordRequestDto.getPassword2());
        checkPasswordRegexp(passwordRequestDto.getPassword());

        modifiedMember.modifyPW(
                new Password(passwordEncoder.encode(passwordRequestDto.getPassword())));
    }

    @Override
    @Transactional
    public void deleteMember(Member member, TokenDto tokenDto) {
        Member findMember = getMember(member.getId());
        logout(findMember, tokenDto);
        findMember.delete();
    }

    @Override
    @Transactional
    public void emailDuplicationCheck(String email) {
        Member member = memberRepository.findByEmail(email);

        if (member != null) {
            throw new GlobalRuntimeException("이미 존재하는 이메일입니다.", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    @Transactional
    public void nicknameDuplicationCheck(String nickname) {
        Member member = memberRepository.findByNickname(nickname);

        if (member != null) {
            throw new GlobalRuntimeException("이미 존재하는 닉네임입니다.", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    @Transactional
    public void logout(Member member, TokenDto tokenDto) {
        Long expirationTime = jwtTokenProvider.getExpirationTime(tokenDto.getAccessToken());
        refreshTokenRepository.deleteByEmail(member.getEmail());
        redisUtil.setBlackList(tokenDto.getAccessToken(), "accessToken", expirationTime);
    }

    @Override
    public void saveNewProfileFile(Member member, MultipartFile multipartFile) throws IOException {
        String savedFilename = s3FileService.saveFile(path, multipartFile);
        member.saveNewProfileFile(path, multipartFile.getOriginalFilename(), savedFilename);
    }

    public void checkValidation(SignUpRequestDto requestDto) {
        String email = requestDto.getEmail();
        String password1 = requestDto.getPassword();
        String password2 = requestDto.getPassword2();
        //String name = requestDto.getName();
        String nickname = requestDto.getNickname();

        checkEmailRegexp(email);
        checkPasswordMatch(password1, password2);
        checkPasswordRegexp(password1);
        //checkNameRegexp(name);
        checkNicknameRegexp(nickname);
        emailDuplicationCheck(email);
    }

    private void checkPrevPassword(ModifyPasswordRequestDto passwordRequestDto,
            Member modifiedMember) {
        if (!passwordEncoder.matches(passwordRequestDto.getPrevPassword(),
                modifiedMember.getPassword().getPasswordValue())) {
            throw new GlobalRuntimeException("비밀번호가 틀립니다.", HttpStatus.BAD_REQUEST);
        }
    }

    private void checkEmailRegexp(String email) {
        if (!Pattern.matches("\\w+@\\w+\\.\\w+(\\.\\w+)?", email)) {
            throw new GlobalRuntimeException("Email 형식이 잘못되었습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    private void checkPasswordRegexp(String password) {
        if (!Pattern.matches("^(?=.*[a-zA-Z])(?=.*\\d)(?=.*\\W).{8,15}$", password)) {
            throw new GlobalRuntimeException("Password 형식이 잘못되었습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    private void checkPasswordMatch(String password, String password2) {
        if (!password.equals(password2)) {
            throw new GlobalRuntimeException("Password 확인이 일치하지 않습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    private void checkNameRegexp(String name) {
        if (!Pattern.matches("^[ㄱ-ㅎ가-힣]{2,8}$", name)) {
            throw new GlobalRuntimeException("이름은 한글로만 입력 가능합니다.", HttpStatus.BAD_REQUEST);
        }
    }

    private void checkNicknameRegexp(String nickname) {
        if (!Pattern.matches("^[ㄱ-ㅎ가-힣a-zA-Z0-9]{2,16}$", nickname)) {
            throw new GlobalRuntimeException("닉네임은 한글 또는 영어 또는 숫자의 2~16자리로 구성되어야 합니다.",
                    HttpStatus.BAD_REQUEST);
        }
    }

}

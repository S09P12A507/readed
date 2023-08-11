import { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import axios from 'axios';
import styled from 'styled-components';
import Alerts from '../../components/common/alert/Alert';
import basic from '../../assets/img/non.png';

const ImageContainer = styled.div`
  text-align: center;
  max-width: 500px;
  max-height: 200px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImg = styled.img`
  max-width: 500px;
  max-height: 200px;
  display: table-cell;
  vertical-align: middle;
`;

const IntroduceForm = styled(TextField)`
  width: 100%;
`;

const AuthButton = styled(Button)`
  width: 20%;
  height: 56px;
`;

const SignupButton = styled(Button)`
  height: 50px;
`;

const NowContainer = styled.div`
  width: 18px;
  height: 18px;
  background-color: #4b8346;
  font-family: 'Pretendard';
  font-style: normal;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 14px;
  font-weight: bold;
`;

const IconContainer = styled.div`
  width: 18px;
  height: 18px;
  background-color: gray;
  font-family: 'Pretendard';
  font-style: normal;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 14px;
  font-weight: bold;
`;

const Announce = styled.div`
  display: flex;
  justify-content: center;
`;

const AnnounceText = styled.div`
  display: flex;
  font-size: 12px;
  margin: 0;
`;

const NowText = styled.div`
  display: flex;
  margin: 0;
  font-weight: bold;
  font-size: 12px;
`;

interface SignUpData {
  MemberName: string;
  email: string;
  password1: string;
  password2: string;
}

function Addprofile() {
  const storedData = sessionStorage.getItem('signupData');
  const signUpData: SignUpData = storedData
    ? (JSON.parse(storedData) as SignUpData)
    : {
        MemberName: '',
        email: '',
        password1: '',
        password2: '',
      };
  const [MemberName] = useState<string>(signUpData.MemberName || '');
  const [email] = useState<string>(signUpData.email || '');
  const [password1] = useState<string>(signUpData.password1 || '');
  const [password2] = useState<string>(signUpData.password2 || '');

  const [ProfileImage, setprofileimage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string>('');
  const [ProfileBio, setprofilebio] = useState<string>('');
  const [nicknameExists, setNicknameExists] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setprofileimage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
    setNicknameExists(false);
  };

  const handleIntroChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setprofilebio(event.target.value);
  };

  const handleVerify = () => {
    axios
      .get(
        `https://i9a507.p.ssafy.io/api/auth/check-nickname-duplicate?nickname=${nickname}`,
      )
      .then(response => {
        if (response.status >= 200 && response.status <= 299) {
          setNicknameExists(true);
          setMessage('중복 확인되었습니다.');
          setShowAlert(true);
          console.log(response);
        } else {
          setNicknameExists(false);
          console.log('인증 실패');
        }
      })
      .catch(error => {
        console.error('중복 확인 실패:', error);
      });
  };

  const handleSignUp = () => {
    if (!nicknameExists) {
      setMessage('중복 여부를 체크해주세요.');
      setShowAlert(true);
      return;
    }
    const InfoData = {
      name: MemberName,
      email,
      password: password1,
      password2,
      nickname,
      profileBio: ProfileBio,
    };

    const InfoDataJson = JSON.stringify(InfoData);
    const formData = new FormData();
    formData.append(
      'requestDto',
      new Blob([InfoDataJson], { type: 'application/json' }),
    );
    if (ProfileImage) {
      formData.append('image', ProfileImage);
    }
    console.log(InfoData);

    axios
      .post('https://i9a507.p.ssafy.io/api/members/sign-up', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        setMessage('회원 가입에 성공했습니다.');
        setShowAlert(true);
      })
      .catch(error => {
        console.error('회원가입 실패:', error);
      });

    if (message === '회원 가입에 성공했습니다.') {
      sessionStorage.removeItem('signupData');
      window.location.href = '/genre';
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };
  return (
    <>
      <h1>거의 다 왔어요</h1>
      <h3>
        {MemberName} 님에 대해 <br /> 더 알려주세요!
      </h3>

      <br />
      <Announce>
        <IconContainer>1</IconContainer>&nbsp;
        <AnnounceText> 기본 정보 입력 &nbsp;─&nbsp;</AnnounceText>
        <IconContainer>2</IconContainer>&nbsp;
        <AnnounceText> 이메일 인증 &nbsp;─&nbsp;</AnnounceText>
        <NowContainer>3</NowContainer>&nbsp;
        <NowText> 프로필 입력</NowText>
      </Announce>
      <br />
      <br />

      <p>* 프로필 사진(선택)</p>
      <ImageContainer>
        <label htmlFor="fileInput">
          {previewUrl ? (
            <ProfileImg src={previewUrl} alt="프로필 미리보기" />
          ) : (
            <ProfileImg src={basic} alt="기본 이미지" />
          )}
        </label>
        <input
          type="file"
          id="fileInput"
          multiple
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </ImageContainer>

      <p>* 닉네임 입력(필수)</p>
      <Grid container alignItems="center">
        <Grid item xs={9.7}>
          <IntroduceForm
            label="다른사람에게 보일 이름이에요"
            variant="outlined"
            value={nickname}
            onChange={handleNicknameChange}
            margin="dense"
            InputProps={{
              style: {
                backgroundColor: '#f5f5f5',
              },
            }}
          />
        </Grid>
        <Grid item xs={1}>
          <AuthButton
            variant="contained"
            color="primary"
            onClick={handleVerify}
            style={{ marginLeft: '10px', background: 'var(--primary-dark)' }}>
            중복 확인
          </AuthButton>
        </Grid>
      </Grid>

      <div>
        <p>* 한 줄 소개(선택)</p>
        <IntroduceForm
          label="책에 관한 당신의 이야기를 들려주세요."
          variant="outlined"
          value={ProfileBio}
          onChange={handleIntroChange}
          margin="dense"
          multiline
          rows={4}
          InputProps={{
            style: {
              backgroundColor: '#f5f5f5',
            },
          }}
        />
      </div>

      <SignupButton
        variant="contained"
        color="primary"
        onClick={handleSignUp}
        style={{
          position: 'absolute',
          maxWidth: 'var(--screen-size-mobile)',
          width: '100%',
          left: '0',
          bottom: '0',
          background: 'var(--primary-dark)',
          color: 'white',
        }}>
        회원가입
      </SignupButton>
      <Alerts
        open={showAlert}
        onClose={handleAlertClose}
        // onClose={() => setShowAlert(false)}
        message={message}
      />
    </>
  );
}

export default Addprofile;

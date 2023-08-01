import { useState, useEffect } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import axios from 'axios';
import styled from 'styled-components';

<<<<<<< HEAD
const WebContainer = styled.div<{ isWebApp: boolean }>`
=======
interface WebContainerProps {
  isWebApp: boolean;
}

const WebContainer = styled.div<WebContainerProps>`
>>>>>>> 28325b4dad2f71261d3c587dab4e565843d0bc7d
  width: ${props => (props.isWebApp ? '' : '600px')};
  justify-content: ${props => (props.isWebApp ? '' : 'center')};
  align-items: ${props => (props.isWebApp ? '' : 'center')};
  border: ${props => (props.isWebApp ? '' : '1px solid black')};
  flex-direction: ${props => (props.isWebApp ? '' : 'column')};
  justify-content: ${props => (props.isWebApp ? '' : 'space-between')};
  min-height: 99vh;
  position: ${props => (props.isWebApp ? '' : 'absolute')};
  top: ${props => (props.isWebApp ? '' : '50%')};
  left: ${props => (props.isWebApp ? '' : '50%')};
  transform: ${props => (props.isWebApp ? '' : 'translate(-50%, -50%)')};
`;

const Container = styled.div`
  justify-content: center;
  align-content: center;
  position: flex;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: scroll;
  height: 100vh;
`;

const ImageContainer = styled.div`
  text-align: center;
  max-width: 500px;
  max-height: 200px;
  overflow: hidden;
`;

const ProfileImg = styled.img`
  max-width: 300px;
  margin: 0 auto;
  object-fit: cover;
`;

const AuthForm = styled(TextField)`
  width: 100%;
`;

const IntroduceForm = styled(TextField)`
  width: 100%;
`;

const AuthButton = styled(Button)`
  width: 20%;
  height: 56px;
`;

const SignupButton = styled(Button)`
  width: 100%;
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
  const [isWebApp, setIsWebApp] = useState(false);
  const storedData = localStorage.getItem('signupData');
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

  useEffect(() => {
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    setIsWebApp(mediaQuery.matches);

    const handleMediaChange = (event: MediaQueryListEvent) => {
      setIsWebApp(event.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

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
    setNicknameExists(true);
    alert('중복확인 성공');
    // axios
    // 	.get(`http://local:8080/user?nickname=${nickname}`)
    // 	.then(response => {
    // 		const exists = response.data.exists;
    // 		setNicknameExists(exists);
    // 	})
    // 	.catch(error => {
    // 		console.error('중복 확인 실패:', error);
    // 	});
  };

  const handleSignUp = () => {
    if (!nicknameExists) {
      // 중복 확인을 하지 않은 경우 알람을 띄우기
      alert('중복 여부를 체크해주세요');
      return;
    }
    const formData = {
      member_name: MemberName,
      email,
      password1,
      password2,
      nickname,
      profile_bio: ProfileBio,
      profile_image: ProfileImage,
    };
    console.log(formData);
    window.location.href = '/genre';
    // 테스트 용으로 여기에 삽입 > 이후에 axios로 true 여부 체크

    axios
      .post('http://local:8080/signup', formData)
      .then(response => {
        console.log('회원가입 성공:', response.data);
      })
      .catch(error => {
        console.error('회원가입 실패:', error);
      });
  };

  return (
    <WebContainer isWebApp={isWebApp}>
      <Container>
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
              <ProfileImg src="/assets/non.jpg" alt="기본 이미지" />
            )}
          </label>
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </ImageContainer>

        <p>* 닉네임 입력(필수)</p>
        <Grid container alignItems="center">
          <Grid item xs={10.2}>
            <AuthForm
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
              style={{ marginLeft: '10px', background: '#4B8346' }}>
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
            position: 'fixed',
            bottom: 0,
            left: 0,
            marginTop: '300px',
            width: '100%',
            background: '#4B8346',
          }}>
          회원가입
        </SignupButton>
      </Container>
    </WebContainer>
  );
}

export default Addprofile;

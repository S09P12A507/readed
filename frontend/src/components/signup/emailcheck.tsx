import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton, TextField, Button, Grid } from '@mui/material';
import styled from 'styled-components';
import axios from 'axios';

const AuthForm = styled(TextField)`
  width: 100%;
`;

const AuthButton = styled(Button)`
  width: 20%;
  height: 56px;
`;

const SignupButton = styled(Button)`
  width: 100%;
  display: flex;
  bottom: 0;
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
  email: string;
}

interface BackButtonProps {
  onGoBack: () => void;
}

function BackButton({ onGoBack }: BackButtonProps) {
  return (
    <div style={{ marginTop: '10px', marginLeft: '5px' }}>
      <Link to="/signup">
        <IconButton
          aria-label="back"
          onClick={onGoBack}
          style={{ color: 'gray', fontSize: '14px' }}>
          <ArrowBackIcon /> 돌아가기
        </IconButton>
      </Link>
    </div>
  );
}

function Emailcheck() {
  const storedData = localStorage.getItem('signupData');
  const signUpData: SignUpData = storedData
    ? (JSON.parse(storedData) as SignUpData)
    : {
        email: '',
      };
  const [email] = useState<string>(signUpData.email || '');
  const [code, setCode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  const handleVerificationCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCode(event.target.value);
  };

  const handleVerify = () => {
    axios
      .post('http://localhost:8080/api/auth/check-email', {
        email,
        code,
      })
      .then(response => {
        if (response.status >= 200 && response.status <= 299) {
          setIsAuthenticated(true);
          console.log('인증 성공');
        } else {
          setIsAuthenticated(false);
          console.log('인증 실패');
        }
      })
      .catch(error => {
        console.error('인증 요청 실패', error);
        // 인증 번호를 다시 확인해주세요 경고
      });

    //   const isVerified = true; // 임의로 인증이 그냥 된다고 가정
    //   if (isVerified) {
    //     setIsAuthenticated(true);
    //     console.log('인증 성공');
    //   } else {
    //     setIsAuthenticated(false);
    //     console.log('인증 실패');
    //   }
  };

  const handleSignUp = () => {
    if (isAuthenticated) {
      navigate('/signup/addprofile');
    } else {
      // 이메일 인증을 해주세요 경고
    }
  };

  const handleGoBack = () => {
    console.log('뒤로');
  };

  const handleSubmit = () => {
    axios
      .post('http://localhost:8080/api/auth/send-email', { email })
      .then(response => {
        console.log('이메일이 성공적으로 보내졌습니다.');

        console.log(response);
      })
      .catch(error => {
        console.error('이메일 전송에 실패했습니다.', error);
      });
  };

  const handleResend = () => {
    handleSubmit();
  };

  return (
    <>
      <BackButton onGoBack={handleGoBack} />
      <h1>이메일 인증</h1>
      <h3>
        {email}으로
        <br /> 전송한 인증코드를 확인해주세요.
        <br />
        <br />
        <Announce>
          <IconContainer>1</IconContainer>&nbsp;
          <AnnounceText> 기본 정보 입력 &nbsp;─&nbsp;</AnnounceText>
          <NowContainer>2</NowContainer>&nbsp;
          <NowText> 이메일 인증 &nbsp;─&nbsp;</NowText>
          <IconContainer>3</IconContainer>&nbsp;
          <AnnounceText> 프로필 입력</AnnounceText>
        </Announce>
        <br />
      </h3>
      <Grid container alignItems="center">
        <Grid item xs={10.5}>
          <AuthForm
            label="*인증코드 입력"
            variant="outlined"
            value={code}
            onChange={handleVerificationCodeChange}
            margin="dense"
            InputProps={{
              style: {
                backgroundColor: '#f5f5f5',
                display: 'flex',
                justifyContent: 'space-between',
              },
              endAdornment: (
                <Button
                  style={{
                    backgroundColor: 'transparent',
                    color: 'gray',
                  }}
                  onClick={handleResend}>
                  재전송
                </Button>
              ),
            }}
          />
        </Grid>
        <Grid item xs={1}>
          <AuthButton
            variant="contained"
            onClick={handleVerify}
            style={{ marginLeft: '10px', background: '#4B8346' }}
            disabled={isAuthenticated}>
            인증
          </AuthButton>
        </Grid>
      </Grid>
      <SignupButton
        variant="contained"
        onClick={handleSignUp}
        style={{
          bottom: 0,
          left: 0,
          width: '100%',
          background: '#4B8346',
        }}
        disabled={!isAuthenticated}>
        다읍단계로
      </SignupButton>
    </>
  );
}

export default Emailcheck;

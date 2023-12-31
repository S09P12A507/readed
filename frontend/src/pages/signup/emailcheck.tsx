import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Grid } from '@mui/material';
import styled from 'styled-components';
import axios from 'axios';
import Alerts from '../../components/common/alert/Alert';
import BackButton from '../../components/common/button/BackButton';

const Container = styled.section`
  padding: 0 var(--padding-global);
`;

const AuthForm = styled(TextField)`
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
  email: string;
}

function Emailcheck() {
  const storedData = sessionStorage.getItem('signupData');
  const signUpData: SignUpData = storedData
    ? (JSON.parse(storedData) as SignUpData)
    : {
        email: '',
      };
  const [email] = useState<string>(signUpData.email || '');
  const [code, setCode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleVerificationCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCode(event.target.value);
  };

  const handleVerify = () => {
    axios
      .post('https://i9a507.p.ssafy.io/api/auth/check-email', {
        email,
        code,
      })
      .then(response => {
        if (response.status >= 200 && response.status <= 299) {
          setIsAuthenticated(true);
          setMessage('인증되었습니다..');
          setShowAlert(true);
        } else {
          setIsAuthenticated(false);
          setMessage('인증 번호를 다시 확인해주세요.');
          setShowAlert(true);
        }
      })
      .catch(() => {
        setMessage('인증 번호를 다시 확인해주세요.');
        setShowAlert(true);
      });
  };

  const handleSignUp = () => {
    if (isAuthenticated) {
      navigate('/signup/addprofile');
    } else {
      setMessage('이메일 인증을 해주세요.');
      setShowAlert(true);
    }
  };

  const handleSubmit = () => {
    axios
      .post('https://i9a507.p.ssafy.io/api/auth/send-email', { email })
      .then(() => {
        setMessage('이메일이 전송됐습니다.');
        setShowAlert(true);
      })
      .catch(() => {
        setMessage('이메일 전송에 실패됐습니다.');
        setShowAlert(true);
      });
  };

  const handleResend = () => {
    handleSubmit();
  };

  return (
    <Container>
      <BackButton />
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
            style={{ marginLeft: '10px', background: 'var(--primary-dark)' }}
            disabled={isAuthenticated}>
            인증
          </AuthButton>
        </Grid>
      </Grid>
      <SignupButton
        variant="contained"
        onClick={handleSignUp}
        style={{
          position: 'absolute',
          maxWidth: 'var(--screen-size-mobile)',
          width: '100%',
          left: '0',
          bottom: '0',
          background: 'var(--primary-dark)',
          color: 'white',
        }}
        disabled={!isAuthenticated}>
        다음단계로
      </SignupButton>

      <Alerts
        open={showAlert}
        onClose={() => setShowAlert(false)}
        message={message}
      />
    </Container>
  );
}

export default Emailcheck;

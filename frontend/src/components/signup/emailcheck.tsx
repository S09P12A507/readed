import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton, TextField, Button, Grid } from '@mui/material';
import styled from 'styled-components';
// import axios from 'axios';

const Container = styled.div`
  border: black 1px solid;
  padding: 40px;
  max-width: 500px;
  max-height: 800px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% - 80px);
  box-sizing: border-box;
`;

const AuthForm = styled(TextField)`
  width: 330px;
`;

const AuthButton = styled(Button)`
  width: 20%;
  height: 56px;
`;

const SignupButton = styled(Button)`
  width: 100%;
  height: 50px;
`;

interface SignUpData {
  email: string;
}

function Emailcheck() {
  const storedData = localStorage.getItem('signupData');
  const signUpData: SignUpData = storedData
    ? (JSON.parse(storedData) as SignUpData)
    : {
        email: '',
      };
  const [email] = useState<string>(signUpData.email || '');

  const navigate = useNavigate();

  const [code, setCode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleVerificationCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCode(event.target.value);
  };

  const handleVerify = () => {
    // axios
    //   .post('http://localhost:8080/api/auth/check-email', {
    //     email,
    //     code,
    //   })
    //   .then(response => {
    //     if (response.status >= 200 && response.status <= 299) {
    //       setIsAuthenticated(true);
    //       console.log('인증 성공');
    //     } else {
    //       setIsAuthenticated(false);
    //       console.log('인증 실패');
    //     }
    //   })
    //   .catch(error => {
    //     console.error('인증 요청 실패', error);
    //   });

    const isVerified = true; // 임의로 인증이 그냥 된다고 가정
    if (isVerified) {
      setIsAuthenticated(true);
      console.log('인증 성공');
    } else {
      setIsAuthenticated(false);
      console.log('인증 실패');
    }
  };

  const handleSignUp = () => {
    if (isAuthenticated) {
      navigate('/signup/addprofile');
    } else {
      alert('이메일 인증을 해주세요.');
    }
  };

  return (
    <Container>
      <Link to="/signup">
        <IconButton
          color="primary"
          aria-label="back"
          style={{ fontSize: '14px' }}>
          <ArrowBackIcon /> 이전으로
        </IconButton>
      </Link>
      <h1>이메일 인증</h1>
      <h3>
        {email}으로
        <br /> 전송한 인증코드를 확인해주세요.
      </h3>
      <Grid container alignItems="center">
        <Grid item xs={9.5}>
          <AuthForm
            label="*인증코드 입력"
            variant="outlined"
            value={code}
            onChange={handleVerificationCodeChange}
            margin="dense"
            InputProps={{
              style: {
                backgroundColor: '#f5f5f5',
              },
            }}
          />
        </Grid>
        <Grid item xs={2.5}>
          <AuthButton
            variant="contained"
            color="primary"
            onClick={handleVerify}
            style={{ marginLeft: '10px', background: '#606C5D' }}
            disabled={isAuthenticated}>
            인증
          </AuthButton>
        </Grid>
      </Grid>
      <SignupButton
        variant="contained"
        color="primary"
        onClick={handleSignUp}
        style={{ marginTop: '300px', background: '#606C5D' }}
        disabled={!isAuthenticated}>
        회원가입
      </SignupButton>
    </Container>
  );
}

export default Emailcheck;

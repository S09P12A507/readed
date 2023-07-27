import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton, TextField, Button, Grid } from '@mui/material';
// import axios from 'axios';
import './emailcheck.css';

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

  // const location = useLocation();
  const navigate = useNavigate();

  const [verificationCode, setVerificationCode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleVerificationCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setVerificationCode(event.target.value);
  };

  const handleVerify = () => {
    // axios
    // 	.post('http://localhost:8080/Emailcheck', { verificationCode })
    // 	.then(response => {
    // 		const isVerified = response.data.isVerified;

    // 		if (isVerified) {
    // 			setIsAuthenticated(true);
    // 			console.log('인증 성공');
    // 		} else {
    // 			setIsAuthenticated(false);
    // 			console.log('인증 실패');
    // 		}
    // 	})
    // 	.catch(error => {
    // 		console.error('인증 요청 실패', error);
    // 	});

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
    <div className="container">
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
          <TextField
            className="authform"
            label="*인증코드 입력"
            variant="outlined"
            value={verificationCode}
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleVerify}
            className="auth-button"
            style={{ marginLeft: '10px', background: '#606C5D' }}
            disabled={isAuthenticated}>
            인증
          </Button>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSignUp}
        className="button-auth"
        style={{ marginTop: '300px', background: '#606C5D' }}
        disabled={!isAuthenticated}>
        회원가입
      </Button>
    </div>
  );
}

export default Emailcheck;

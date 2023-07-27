import React, { useState, useEffect } from 'react';
import { IconButton, TextField, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './signup.css';

type FormData = {
  MemberName: string;
  email: string;
  password1: string;
  password2: string;
};

interface BackButtonProps {
  onGoBack: () => void;
}

const isEmailValid = (email: string) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

function BackButton({ onGoBack }: BackButtonProps) {
  return (
    <div>
      <Link to="/">
        <IconButton
          color="primary"
          aria-label="back"
          onClick={onGoBack}
          style={{ fontSize: '14px' }}>
          <ArrowBackIcon /> 돌아가기
        </IconButton>
      </Link>
    </div>
  );
}

function Signup() {
  const [MemberName, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [isWebApp, setIsWebApp] = useState(false);

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

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = event.target.value;
    setEmail(emailValue);

    if (!isEmailValid(emailValue)) {
      setInvalidEmail(true);
    } else {
      setInvalidEmail(false);
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handlePassword2Change = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPassword2(event.target.value);
  };

  const handleSubmit = () => {
    const formData: FormData = {
      MemberName,
      email,
      password1,
      password2,
    };
    // onSubmit(formData);
    console.log(MemberName);
    console.log(email);
    console.log(password1);
    console.log(password2);
    localStorage.setItem('signupData', JSON.stringify(formData));

    axios
      .post('http://localhost:8080/email', { email })
      .then(response => {
        console.log('이메일이 성공적으로 보내졌습니다.');
        console.log(response);
      })
      .catch(error => {
        console.error('이메일 전송에 실패했습니다.', error);
      });
  };

  const handleGoBack = () => {
    console.log('뒤로');
  };

  return (
    <div className="container-line">
      <BackButton onGoBack={handleGoBack} />
      <h1>회원가입</h1>
      <h3>리디드에 오신 것을 환영합니다.</h3>

      <div>
        <TextField
          className="signupform"
          label="*이름"
          variant="outlined"
          value={MemberName}
          onChange={handleNameChange}
          margin="dense"
          helperText="이름을 입력해주세요"
          inputProps={{
            style: {
              backgroundColor: '#f5f5f5',
            },
          }}
        />
      </div>

      <div>
        <TextField
          className="signupform"
          label="*이메일"
          variant="outlined"
          value={email}
          onChange={handleEmailChange}
          margin="dense"
          InputProps={{
            style: {
              backgroundColor: '#f5f5f5',
            },
            endAdornment: isEmailValid(email) && (
              <CheckIcon style={{ color: 'green' }} />
            ),
          }}
          helperText={(() => {
            if (invalidEmail) {
              return '유효한 이메일을 입력해주세요';
            }
            if (isEmailValid(email)) {
              return ' ';
            }
            return '이메일을 입력해주세요';
          })()}
          error={invalidEmail}
        />
      </div>

      <div>
        <TextField
          className="signupform"
          label="*비밀번호"
          type="password"
          variant="outlined"
          value={password1}
          onChange={handlePasswordChange}
          margin="dense"
          helperText="숫자, 특수문자를 조합한 8자리 이상으로 작성해주세요"
          inputProps={{
            style: {
              backgroundColor: '#f5f5f5',
            },
          }}
        />
      </div>

      <div>
        <TextField
          className="signupform"
          label="*비밀번호 확인"
          type="password"
          variant="outlined"
          value={password2}
          onChange={handlePassword2Change}
          margin="dense"
          helperText="동일한 비밀번호를 입력해주세요"
          inputProps={{
            style: {
              backgroundColor: '#f5f5f5',
            },
          }}
        />
      </div>

      {isWebApp ? (
        <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%' }}>
          <Link to="emailcheck">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              style={{ width: '100%' }}>
              이메일 인증하기
            </Button>
          </Link>
        </div>
      ) : (
        <div>
          <Link to="emailcheck">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              className="form-button-container">
              이메일 인증하기
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Signup;

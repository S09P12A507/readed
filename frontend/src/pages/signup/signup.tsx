import { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios';
import styled from 'styled-components';
import Alerts from '../../components/common/alert/Alert';
import BackButton from '../../components/common/button/BackButton';

const FormButtonContainer = styled(Button)`
  height: 50px;
`;

const SignupForm = styled(TextField)`
  width: 100%;
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

type FormData = {
  MemberName: string;
  email: string;
  password1: string;
  password2: string;
};

const CheckButton = styled(Button)`
  width: 20%;
  height: 56px;
`;

const isEmailValid = (email: string) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

function isPasswordValid(password: string): boolean {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*\W).{8,15}$/;
  return passwordRegex.test(password);
}

const isNameValid = (name: string) => {
  const nameRegex = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2,}$/;
  return nameRegex.test(name);
};

function Signup() {
  const [MemberName, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidPassword2, setInvalidPassword2] = useState(false);
  const [InvalidName, setInvalidName] = useState(false);
  const [emailExists, setEmailExists] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nameValue = event.target.value;
    setName(nameValue);
    if (!isNameValid(nameValue)) {
      setInvalidName(true);
    } else {
      setInvalidName(false);
    }
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
    const newPassword = event.target.value;
    setPassword(newPassword);

    if (!isPasswordValid(newPassword)) {
      setInvalidPassword(true);
    } else {
      setInvalidPassword(false);
    }
  };

  const handlePassword2Change = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newPassword2 = event.target.value;
    setPassword2(newPassword2);

    if (password1 !== newPassword2) {
      setInvalidPassword2(true);
    } else {
      setInvalidPassword2(false);
    }
  };

  const handleSubmit = () => {
    if (!emailExists) {
      setMessage('이메일 중복 확인을 해주세요.');
      setShowAlert(true);
      return;
    }
    if (
      isNameValid(MemberName) &&
      isEmailValid(email) &&
      isPasswordValid(password1) &&
      password1 === password2
    ) {
      const formData: FormData = {
        MemberName,
        email,
        password1,
        password2,
      };
      sessionStorage.setItem('signupData', JSON.stringify(formData));

      axios
        .post('https://i9a507.p.ssafy.io/api/auth/send-email', { email })
        .then(response => {
          console.log('이메일이 성공적으로 보내졌습니다.');
          window.location.href = '/signup/emailcheck';
          console.log(response);
        })
        .catch(error => {
          console.error('이메일 전송에 실패했습니다.', error);
        });
    } else {
      setMessage('유효하지 않은 입력이 있습니다.');
      setShowAlert(true);
    }
  };

  const handleVerify = () => {
    axios
      .get(
        `https://i9a507.p.ssafy.io/api/auth/check-email-duplicate?email=${email}`,
      )
      .then(response => {
        if (response.status >= 200 && response.status <= 299) {
          setEmailExists(true);
          setMessage('중복 확인되었습니다.');
          setShowAlert(true);
        } else {
          setEmailExists(false);
          setMessage('이미 존재하는 이메일입니다.');
          setShowAlert(true);
        }
      })
      .catch(error => {
        console.error('중복 확인 실패:', error);
      });
  };

  return (
    <>
      <BackButton />
      <h1>회원가입</h1>
      <h3>리디드에 오신 것을 환영합니다.</h3>
      <br />
      <br />
      <Announce>
        <NowContainer>1</NowContainer>&nbsp;
        <NowText> 기본 정보 입력 &nbsp;─&nbsp;</NowText>
        <IconContainer>2</IconContainer>&nbsp;
        <AnnounceText> 이메일 인증 &nbsp;─&nbsp;</AnnounceText>
        <IconContainer>3</IconContainer>&nbsp;
        <AnnounceText> 프로필 입력</AnnounceText>
      </Announce>
      <br />
      <br />

      <SignupForm
        label="*이름"
        variant="outlined"
        value={MemberName}
        onChange={handleNameChange}
        margin="dense"
        helperText={(() => {
          if (InvalidName) {
            return '유효한 이름을 입력해주세요';
          }
          if (isNameValid(MemberName)) {
            return '사용가능한 이름입니다.';
          }
          return '2글자 이상의 한글 이름을 입력해주세요.';
        })()}
        InputProps={{
          style: {
            backgroundColor: '#f5f5f5',
          },
          endAdornment: isNameValid(MemberName) && (
            <CheckIcon style={{ color: 'var(--primary-dark)' }} />
          ),
        }}
        error={InvalidName}
      />
      <Grid container alignItems="center">
        <Grid item xs={9.7}>
          <SignupForm
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
                <CheckIcon style={{ color: 'var(--primary-dark)' }} />
              ),
            }}
            helperText={(() => {
              if (invalidEmail) {
                return '유효한 이메일을 입력해주세요';
              }
              if (isEmailValid(email)) {
                return '사용 가능한 이메일입니다';
              }
              return '이메일을 입력해주세요';
            })()}
            error={invalidEmail}
          />
        </Grid>
        <Grid item xs={1}>
          <CheckButton
            variant="contained"
            color="primary"
            onClick={handleVerify}
            style={{
              marginLeft: '10px',
              marginBottom: '18px',
              background: 'var(--primary-dark)',
            }}>
            중복 확인
          </CheckButton>
        </Grid>
      </Grid>

      <SignupForm
        label="*비밀번호"
        type="password"
        variant="outlined"
        value={password1}
        onChange={handlePasswordChange}
        margin="dense"
        helperText={(() => {
          if (invalidPassword) {
            if (password1.length < 8) {
              return '비밀번호가 너무 짧습니다.';
            }
            if (password1.length > 15) {
              return '비밀번호가 너무 깁니다.';
            }
            return '숫자, 특수문자를 조합한 8~15자리로 작성해주세요';
          }
          if (isPasswordValid(password1)) {
            return '사용 가능한 비밀번호입니다';
          }
          return '알파벳, 숫자, 특수문자를 조합한 8~15자리로 작성해주세요';
        })()}
        InputProps={{
          style: {
            backgroundColor: '#f5f5f5',
          },
          endAdornment: isPasswordValid(password1) && (
            <CheckIcon style={{ color: 'var(--primary-dark)' }} />
          ),
        }}
        error={invalidPassword}
      />
      <SignupForm
        label="*비밀번호 확인"
        type="password"
        variant="outlined"
        value={password2}
        onChange={handlePassword2Change}
        margin="dense"
        helperText={(() => {
          if (invalidPassword2) {
            return '비밀번호가 일치하지 않습니다';
          }
          if (password2 && !invalidPassword2) {
            return '비밀번호가 일치합니다.';
          }
          return '동일한 비밀번호를 입력해주세요';
        })()}
        InputProps={{
          style: {
            backgroundColor: '#f5f5f5',
          },
          endAdornment: !invalidPassword2 && password2.length > 1 && (
            <CheckIcon style={{ color: 'var(--primary-dark)' }} />
          ),
        }}
        error={invalidPassword2}
      />

      <FormButtonContainer
        variant="contained"
        style={{
          position: 'absolute',
          maxWidth: 'var(--screen-size-mobile)',
          width: '100%',
          left: '0',
          bottom: '0',
          background: 'var(--primary-dark)',
          color: 'white',
        }}
        onClick={handleSubmit}
        disabled={!emailExists}>
        이메일 인증하기
      </FormButtonContainer>
      <Alerts
        open={showAlert}
        onClose={() => setShowAlert(false)}
        message={message}
      />
    </>
  );
}

export default Signup;

import { useState } from 'react';
import styled from 'styled-components';
import { TextField, Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const SignupForm = styled(TextField)`
  width: 100%;
`;

function isPasswordValid(password: string): boolean {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*\W).{8,15}$/;
  return passwordRegex.test(password);
}

function PwChange() {
  const [password, setPassword] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidPassword2, setInvalidPassword2] = useState(false);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nowPassword = event.target.value;
    setPassword(nowPassword);
  };

  const handlePassword1Change = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newPassword = event.target.value;
    setPassword1(newPassword);

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

  return (
    <div>
      <h3>새로 사용할 비밀번호를 입력해주세요</h3>
      <br />
      <SignupForm
        label="기존비밀번호"
        type="password"
        variant="outlined"
        value={password}
        onChange={handlePasswordChange}
        margin="dense"
        helperText="기존 비밀번호를 입력해주세요."
        InputProps={{
          style: {
            backgroundColor: '#f5f5f5',
          },
        }}
      />
      <SignupForm
        label="*비밀번호"
        type="password"
        variant="outlined"
        value={password1}
        onChange={handlePassword1Change}
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
            <CheckIcon style={{ color: 'green' }} />
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
            <CheckIcon style={{ color: 'green' }} />
          ),
        }}
        error={invalidPassword2}
      />
      <Button
        variant="contained"
        style={{
          maxWidth: 'var(--screen-size-mobile)',
          width: '100%',
          height: '3.5rem',
          background: 'var(--primary-dark)',
          color: 'white',
        }}>
        {' '}
        확인{' '}
      </Button>
    </div>
  );
}

export default PwChange;

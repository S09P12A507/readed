import { useState } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Link, IconButton, Typography, TextField, Button } from '@mui/material';
import { setTokens } from '../../store/actions/authActions';
import kakaologo from '../../assets/img/kakaologo.png';
import AlertsModal from '../../components/common/alert/Alert';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: space-around;
  height: 100%; */
  padding: 0 var(--padding-global);
`;

const LoginBox = styled(TextField)`
  width: 100%;
  height: 1.5rem;
  margin: 2rem auto;
`;

const LoginButton = styled(Button)`
  /* width: 290px;
  height: 40px; */
  height: 3rem;
  background: #7aa874;
  border-color: white;
  color: white;
`;

const CenterText = styled.h3`
  text-align: center;
`;

const LoginUtilsWrapper = styled.div`
  /* width: 100%; */
  display: flex;
  margin: 1rem auto 3rem auto;
`;

const CircleContainerWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const CircleContainer = styled.div`
  text-align: center;
  margin: 0 1rem;
`;

const GoogleCircle = styled(IconButton)`
  width: 3rem;
  height: 3rem;
  /* background-color: white; */
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 30px;
  border: 1px solid gray;
  background-image: url('https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg');
  background-size: cover;
`;

const KakaoCircle = styled(IconButton)`
  width: 3rem;
  height: 3rem;
  /* background-color: white; */
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  margin-right: 10px;
  border: 1px solid gray;
  background-image: url(${kakaologo});
  background-size: cover;
`;

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  // const [remember, setRememberStatus] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const KakaoRestApi = 'e1496c3a1b0232c4d6f84d511cf90255';
  const KakaoRedirect = 'https://i9a507.p.ssafy.io/oauth/kakao/callback';
  const GoogleclientId =
    '59438726779-mukgldfttu2qm0oikt8jeirkra7bliji.apps.googleusercontent.com';
  const GoogleredirectUri = 'https://i9a507.p.ssafy.io/oauth/google/callback';

  const handleLogin = (url: string) => {
    window.location.href = url;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post<{ data: Tokens }>('https://i9a507.p.ssafy.io/api/auth/sign-in', {
        email: username,
        password,
      })
      .then(response => {
        const receivedToken: Tokens = response.data.data;
        if (receivedToken) {
          const AToken = receivedToken.accessToken;
          const RToken = receivedToken.refreshToken;
          if (AToken && RToken) {
            dispatch(setTokens(AToken, RToken));
          }
        }
        window.location.href = '/';
      })
      .catch(() => {
        setMessage('아이디와 비밀번호를 확인해주세요.');
        setShowAlert(true);
      });
  };
  return (
    <Container>
      <Typography
        variant="h1"
        color="var(--primary-main)"
        fontSize="3rem"
        margin="2rem auto 4rem auto">
        readed
      </Typography>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexFlow: 'column',
          justifyContent: 'space-between',
          textAlign: 'center',
          width: '80%',
          height: '11rem',
        }}>
        <LoginBox
          type="text"
          id="username"
          value={username}
          label="이메일"
          variant="filled"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
          required
        />
        <LoginBox
          type="password"
          id="password"
          value={password}
          label="비밀번호"
          variant="filled"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          required
        />
        {/* <div>
          <input
            type="checkbox"
            id="remember"
            checked={remember}
            style={{ textAlign: 'left' }}
            onChange={e => setRememberStatus(e.target.checked)}
          />
          로그인 유지
        </div> */}

        <LoginButton
          type="submit"
          variant="contained"
          sx={{ fontSize: '1rem' }}>
          로그인
        </LoginButton>
      </form>
      <LoginUtilsWrapper>
        <Link href="/login" underline="hover" color="var(--text-secondary)">
          아이디 찾기
        </Link>
        <Typography margin="0 1rem" color="var(--text-secondary)">
          |
        </Typography>
        <Link href="/login" underline="hover" color="var(--text-secondary)">
          비밀번호 찾기
        </Link>
        <Typography margin="0 1rem" color="var(--text-secondary)">
          |
        </Typography>
        <Link href="/signup" underline="hover" color="var(--primary-dark)">
          회원가입
        </Link>
      </LoginUtilsWrapper>
      <div>
        <CenterText>간편 로그인</CenterText>
        <br />
        <CircleContainerWrapper>
          <CircleContainer>
            <GoogleCircle
              onClick={() =>
                handleLogin(
                  `https://accounts.google.com/o/oauth2/auth?client_id=${GoogleclientId}&redirect_uri=${GoogleredirectUri}&response_type=code&scope=openid%20email%20profile`,
                )
              }>
              {/* <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google Logo"
                style={{ width: '30px', height: '30px' }}
              /> */}
            </GoogleCircle>
            <Typography
              textAlign="center"
              color="var(--text-secondary)"
              fontSize="0.875rem"
              marginTop="0.5rem">
              구글 계정으로
              <br />
              로그인
            </Typography>
          </CircleContainer>
          <CircleContainer>
            <KakaoCircle
              onClick={() =>
                handleLogin(
                  `https://kauth.kakao.com/oauth/authorize?client_id=${KakaoRestApi}&redirect_uri=${KakaoRedirect}&response_type=code`,
                )
              }>
              {/* <img
                src={kakaologo}
                alt="Kakao Logo"
                style={{ width: '30px', height: '30px' }}
              /> */}
            </KakaoCircle>
            <Typography
              textAlign="center"
              color="var(--text-secondary)"
              fontSize="0.875rem"
              marginTop="0.5rem">
              카카오 계정으로
              <br />
              로그인
            </Typography>
          </CircleContainer>
        </CircleContainerWrapper>
      </div>
      <AlertsModal
        open={showAlert}
        onClose={() => setShowAlert(false)}
        message={message}
      />
    </Container>
  );
}

export default Login;

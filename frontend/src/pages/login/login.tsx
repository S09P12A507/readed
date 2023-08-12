import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setTokens } from '../../store/actions/authActions';
import kakaologo from '../../assets/img/kakaologo.png';
import AlertsModal from '../../components/common/alert/Alert';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 var(--padding-global);
`;

const LoginBox = styled.input`
  width: 280px;
  height: 40px;
  margin-bottom: 10px;
`;

const CircleContainer = styled.div`
  display: flex;
`;

const GoogleCircle = styled.button`
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 30px;
  border: 1px solid gray;
`;

const KakaoCircle = styled.button`
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  margin-right: 10px;
  border: 1px solid gray;
`;

const LoginButton = styled.button`
  width: 290px;
  height: 40px;
  margin-top: 10px;
  background: #7aa874;
  border-color: white;
  color: white;
`;

const CenterText = styled.h3`
  text-align: center;
`;

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [remember, setRememberStatus] = useState<boolean>(false);
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
      <h1>리디드</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <LoginBox
            type="text"
            id="username"
            value={username}
            placeholder="이메일"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            required
          />
        </div>
        <div>
          <LoginBox
            type="password"
            id="password"
            value={password}
            placeholder="비밀번호"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            required
          />
          <div>
            <input
              type="checkbox"
              id="remember"
              checked={remember}
              onChange={e => setRememberStatus(e.target.checked)}
            />
            로그인 유지
          </div>
          <div>
            <LoginButton type="submit">로그인</LoginButton>
          </div>
        </div>
      </form>
      <br />
      <p>
        <a href="htpp://local:8080"> 아이디 찾기</a> |
        <a href="htpp://local:8080"> 비밀번호 찾기</a> |
        <Link to="/signup"> 회원가입</Link>
      </p>
      <br />
      <div>
        <CenterText>간편 로그인</CenterText>
        <br />
        <CircleContainer>
          <div>
            <GoogleCircle
              type="button"
              onClick={() =>
                handleLogin(
                  `https://accounts.google.com/o/oauth2/auth?client_id=${GoogleclientId}&redirect_uri=${GoogleredirectUri}&response_type=code&scope=openid%20email%20profile`,
                )
              }>
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google Logo"
                style={{ width: '30px', height: '30px' }}
              />
            </GoogleCircle>
            <p style={{ marginLeft: '9px' }}>구글</p>
          </div>
          <div>
            <KakaoCircle
              type="button"
              onClick={() =>
                handleLogin(
                  `https://kauth.kakao.com/oauth/authorize?client_id=${KakaoRestApi}&redirect_uri=${KakaoRedirect}&response_type=code`,
                )
              }>
              <img
                src={kakaologo}
                alt="Kakao Logo"
                style={{ width: '30px', height: '30px' }}
              />
            </KakaoCircle>
            <p style={{ marginLeft: '2px' }}>카카오</p>
          </div>
        </CircleContainer>
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

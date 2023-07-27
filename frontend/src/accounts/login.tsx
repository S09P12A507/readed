import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import kakaologo from './assets/kakaologo.png';
import './login.css';

function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [remember, setRememberStatus] = useState<boolean>(false);
  const KakaoRestApi = 'e1496c3a1b0232c4d6f84d511cf90255';
  const KakaoRedirect = 'http://localhost:3000/oauth/kakao/callback';
  const GoogleclientId =
    '59438726779-mukgldfttu2qm0oikt8jeirkra7bliji.apps.googleusercontent.com';
  const GoogleredirectUri = 'http://localhost:3000/oauth/google/callback';

  const handleLogin = (url: string) => {
    window.location.href = url;
  };

  useEffect(() => {
    const handleCallback = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const authorizationCode = urlParams.get('code');
      console.log('인가 코드:', authorizationCode);
      if (authorizationCode) {
        let apiUrl = '';
        if (window.location.href.includes('oauth/kakao')) {
          apiUrl = 'http://localhost:8080/api/auth/kakao';
        } else if (window.location.href.includes('oauth/google')) {
          apiUrl = 'http://localhost:8080/api/auth/google';
        }

        axios
          .post(apiUrl, {
            code: authorizationCode,
          })
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
      }
    };

    if (window.location.search.includes('code=')) {
      handleCallback();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'user' && password === 'pass') {
      console.log('로그인 성공');
    } else {
      console.log('로그인 실패');
    }
  };

  return (
    <div className="container">
      <h1>리디드</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            className="loginbox"
            type="text"
            id="username"
            value={username}
            placeholder="이메일"
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            className="loginbox"
            type="password"
            id="password"
            value={password}
            placeholder="비밀번호"
            onChange={e => setPassword(e.target.value)}
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
            <button type="submit" className="login-button">
              로그인
            </button>
          </div>
        </div>
      </form>
      <p>
        <a href="htpp://local:8080"> 아이디 찾기</a> |
        <a href="htpp://local:8080"> 비밀번호 찾기</a> |
        <Link to="/signup">회원가입</Link>
      </p>

      <div>
        <h3 className="center">간편 로그인</h3>
        <div className="circle-container">
          <div>
            <button
              type="button"
              className="googlecircle"
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
            </button>
            <p style={{ marginLeft: '9px' }}>구글</p>
          </div>
          <div>
            <button
              type="button"
              className="kakaocircle"
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
            </button>
            <p style={{ marginLeft: '2px' }}>카카오</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setTokens } from '../../store/actions/authActions';

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

interface User {
  name: string;
  email: string;
  socialLoginType: string;
}

function GoogleLogin() {
  const dispatch = useDispatch();
  useEffect(() => {
    const handleCallback = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const authorizationCode = urlParams.get('code');
      if (authorizationCode) {
        const apiUrl = 'https://i9a507.p.ssafy.io/api/auth/google';

        axios
          .post(apiUrl, {
            code: authorizationCode,
          })
          .then(response => {
            const receivedToken = (response.data as { data: Tokens }).data;

            if (receivedToken) {
              const AToken = receivedToken.accessToken;
              const RToken = receivedToken.refreshToken;

              if (AToken && RToken) {
                dispatch(setTokens(AToken, RToken));
              }
              window.location.href = '/';
            } else {
              const userdata = (response.data as { data: User }).data;
              sessionStorage.setItem('signupData', JSON.stringify(userdata));
              window.location.href = '/signup/addprofile';
            }
          })
          .catch(() => {});
      }
    };

    if (window.location.search.includes('code=')) {
      handleCallback();
    }
  }, [dispatch]);
  return (
    <>
      <span>구글페이지</span>
      <span>...</span>
    </>
  );
}

export default GoogleLogin;

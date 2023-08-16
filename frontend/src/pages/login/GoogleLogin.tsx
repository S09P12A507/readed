// import styled from 'styled-components';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setTokens } from '../../store/actions/authActions';

interface Tokens {
  accessToken: string;
  refreshToken: string;
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
          .post<{ data: Tokens }>(apiUrl, {
            code: authorizationCode,
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
            console.log(response);
            // window.location.href = '/signup/addprofile';
          })
          .catch(() => {
            // window.location.href = '/';
          });
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

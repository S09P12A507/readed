// import styled from 'styled-components';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setTokens } from '../../store/actions/authActions';

interface Tokens {
  AccessToken: string;
  RepreshToken: string;
}

function KaKaoLogin() {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleCallback = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const authorizationCode = urlParams.get('code');
      console.log('인가 코드:', authorizationCode);
      if (authorizationCode) {
        const apiUrl = 'http://localhost:8081/api/auth/kakao';

        axios
          .post(apiUrl, {
            code: authorizationCode,
          })
          .then(response => {
            const receivedToken = (response.data as { data: Tokens[] }).data;
            if (receivedToken.length > 0) {
              const AToken = receivedToken[0].AccessToken;
              const RToken = receivedToken[0].RepreshToken;
              if (AToken && RToken) {
                dispatch(setTokens(AToken, RToken));
              }
            }
            window.location.href = '/';
          })
          .catch(error => {
            console.log(error);
          });
      }
    };

    if (window.location.search.includes('code=')) {
      handleCallback();
    }
  }, [dispatch]);
  return (
    <>
      <span>카카오페이지</span>
      <span>...</span>
    </>
  );
}

export default KaKaoLogin;

// import styled from 'styled-components';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setToken } from '../../store/actions/authActions';
// 기본적인 구조입니다.

function KaKaoLogin() {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleCallback = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const authorizationCode = urlParams.get('code');
      console.log('인가 코드:', authorizationCode);
      if (authorizationCode) {
        const apiUrl = 'http://localhost:8080/api/auth/kakao';

        axios
          .post(apiUrl, {
            code: authorizationCode,
          })
          .then(response => {
            const token = response.data as string;
            dispatch(setToken(token));
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
  }, [dispatch]);
  return (
    <>
      <span>카카오페이지</span>
      <span>...</span>
    </>
  );
}

export default KaKaoLogin;

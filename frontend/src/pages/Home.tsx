import React from 'react';
// import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
// import { RootState } from '../store/store';

function Home() {
  // const token = useSelector((state: RootState) => state.auth.token);

  // const isAuthenticated = !!token; // 토큰이 존재하면 true, 없으면 false가 됩니다.

  // if (!isAuthenticated) {
  //   alert('로그인해주세요');
  //   window.location.href = '/login';
  //   return null;
  // }

  return (
    <>
      <span>홈임</span>
      <Button color="primary">ㅇㅇ</Button>
    </>
  );
}

export default Home;

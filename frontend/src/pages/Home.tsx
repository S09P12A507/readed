import React from 'react';
// import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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
      <br />
      <Link to="/login">불편하다고 하셔서 만든 로그인으로 가는 링크</Link>
    </>
  );
}

export default Home;

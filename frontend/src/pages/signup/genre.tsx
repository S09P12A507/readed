import { useState } from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import axios from 'axios';
import GenreButton from '../../components/common/button/GenreButton';

const Container = styled.section`
  padding: 0 var(--padding-global);
`;

const Title = styled.div`
  padding-top: 10%;
  font-size: 2.3rem;
  font-weight: bold;
`;

const SubTitle = styled.div`
  padding-top: 10%;
  font-size: 1.5rem;
  font-weight: bold;
`;

const Info = styled.div`
  padding-top: 5%;
  font-size: 0.8rem;
  color: gray;
`;

const Start = styled(Button)`
  height: 50px;
`;

const GenreButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

interface NameData {
  MemberName: string;
}

function Genre() {
  const storedData = localStorage.getItem('signupData');
  const signUpData: NameData = storedData
    ? (JSON.parse(storedData) as NameData)
    : {
        MemberName: '',
      };
  const [MemberName] = useState<string>(signUpData.MemberName || '');

  const handleSignUp = () => {
    window.location.href = '/';
  };

  return (
    <Container>
      <Title>회원 가입 완료!</Title>
      <SubTitle>
        {MemberName} 님이 <br /> 재미있게 읽은 책들을 알려주세요!
      </SubTitle>
      <Info>· 어떤 장르의 책이었나요? </Info>
      <br />
      <GenreButtonContainer>
        <GenreButton genres={0} content="종교" />
        <GenreButton genres={1} content="과학" />
        <GenreButton genres={2} content="자기계발" />
        <GenreButton genres={3} content="역사" />
        <GenreButton genres={4} content="경제" />
        <GenreButton genres={5} content="만화" />
        <GenreButton genres={6} content="추리소설" />
        <GenreButton genres={7} content="판타지" />
        <GenreButton genres={8} content="문학" />
        <GenreButton genres={9} content="에세이" />
      </GenreButtonContainer>
      <Start
        variant="contained"
        onClick={handleSignUp}
        style={{
          position: 'absolute',
          maxWidth: 'var(--screen-size-mobile)',
          width: '100%',
          left: '0',
          bottom: '0',
          background: 'var(--primary-dark)',
          color: 'white',
        }}
        endIcon={<ArrowForwardIosIcon />}>
        바로 시작하기
      </Start>
    </Container>
  );
}

export default Genre;

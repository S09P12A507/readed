import { useState } from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
  width: 100%;
  height: 50px;
`;

const GenreButtonContainer = styled.div`
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
`;
const Genrebutton = styled(Button)`
  display: flex;
  /* width: 150px; */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
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

  const navigate = useNavigate();

  const handleGenreClick = (genre: string) => {
    navigate(`/genre/${genre}`);
  };

  return (
    <>
      <Title>회원 가입 완료!</Title>
      <SubTitle>
        {MemberName} 님이 <br /> 재미있게 읽은 책들을 알려주세요!
      </SubTitle>
      <Info>· 어떤 장르의 책이었나요? </Info>
      <br />
      <GenreButtonContainer>
        <Genrebutton
          onClick={() => handleGenreClick('mystery')}
          endIcon={<ArrowForwardIosIcon />}
          style={{
            backgroundColor: '#F7DB6A',
            borderRadius: '100px',
            color: 'black',
            margin: '10px',
            fontWeight: 'bold',
            paddingLeft: '4%',
            paddingRight: '4%',
          }}>
          추리/미스테리
        </Genrebutton>
        <Genrebutton
          onClick={() => handleGenreClick('romance')}
          endIcon={<ArrowForwardIosIcon />}
          style={{
            backgroundColor: '#F7DB6A',
            borderRadius: '100px',
            color: 'black',
            margin: '10px',
            fontWeight: 'bold',
            paddingLeft: '4%',
            paddingRight: '4%',
          }}>
          일상/로맨스
        </Genrebutton>
        <Genrebutton
          onClick={() => handleGenreClick('poem')}
          endIcon={<ArrowForwardIosIcon />}
          style={{
            backgroundColor: '#F7DB6A',
            borderRadius: '100px',
            color: 'black',
            margin: '10px',
            fontWeight: 'bold',
            paddingLeft: '4%',
            paddingRight: '4%',
          }}>
          에세이/시
        </Genrebutton>
        <Genrebutton
          onClick={() => handleGenreClick('develop')}
          endIcon={<ArrowForwardIosIcon />}
          style={{
            backgroundColor: '#F7DB6A',
            borderRadius: '100px',
            color: 'black',
            margin: '10px',
            fontWeight: 'bold',
            paddingLeft: '4%',
            paddingRight: '4%',
          }}>
          자기계발
        </Genrebutton>
        <Genrebutton
          onClick={() => handleGenreClick('social')}
          endIcon={<ArrowForwardIosIcon />}
          style={{
            backgroundColor: '#F7DB6A',
            borderRadius: '100px',
            color: 'black',
            margin: '10px',
            fontWeight: 'bold',
            paddingLeft: '4%',
            paddingRight: '4%',
          }}>
          사회/경제
        </Genrebutton>
        <Genrebutton
          onClick={() => handleGenreClick('science')}
          endIcon={<ArrowForwardIosIcon />}
          style={{
            backgroundColor: '#F7DB6A',
            borderRadius: '100px',
            color: 'black',
            margin: '10px',
            fontWeight: 'bold',
            paddingLeft: '4%',
            paddingRight: '4%',
          }}>
          과학
        </Genrebutton>
      </GenreButtonContainer>
      {/* </> */}
      <Start
        variant="contained"
        onClick={handleSignUp}
        style={{
          backgroundColor: '#4b8346',
          color: '#ffffff',
          bottom: '0',
          left: '0',
        }}
        endIcon={<ArrowForwardIosIcon />}>
        바로 시작하기
      </Start>
    </>
  );
}

export default Genre;

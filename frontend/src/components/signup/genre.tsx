import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';

<<<<<<< HEAD
const WebContainer = styled.div<{ isWebApp: boolean }>`
=======
interface WebContainerProps {
  isWebApp: boolean;
}

const WebContainer = styled.div<WebContainerProps>`
>>>>>>> 28325b4dad2f71261d3c587dab4e565843d0bc7d
  display: ${props => (props.isWebApp ? '' : 'flex')};
  width: ${props => (props.isWebApp ? '' : '600px')};
  justify-content: ${props => (props.isWebApp ? '' : 'center')};
  align-items: ${props => (props.isWebApp ? '' : 'center')};
  border: ${props => (props.isWebApp ? '' : '1px solid black')};
  flex-direction: ${props => (props.isWebApp ? '' : 'column')};
  justify-content: ${props => (props.isWebApp ? '' : 'space-between')};
  min-height: 99vh;
  position: ${props => (props.isWebApp ? '' : 'absolute')};
  top: ${props => (props.isWebApp ? '' : '50%')};
  left: ${props => (props.isWebApp ? '' : '50%')};
  transform: ${props => (props.isWebApp ? '' : 'translate(-50%, -50%)')};
`;

const Container = styled.div`
  padding-left: 10%;
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
  const [isWebApp, setIsWebApp] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    setIsWebApp(mediaQuery.matches);

    const handleMediaChange = (event: MediaQueryListEvent) => {
      setIsWebApp(event.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  const handleSignUp = () => {
    window.location.href = '/';
  };

  const navigate = useNavigate();

  const handleGenreClick = (genre: string) => {
    navigate(`/genre/${genre}`);
  };

  return (
    <WebContainer isWebApp={isWebApp}>
      <Container>
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
      </Container>
      {isWebApp ? (
        <Start
          variant="contained"
          onClick={handleSignUp}
          style={{
            backgroundColor: '#4b8346',
            color: '#ffffff',
            position: 'fixed',
            bottom: '0',
            left: '0',
          }}
          endIcon={<ArrowForwardIosIcon />}>
          바로 시작하기
        </Start>
      ) : (
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
      )}
    </WebContainer>
  );
}

export default Genre;

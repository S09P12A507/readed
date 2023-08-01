import { useState, useEffect } from 'react';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import { Grid, Button, Modal, TextField } from '@mui/material';
import axios from 'axios';
import Rating from '@mui/material/Rating';

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
  border: ${props => (props.isWebApp ? '' : '1px solid black')};
  flex-direction: ${props => (props.isWebApp ? '' : 'column')};
  height: 100vh;
  position: ${props => (props.isWebApp ? '' : 'absolute')};
  top: ${props => (props.isWebApp ? '' : '50%')};
  left: ${props => (props.isWebApp ? '' : '50%')};
  transform: ${props => (props.isWebApp ? '' : 'translate(-50%, -50%)')};
  overflow-y: auto;
  padding: 20px;
  box-sizing: border-box;
`;

const Container = styled.div`
  flex: 1;
  padding-left: 20px;
  overflow-y: auto;
`;

const Info = styled.div`
  font-size: 10px;
  color: gray;
`;

const BookCoverContainer = styled.div``;

const BookCover = styled.div<{ imageUrl: string }>`
  background-color: #beeaea;
  margin: 5px;
  height: 150px;
  background-image: url('${props => props.imageUrl}');
  background-size: cover;
`;

const BookCoverTest = styled.div`
  background-color: #beeaea;
  margin: 5px;
  height: 150px;
`;

const Start = styled(Button)`
  width: 100%;
  height: 50px;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const ModalCloseButton = styled(Button)`
  position: absolute;
  top: 5px;
`;

const ModalSendButton = styled(Button)`
  position: absolute;
  top: 5px;
  right: 3%;
`;

const ModalUpper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Textsize = styled.div`
  float: right;
  margin-right: 5%;
`;

const Star = styled.div`
  display: flex;
  justify-content: center;
  font-size: 20px;
`;

interface NameData {
  MemberName: string;
}

function Genrebook() {
  const storedData = localStorage.getItem('signupData');
  const signUpData: NameData = storedData
    ? (JSON.parse(storedData) as NameData)
    : {
        MemberName: '',
      };
  const [isPageLoaded, setIsPageLoaded] = useState(true);
  const [MemberName] = useState<string>(signUpData.MemberName || '');
  const [bookCovers, setBookCovers] = useState<string[]>([]);
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [textLength, setTextLength] = useState<number>(0);
  const [ratingValue, setRatingValue] = useState<number>(0);
  const [isWebApp, setIsWebApp] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setInputText('');
    setRatingValue(0);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setInputText('');
    setRatingValue(0);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    if (inputValue.length > 300) {
      return;
    }
    setInputText(inputValue);
  };

  const handleSaveButton = () => {
    console.log('Input Text:', inputText);
    console.log('Rating:', ratingValue);
    setIsModalOpen(false);
  };

  const handleRatingChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: number | null,
  ) => {
    if (newValue !== null) {
      setRatingValue(newValue);
    }
  };
  useEffect(() => {
    if (isPageLoaded) {
      axios
        .get('http://localhost:8080/api/select')
        .then(response => {
          setBookCovers(response.data as string[]);
        })
        .catch(error => {
          console.log(error);
        });
    }
    setIsPageLoaded(false);
  }, [isPageLoaded]);

  useEffect(() => {
    setTextLength(inputText.length);
  }, [inputText]);

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

  return (
    <WebContainer isWebApp={isWebApp}>
      <Container>
        <h1>읽은 책 기록하기</h1>
        <h3>
          {MemberName} 님이 <br /> 재미있게 읽은 책들을 알려주세요!
        </h3>
        <Info>· 별점을 남길 책을 선택해주세요 </Info>
        <BookCoverContainer>
          <Grid container alignItems="center">
            {bookCovers.map(imageUrl => (
              <Grid item xs={3.5} key={imageUrl}>
                {' '}
                <BookCover imageUrl={imageUrl} />
              </Grid>
            ))}
          </Grid>
        </BookCoverContainer>
        {/* 아래는 테스트코드 */}
        <BookCoverContainer>
          <Grid container alignItems="center">
            {Array.from({ length: 100 }).map(() => (
              <Grid item xs={3.5} key={Math.random()}>
                <BookCoverTest onClick={() => handleOpenModal()}>
                  책표지
                </BookCoverTest>
              </Grid>
            ))}
          </Grid>
        </BookCoverContainer>
        <Modal
          open={IsModalOpen}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <div
            style={{
              height: '100%',
              backgroundColor: 'white',
              width: isWebApp ? '100%' : '600px',
            }}>
            <ModalUpper>
              <ModalCloseButton
                startIcon={<CloseIcon />}
                onClick={handleCloseModal}
                style={{
                  left: '2%',
                  margin: '2%',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                }}>
                닫기
              </ModalCloseButton>
              <p> 여기엔 책이름을 넣어보자</p>
              <ModalSendButton
                onClick={handleSaveButton}
                style={{
                  color: '#7aa874',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                }}>
                등록
              </ModalSendButton>
            </ModalUpper>
            <hr />
            <Star>
              <Rating
                name="half-rating"
                value={ratingValue}
                precision={0.5}
                size="large"
                onChange={handleRatingChange}
              />
            </Star>
            <TextField
              value={inputText}
              onChange={handleInputChange}
              placeholder="책에 대한 코멘트를 자유롭게 남겨주세요."
              variant="standard"
              multiline
              rows={25}
              style={{
                width: '96%',
                padding: '3%',
                flexWrap: 'wrap',
              }}
              InputProps={{
                disableUnderline: true,
              }}
            />
            <Textsize>{textLength} / 300 글자</Textsize>
          </div>
        </Modal>
      </Container>
      {isWebApp ? (
        <Start
          variant="contained"
          onClick={handleSignUp}
          style={{
            backgroundColor: '#4b8346',
            color: '#ffffff',
            position: 'fixed',
          }}>
          바로 시작하기
        </Start>
      ) : (
        <Start
          variant="contained"
          onClick={handleSignUp}
          style={{ backgroundColor: '#4b8346', color: '#ffffff' }}>
          바로 시작하기
        </Start>
      )}
    </WebContainer>
  );
}

export default Genrebook;

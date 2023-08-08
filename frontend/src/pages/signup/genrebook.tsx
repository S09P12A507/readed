import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Grid, Button, Modal } from '@mui/material';
import axios from 'axios';
import Comments from '../../components/book/Comment';

const Container = styled.div`
  flex: 1;
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
  height: 50px;
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

  const handleSignUp = () => {
    window.location.href = '/';
  };

  return (
    // <WebContainer isWebApp={isWebApp}>
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
            <Grid item xs={4} key={Math.random()}>
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
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}>
        <div>
          <Comments
            onClose={handleCloseModal}
            onSave={handleSaveButton}
            handleRatingChange={handleRatingChange}
            handleInputChange={handleInputChange}
            textLength={textLength}
            ratingValue={ratingValue}
            inputText={inputText}
          />
        </div>
      </Modal>

      <Start
        variant="contained"
        onClick={handleSignUp}
        style={{
          position: 'fixed',
          width: '480px',
          bottom: '0',
          background: '#4B8346',
          color: 'white',
        }}>
        바로 시작하기
      </Start>
    </Container>
    // </WebContainer>
  );
}

export default Genrebook;

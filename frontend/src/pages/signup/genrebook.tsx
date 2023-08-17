import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Grid, Button, Modal } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Comments from '../../components/book/Comment';
import BackButton from '../../components/common/button/BackButton';
import { RootState } from '../../store/store';
import ReadedFooter from '../../components/common/Footer';

const Container = styled.section`
  padding: 0 var(--padding-global);
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

const Start = styled(Button)`
  height: 50px;
`;

interface NameData {
  MemberName: string;
}

interface Book {
  bookId: string;
  coverImage: string;
  bookTitle: string;
}

function Genrebook() {
  const token: string | null = useSelector(
    (state: RootState) => state.auth.accessToken,
  );
  const { genre } = useParams();
  const storedData = localStorage.getItem('signupData');
  const signUpData: NameData = storedData
    ? (JSON.parse(storedData) as NameData)
    : {
        MemberName: '',
      };
  const [isPageLoaded, setIsPageLoaded] = useState(true);
  const [MemberName] = useState<string>(signUpData.MemberName || '');
  const [data, setdata] = useState<Book[]>([]);
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [textLength, setTextLength] = useState<number>(0);
  const [ratingValue, setRatingValue] = useState<number>(0);
  const [selectedbook, setSelecetedbook] = useState('');
  const [selectedbookId, setSelecetedbookId] = useState('');

  const handleOpenModal = (selectebook: Book) => {
    setSelecetedbook(selectebook.bookTitle);
    setSelecetedbookId(selectebook.bookId);
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
    const formData = {
      commentContent: inputText,
      rating: ratingValue * 2,
    };
    axios
      .post(
        `https://i9a507.p.ssafy.io/api/comments/${selectedbookId}`,
        formData,
        {
          headers: {
            'X-READED-ACCESSTOKEN': token,
          },
        },
      )
      .then(() => {})
      .catch(() => {});

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
      if (token) {
        axios
          .get<{ data: Book[] }>(
            `https://i9a507.p.ssafy.io/api/books/recommend/${genre as string}`,
            {
              headers: {
                'X-READED-ACCESSTOKEN': token,
              },
            },
          )
          .then(response => {
            // console.log(response.data.data);
            setdata(response.data.data);
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
    setIsPageLoaded(false);
  }, [isPageLoaded, token, genre]);

  useEffect(() => {
    setTextLength(inputText.length);
  }, [inputText]);

  const handleSignUp = () => {
    window.location.href = '/';
  };

  return (
    <Container>
      <BackButton />
      <h1>읽은 책 기록하기</h1>
      <h3>
        {MemberName} 님이 <br /> 재미있게 읽은 책들을 알려주세요!
      </h3>
      <Info>· 별점을 남길 책을 선택해주세요 </Info>
      <BookCoverContainer>
        <Grid container alignItems="center">
          {data.map(book => (
            <Grid item xs={3.5} key={book.bookId}>
              {' '}
              <BookCover
                imageUrl={book.coverImage}
                onClick={() => handleOpenModal(book)}
                style={{ cursor: 'pointer' }}
              />
              {book.bookTitle.length > 7
                ? `${book.bookTitle.slice(0, 7)}...`
                : book.bookTitle}
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
        <div style={{ maxWidth: 'var(--screen-size-mobile)', width: '100%' }}>
          {data.map(book => (
            <Comments
              key={book.bookId}
              onClose={handleCloseModal}
              onSave={handleSaveButton}
              handleRatingChange={handleRatingChange}
              handleInputChange={handleInputChange}
              textLength={textLength}
              ratingValue={ratingValue}
              inputText={inputText}
              title={selectedbook}
            />
          ))}
        </div>
      </Modal>

      <Start
        variant="contained"
        onClick={handleSignUp}
        style={{
          position: 'fixed',
          maxWidth: 'var(--screen-size-mobile)',
          width: '100%',
          bottom: '0',
          left: '0',
          background: '#4B8346',
          color: 'white',
        }}>
        바로 시작하기
      </Start>
      <ReadedFooter />
    </Container>
  );
}

export default Genrebook;

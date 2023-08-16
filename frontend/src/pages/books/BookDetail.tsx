import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  Divider,
  Rating,
  Card,
  Button,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ModeIcon from '@mui/icons-material/Mode';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ContactsIcon from '@mui/icons-material/Contacts';
import FavoriteIcon from '@mui/icons-material/Favorite';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Comments from '../../components/book/Comment';
import BackButton from '../../components/common/button/BackButton';
import AlertsModal from '../../components/common/alert/Alert';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InfoContainer = styled.div`
  padding: 1rem;
`;

const BookImage = styled.img`
  display: grid;
  width: 50%;
  height: auto;
`;

const Star = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.8rem;
`;

const StyledTable = styled(Table)`
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;

  & th,
  & td {
    border: none;
    width: 25%;
    text-align: center;
  }

  & th:not(:last-child),
  & td:not(:last-child) {
    border-right: 1px solid rgba(224, 224, 224, 1);
  }

  & tbody tr:not(:last-child) td {
    border-bottom: 1px solid rgba(255, 255, 255);
  }
`;

interface Book {
  author: string[];
  publisher: string[];
  contents: string;
  coverImage: string;
  bookTitle: string;
}

function BookDetail() {
  const { bookId } = useParams();
  const [data, setData] = useState<Book | null>(null);
  const [ratingValue, setRatingValue] = useState<number>(0);
  const [ratingsValue, setRatingsValue] = useState<number>(0);
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [textLength, setTextLength] = useState<number>(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const query = bookId as string;
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState('');

  const token: string | null = useSelector(
    (state: RootState) => state.auth.accessToken,
  );

  const navigate = useNavigate();

  const handleReport = () => {
    if (bookId) {
      navigate(`/report/${bookId}`);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setInputText('');
    setRatingValue(ratingValue);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setInputText('');
    setRatingsValue(ratingValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    if (inputValue.length > 300) {
      return;
    }
    setInputText(inputValue);
  };

  const handleToggleFavorite = () => {
    if (isBookmarked) {
      axios
        .delete(`https://i9a507.p.ssafy.io/api/bookmarks/${bookId as string}`, {
          headers: {
            'X-READED-ACCESSTOKEN': token,
          },
        })
        .then(() => {
          setIsBookmarked(false);
        })
        .catch(() => {});
    } else {
      axios
        .post(`https://i9a507.p.ssafy.io/api/bookmarks/${bookId as string}`, {
          headers: {
            'X-READED-ACCESSTOKEN': token,
          },
        })
        .then(() => {
          setIsBookmarked(true);
        })
        .catch(() => {});
    }
  };

  const handleSaveButton = () => {
    const formData = {
      commentContent: inputText,
      rating: ratingValue,
    };

    if (token) {
      axios
        .patch(
          `https://i9a507.p.ssafy.io/api/comments/${bookId as string}`,
          formData,
          {
            headers: {
              'X-READED-ACCESSTOKEN': token,
            },
          },
        )
        .then(() => {
          setMessage('코멘트가 등록됐습니다.');
          setShowAlert(true);
        })
        .catch(() => {});
    }
    setIsModalOpen(false);
  };

  const handleRatingChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: number | null,
  ) => {
    if (newValue !== null) {
      const formData = {
        commentContent: null,
        rating: ratingValue,
      };

      if (ratingValue === 0) {
        setRatingValue(newValue);
        axios
          .post(
            `https://i9a507.p.ssafy.io/api/comments/${bookId as string}`,
            formData,
            {
              headers: {
                'X-READED-ACCESSTOKEN': token,
              },
            },
          )
          .then(() => {
            setRatingsValue(newValue);
          })
          .catch(() => {});
      } else {
        setRatingValue(newValue);
        axios
          .patch(
            `https://i9a507.p.ssafy.io/api/comments/${bookId as string}`,
            formData,
            {
              headers: {
                'X-READED-ACCESSTOKEN': token,
              },
            },
          )
          .then(() => {
            setRatingsValue(newValue);
          })
          .catch(() => {});
      }
    }
  };

  const handleRatingCommentChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: number | null,
  ) => {
    if (newValue !== null) {
      setRatingsValue(newValue);
    }
  };

  useEffect(() => {
    if (token) {
      console.log(token);
      axios
        .get(`https://i9a507.p.ssafy.io/api/bookmarks/${bookId as string}`, {
          headers: {
            'X-READED-ACCESSTOKEN': token,
          },
        })
        .then(response => {
          setIsBookmarked(response.data as boolean);
        })
        .catch(() => {});

      axios
        .get<{ data: Book }>(
          `https://i9a507.p.ssafy.io/api/books/${bookId as string}`,
          {
            headers: {
              'X-READED-ACCESSTOKEN': token,
            },
          },
        )
        .then(response => {
          console.log(response.data.data);
          setData(response.data.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [token, bookId]);

  useEffect(() => {
    setTextLength(inputText.length);
  }, [inputText]);

  if (!data) {
    return <div>로--딩--중!...</div>;
  }

  return (
    <div>
      <BackButton />
      <Container>
        <BookImage src={data.coverImage} alt={data.bookTitle} />
        <h2>{data.bookTitle}</h2>
        <h5>??? 지음 | ??? 옮김</h5>
        {/* <h5> {data.publisher}</h5> */}
        <br />
        <h6>읽은 책을 평가해주세요</h6>
        <Star>
          <Rating
            name="half-rating"
            value={ratingValue}
            precision={0.5}
            size="large"
            onChange={handleRatingChange}
          />
        </Star>
        {ratingValue > 0 && (
          <Card
            style={{
              display: 'grid',
              placeItems: 'center',
              textAlign: 'center',
              width: '300px',
              margin: '2%',
              padding: '5%',
              border: '1px solid rgba(0, 0, 0, 0.12)',
            }}>
            책에 대한 한줄평을 남겨주세요!
            <Button
              onClick={handleOpenModal}
              variant="contained"
              style={{
                background: 'var(--primary-dark)',
                color: 'white',
                marginTop: '10px',
              }}>
              코멘트 남기기
            </Button>
          </Card>
        )}
        <br />
        <StyledTable>
          <TableBody>
            <TableRow>
              <TableCell>읽고 싶어요</TableCell>
              <TableCell>코멘트</TableCell>
              <TableCell>독서록 쓰기</TableCell>
              <TableCell>북클럽 보기</TableCell>
            </TableRow>
            <TableRow>
              <TableCell onClick={handleToggleFavorite}>
                {isBookmarked ? (
                  <FavoriteIcon style={{ color: 'red' }} />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </TableCell>
              <TableCell>
                <ModeIcon
                  onClick={handleOpenModal}
                  style={{ cursor: 'pointer' }}
                />
              </TableCell>
              <TableCell>
                <MenuBookIcon
                  onClick={handleReport}
                  style={{ cursor: 'pointer' }}
                />
              </TableCell>
              <TableCell>
                <ContactsIcon />
              </TableCell>
            </TableRow>
          </TableBody>
        </StyledTable>
      </Container>
      <br />
      <Divider />
      <InfoContainer>
        <h3> e- book</h3>
        <p style={{ fontSize: '2rem' }}> ○ ○ ○ ○ ○</p>
        <br />
        <h3> 구매처</h3>
        <p style={{ fontSize: '2rem' }}> ○ ○ ○</p>
      </InfoContainer>
      <Divider />
      <InfoContainer>
        <h3>책 소개</h3>
        <p> {data.contents}</p>
      </InfoContainer>
      <Divider />
      <InfoContainer>
        <h3>저자 / 역자</h3>
        <h2>저자이름</h2>
        <p>저자</p>
        <h2>(대충 사진)</h2>
        <p>역자</p>
      </InfoContainer>
      <Divider />
      <InfoContainer>
        <h3>대충 통계 </h3>
      </InfoContainer>
      <Divider />
      <InfoContainer>
        <h3>대충 댓글</h3>
      </InfoContainer>

      <Modal open={IsModalOpen} onClose={handleCloseModal}>
        <div>
          <Comments
            onClose={handleCloseModal}
            onSave={handleSaveButton}
            handleRatingChange={handleRatingCommentChange}
            handleInputChange={handleInputChange}
            textLength={textLength}
            ratingValue={ratingsValue}
            inputText={inputText}
            title={query}
          />
        </div>
      </Modal>
      <AlertsModal
        open={showAlert}
        onClose={() => setShowAlert(false)}
        message={message}
      />
    </div>
  );
}

export default BookDetail;

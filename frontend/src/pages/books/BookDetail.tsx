import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { Table, TableBody, TableRow, TableCell, Modal } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ModeIcon from '@mui/icons-material/Mode';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ContactsIcon from '@mui/icons-material/Contacts';
import styled from 'styled-components';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import Comments from '../../components/book/Comment';
import BackButton from '../../components/common/button/BackButton';

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
  authors: string[];
  publisher: string;
  translators: string;
  contents: string;
  isbn: string;
  thumbnail: string;
  title: string;
}

function BookDetail() {
  const { bookId } = useParams();
  const [data, setData] = useState<Book | null>(null);
  const [ratingValue, setRatingValue] = useState<number>(0);
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [textLength, setTextLength] = useState<number>(0);

  const apikey = 'e1496c3a1b0232c4d6f84d511cf90255';
  const query = bookId as string;

  const navigate = useNavigate();

  const handleReport = () => {
    if (bookId) {
      navigate(`/report/${bookId}`);
    }
  };

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
    axios
      .get<{ documents: Book[] }>(
        `https://dapi.kakao.com/v3/search/book?query=${encodeURIComponent(
          query,
        )}`,
        {
          headers: {
            Authorization: `KakaoAK ${apikey}`,
          },
        },
      )
      .then(response => {
        if (response.data.documents.length > 0) {
          setData(response.data.documents[0]);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [query]);

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
        <BookImage src={data.thumbnail} alt={data.title} />
        <h2>{data.title}</h2>
        <h5>
          {data.authors} 지음 | {data.translators} 옮김
        </h5>
        <h5> {data.publisher}</h5>
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
              <TableCell>
                <FavoriteBorderIcon />
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
        <h2>(대충 사진) {data.authors}</h2>
        <p>저자</p>
        <h2>(대충 사진) {data.translators}</h2>
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
            title={query}
          />
        </div>
      </Modal>
    </div>
  );
}

export default BookDetail;

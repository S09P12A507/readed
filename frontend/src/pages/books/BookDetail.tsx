import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BookImage = styled.img`
  display: grid;
  width: 50%;
  height: auto;
`;

const BackButtonContainer = styled.div`
  position: flex;
  left: 5px;
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

function BackButton() {
  return (
    <BackButtonContainer>
      <Link to="/bookclub">
        <IconButton style={{ color: 'gray', fontSize: '14px' }}>
          <ArrowBackIcon /> 이전으로
        </IconButton>
      </Link>
    </BackButtonContainer>
  );
}

function BookDetail() {
  const { bookId } = useParams();
  const [data, setData] = useState<Book | null>(null);
  const apikey = 'e1496c3a1b0232c4d6f84d511cf90255';
  const query = bookId as string;

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
      </Container>
    </div>
  );
}

export default BookDetail;

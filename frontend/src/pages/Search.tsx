import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

// 임시로 테스트를 위해서 만든 페이지이므로 전반적 수정 필요합니다

const Container = styled.div``;

const Searched = styled.div`
  position: relative;
  background-color: #f5f5f5;
  border-radius: 10%;
  width: 90%;
`;

const SearchIconWrapper = styled.div`
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 4px;
`;

const StyledInputBase = styled(InputBase)`
  margin-left: 40px;
  width: 90%;
  color: inherit;
`;

interface Book {
  // id: string;
  authors: string[];
  contents: string;
  // datetime: string;
  isbn: string;
  // price: number;
  // publisher: string;
  // sale_price: number;
  // status: string;
  thumbnail: string;
  title: string;
  // translators: string[];
  // url: string;
}

function Search() {
  const [query, setQuery] = useState<string>('');
  const [data, setData] = useState<Book[]>([]);
  const apikey = 'e1496c3a1b0232c4d6f84d511cf90255';
  useEffect(() => {
    if (query) {
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
          setData(response.data.documents);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, [query]);

  return (
    <Container>
      <div
        style={{
          display: 'grid',
          height: '100%',
          overflow: 'auto',
        }}>
        <Searched>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="관심있는 책을 검색해보세요"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </Searched>
        {data.map((item: Book) => (
          <div key={item.isbn}>
            <img src={item.thumbnail} alt={item.title} />
            <h2>{item.title}</h2>
            <p>{item.contents}</p>
            <p>{item.isbn}</p>
            <p>{item.authors}</p>
            {/* 나머지 데이터도 필요한 대로 표시해보세요 */}
          </div>
        ))}
      </div>
    </Container>
  );
}

export default Search;

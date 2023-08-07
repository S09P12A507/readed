import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Grid, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
  authors: string[];
  contents: string;
  isbn: string;
  thumbnail: string;
  title: string;
}

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlightMatchingText(text: string, query: string): React.ReactNode {
  if (!query) return text;

  const parts = text.split(new RegExp(`(${escapeRegExp(query)})`, 'gi'));
  return parts.map(part => (
    <React.Fragment key={Math.random()}>
      {part.toLowerCase() === query.toLowerCase() ? (
        <strong>{part}</strong>
      ) : (
        part
      )}
    </React.Fragment>
  ));
}

function Search() {
  const [query, setQuery] = useState<string>('');
  const [data, setData] = useState<Book[]>([]);
  const [suggestquery, setSuggestQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Book[]>([]);
  const apikey = 'e1496c3a1b0232c4d6f84d511cf90255';

  useEffect(() => {
    if (suggestquery) {
      axios
        .get<{ documents: Book[] }>(
          `https://dapi.kakao.com/v3/search/book?query=${encodeURIComponent(
            suggestquery,
          )}`,
          {
            headers: {
              Authorization: `KakaoAK ${apikey}`,
            },
          },
        )
        .then(response => {
          setSuggestions(response.data.documents);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    } else {
      setSuggestions([]);
    }
  }, [suggestquery]);

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
          setSuggestions([]);
          setData(response.data.documents);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, [query]);

  const navigate = useNavigate();

  const handlebookDetail = (bookId: string) => {
    navigate(`/book/${bookId}`);
  };

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
            value={suggestquery}
            onChange={e => {
              setSuggestQuery(e.target.value);
            }}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                setQuery(suggestquery);
              }
            }}
          />
        </Searched>
        {suggestions.length > 0 && (
          <div
            style={{
              maxHeight: '200px',
              overflowY: 'auto',
              zIndex: 1,
            }}>
            {suggestions.map(suggestion => (
              <div
                key={suggestion.title}
                onClick={() => {
                  handlebookDetail(suggestion.title);
                }}
                role="button"
                tabIndex={0}
                style={{ cursor: 'pointer' }}>
                <span>
                  {highlightMatchingText(suggestion.title, suggestquery)}
                </span>
              </div>
            ))}
          </div>
        )}
        <br />
        <Grid container alignItems="center">
          {data.map((item: Book) => (
            <Grid
              item
              xs={4}
              key={item.isbn}
              onClick={() => handlebookDetail(item.title)}>
              <img src={item.thumbnail} alt={item.title} />
              <p>{item.title}</p>
            </Grid>
          ))}
        </Grid>
      </div>
    </Container>
  );
}

export default Search;

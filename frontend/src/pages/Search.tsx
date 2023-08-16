import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Grid, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Container = styled.section`
  padding: 0 var(--padding-global);
`;

const Searched = styled.div`
  position: relative;
  background-color: #f5f5f5;
  border-radius: 10%;
  width: 100%;
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
  bookId: number;
  coverImage: string;
  bookTitle: string;
  avgRating: string;
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
        <strong style={{ color: 'var(--primary-dark)' }}>{part}</strong>
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

  const token: string | null = useSelector(
    (state: RootState) => state.auth.accessToken,
  );

  useEffect(() => {
    setData([]);
    if (suggestquery) {
      axios
        .get<{ data: Book[] }>(
          `https://i9a507.p.ssafy.io/api/search?kw=${encodeURIComponent(
            suggestquery,
          )}`,
          {
            headers: {
              'X-READED-ACCESSTOKEN': token,
            },
          },
        )
        .then(response => {
          setSuggestions(response.data.data);
        })
        .catch(() => {});
    } else {
      setSuggestions([]);
    }
  }, [suggestquery, token]);

  useEffect(() => {
    if (query) {
      axios
        .get<{ data: Book[] }>(
          `https://i9a507.p.ssafy.io/api/search?kw=${encodeURIComponent(
            query,
          )}`,
          {
            headers: {
              'X-READED-ACCESSTOKEN': token,
            },
          },
        )
        .then(response => {
          setSuggestions([]);
          setData(response.data.data);
        })
        .catch(() => {});
    }
  }, [query, token]);

  const navigate = useNavigate();

  const handlebookDetail = (bookId: number) => {
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
        {suggestions && (
          <div
            style={{
              maxHeight: '200px',
              overflowY: 'auto',
              zIndex: 1,
            }}>
            {suggestions.map(suggestion => (
              <div
                key={suggestion.bookId}
                onClick={() => {
                  handlebookDetail(suggestion.bookId);
                }}
                role="button"
                tabIndex={0}
                style={{ cursor: 'pointer' }}>
                <span>
                  {highlightMatchingText(suggestion.bookTitle, suggestquery)}
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
              key={item.bookId}
              onClick={() => handlebookDetail(item.bookId)}>
              <img width={150} src={item.coverImage} alt={item.bookTitle} />
              <p>
                {item.bookTitle.length > 14
                  ? `${item.bookTitle.slice(0, 14)}...`
                  : item.bookTitle}
              </p>
            </Grid>
          ))}
        </Grid>
      </div>
    </Container>
  );
}

export default Search;

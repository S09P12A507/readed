import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ReadedH2 from '../../../components/common/heading/ReadedH2';
import BookmarkCover from '../../../components/profile/meatballMenu/BookmarkCover';
import ReadedFooter from '../../../components/common/Footer';
// hooks
import { useAccessToken } from '../../../hooks/useAccessToken';
// types & apis
import {
  IBookmarkResponse,
  getBookmark,
} from '../../../apis/bookmark/GetBookmarkAPI';
import { IBookmark } from '../../../interfaces/bookmark/IBookmark';

const Container = styled.section`
  padding: 0 var(--padding-global);
`;

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
`;

const BookTabCoverList = styled.section`
  text-align: center;
  justify-content: space-between;
  display: grid;
  grid-template-columns: repeat(3, 32.4%);
  row-gap: 0.4rem;
`;

interface IbookmarkCheck {
  bookId: IBookmark['id'];
  isChecked: boolean;
}

function Bookmark() {
  // const bookData = dummyBookData;
  const navigate = useNavigate();
  const accessToken = useAccessToken();

  const [bookmark, setBookmark] = useState<IBookmark[]>([]);
  const [bookmarkCheck, setBookmarkCheck] = useState<IbookmarkCheck[]>([]);

  const { data } = useQuery<IBookmarkResponse | null>(['memberReport'], () =>
    getBookmark(accessToken),
  );

  useEffect(() => {
    if (data !== null && data !== undefined) {
      setBookmark(data.data.reverse());
    }
  }, [data]);

  useEffect(() => {
    const updatedBookmarkCheck = bookmarkCheck.map(item => ({
      ...item,
      isChecked: true,
    }));
    setBookmarkCheck(updatedBookmarkCheck);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <TopWrapper>
        <ReadedH2 text="읽고 싶은 책" />
        <IconButton onClick={() => navigate(-1)}>
          <CloseIcon />
        </IconButton>
      </TopWrapper>
      <BookTabCoverList>
        {bookmark.map(bookmarkBook => {
          return (
            <BookmarkCover key={bookmarkBook.id} bookmarkBook={bookmarkBook} />
          );
        })}
      </BookTabCoverList>
      <ReadedFooter />
    </Container>
  );
}

export default Bookmark;

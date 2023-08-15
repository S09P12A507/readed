import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ReadedH2 from '../../../components/common/heading/ReadedH2';
import BookmarkCover from '../../../components/profile/meatballMenu/BookmarkCover';
import ReadedFooter from '../../../components/common/Footer';
// types
import { IUserBookRead } from '../../../interfaces/user/IUserBookRead';

const Container = styled.section`
  padding: 0 var(--padding-global);
`;

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
`;

const dummyBookData: IUserBookRead[] = [
  {
    bookId: '1',
    bookTitle: 'title1',
    bookCover: 'thumbnail1',
    userRate: 3,
    userComment: 'hello1',
  },
  {
    bookId: '2',
    bookTitle: 'title2',
    bookCover: 'thumbnail2',
    userRate: 2.5,
    userComment: 'hello2',
  },
  {
    bookId: '3',
    bookTitle: 'title3',
    bookCover: 'thumbnail3',
    userRate: 4,
    userComment: 'hello3',
  },
  {
    bookId: '4',
    bookTitle: 'title4',
    bookCover: 'thumbnail3',
    userRate: 4,
    userComment: 'hello3',
  },
  {
    bookId: '5',
    bookTitle: 'title5',
    bookCover: 'thumbnail3',
    userRate: 4,
    userComment: 'hello3',
  },
  {
    bookId: '6',
    bookTitle: 'title6',
    bookCover: 'thumbnail3',
    userRate: 4,
    userComment: 'hello3',
  },
  {
    bookId: '7',
    bookTitle: 'title7',
    bookCover: 'thumbnail3',
    userRate: 4,
    userComment: 'hello3',
  },
];

const BookTabCoverList = styled.section`
  text-align: center;
  justify-content: space-between;
  display: grid;
  grid-template-columns: repeat(3, 32.4%);
  row-gap: 0.4rem;
`;

function Bookmark() {
  const bookData = dummyBookData;
  const navigate = useNavigate();
  return (
    <Container>
      <TopWrapper>
        <ReadedH2 text="읽고 싶은 책" />
        <IconButton onClick={() => navigate(-1)}>
          <CloseIcon />
        </IconButton>
      </TopWrapper>
      <BookTabCoverList>
        {bookData.map(bookRead => {
          return <BookmarkCover key={bookRead.bookId} bookRead={bookRead} />;
        })}
      </BookTabCoverList>
      <ReadedFooter />
    </Container>
  );
}

export default Bookmark;

import { useState } from 'react';
import styled from 'styled-components';
// components
import { Button } from '@mui/material';
import BookTabBottomSheet from './BookTabBottomSheet';
// types
import { IComment } from '../../../../interfaces/comment/IComment';

/**
 * 내 서재 - 읽은 책 탭의 책 요소
 *
 * @author 박성준
 * @see
 * @todo 무한스크롤
 */

// const primaryColor = 'var(--primary-main)';
const noThumbnailColor = 'var(--divider)';

const BookReadCover = styled(Button)<{ bookcover: string }>`
  width: 100%;
  border-radius: 0.25rem;
  aspect-ratio: 6.5/9;
  /* 임시 컬러 지정 */
  /* 얘네들 작동 안하는 것 같음 */
  background-color: ${props =>
    props.bookcover === null ? '#d9d9d9' : noThumbnailColor};
  background-image: ${props =>
    props.bookcover !== null ? `url(${props.bookcover})` : '#d9d9d9'};
  /* :hover {
    cursor: pointer;
  } */
  background-size: cover;
`;

function BookTabCover({ bookRead }: { bookRead: IComment }) {
  // console.log(bookRead);
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <BookReadCover
        // variant="contained"
        sx={{ bgcolor: '#d9d9d9' }} // 임시 컬러
        bookcover={bookRead.bookCover}
        onClick={toggleDrawer(true)}
      />
      <BookTabBottomSheet
        open={open}
        onClose={toggleDrawer(false)}
        bookRead={bookRead}
      />
    </>
  );
}

export default BookTabCover;

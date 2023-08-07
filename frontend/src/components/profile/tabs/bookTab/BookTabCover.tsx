import { useState } from 'react';
import styled from 'styled-components';
// components
import BookTabBottomSheet from './BookTabBottomSheet';
// types
import { UserBookRead } from '../../../../interfaces/user/UserBookRead';

/**
 * 내 서재 - 읽은 책 탭의 책 요소
 *
 * @author 박성준
 * @see
 * @todo 무한스크롤
 */

// const primaryColor = 'var(--primary-main)';
const noThumbnailColor = 'var(--divider)';

const BookReadCover = styled.img<{ bookCover: string }>`
  width: 100%;
  aspect-ratio: 6.5/9;
  background-color: ${props => (props.bookCover ? 'none' : noThumbnailColor)};
  :hover {
    cursor: pointer;
  }
`;

function BookTabCover({ bookRead }: { bookRead: UserBookRead }) {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <BookReadCover
        bookCover={bookRead.bookCover}
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

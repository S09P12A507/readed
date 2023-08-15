import { useState } from 'react';
import styled from 'styled-components';
// components
import BookTabBottomSheet from './BookTabBottomSheet';
// types
import { IUserBookRead } from '../../../../interfaces/user/IUserBookRead';

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
  border-radius: 0.25rem;
  aspect-ratio: 6.5/9;
  /* 임시 컬러 지정 */
  /* img를 가져와서 background-image로 넣을 것 */
  background-color: ${props =>
    props.bookCover ? '#d9d9d9' : noThumbnailColor};
  :hover {
    cursor: pointer;
  }
`;

function BookTabCover({ bookRead }: { bookRead: IUserBookRead }) {
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

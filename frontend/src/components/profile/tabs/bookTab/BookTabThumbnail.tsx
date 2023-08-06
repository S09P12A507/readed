import { useState } from 'react';
import styled from 'styled-components';
// components
import BottomSheet from '../../../common/BottomSheet';
// types
import { UserBookRead } from '../../../../interfaces/user/UserBookRead';

/**
 * 내 서재 - 읽은 책 탭의 책 요소
 *
 * @author 박성준
 * @see
 * @todo 무한스크롤
 * @todo 책 표지 데이터 가져와서 씌우기: 책 썸네일도 제공되는지? 내가 찾아와야 하는지?
 * @todo 처음부터 렌더링되어 있지 않고, 클릭할 때 그 책에 대한 정보만 렌더링하기
 */

// const primaryColor = 'var(--primary-main)';
const noThumbnailColor = 'var(--divider)';

const BookReadThumbnail = styled.button<{ thumbnail: string }>`
  width: 6.5rem;
  height: 9rem;
  background-color: ${props => (props.thumbnail ? 'none' : noThumbnailColor)};
`;

function BookTabThumbnail({ bookRead }: { bookRead: UserBookRead }) {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <BookReadThumbnail
        thumbnail={bookRead.bookThumbnail}
        onClick={toggleDrawer(true)}
      />
      <BottomSheet
        open={open}
        onClose={toggleDrawer(false)}
        bookRead={bookRead}
      />
    </>
  );
}

export default BookTabThumbnail;

import styled from 'styled-components';
import { SwipeableDrawer } from '@mui/material';
// types
import { UserBookRead } from '../../../../interfaces/user/IUserBookRead';

/**
 * 내 서재 - 읽은 책 탭의 책 요소
 *
 * @author 박성준
 * @see
 * @todo puller 등 작동하는지 확인, 배치와 CSS
 */

const BottomSheetContent = styled.article`
  display: flex;
  flex-flow: column;
  align-items: center;
  max-width: 100%;
  padding: 1rem;
`;

const noThumbnailColor = 'var(--divider)';

const PrivateBookCommentCover = styled.img<{ bookCover: string }>`
  width: 6.5rem;
  aspect-ratio: 6.5/9;
  background-color: ${props => (props.bookCover ? 'none' : noThumbnailColor)};
`;

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  bookRead: UserBookRead;
}

function BookTabBottomSheet({ open, onClose, bookRead }: BottomSheetProps) {
  const { bookTitle, bookCover, userRate, userComment } = bookRead;

  return (
    <SwipeableDrawer
      PaperProps={{
        sx: {
          maxWidth: 'var(--screen-size-mobile)',
          height: '30rem',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          textAlign: 'center',
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      }}
      anchor="bottom"
      open={open}
      onClose={onClose}
      onOpen={() => {}}
      swipeAreaWidth={20}
      disableSwipeToOpen
      ModalProps={{ keepMounted: false }}>
      <BottomSheetContent>
        <PrivateBookCommentCover bookCover={bookCover} />
        {bookTitle}
        <br />
        Rating: {userRate}
        <br />
        Comment: {userComment}
      </BottomSheetContent>
    </SwipeableDrawer>
  );
}

export default BookTabBottomSheet;

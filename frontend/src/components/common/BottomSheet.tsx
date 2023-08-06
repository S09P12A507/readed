import { SwipeableDrawer } from '@mui/material';
// types
import { UserBookRead } from '../../interfaces/user/UserBookRead';

/**
 * 내 서재 - 읽은 책 탭의 책 요소
 *
 * @author 박성준
 * @see
 * @todo eslint 오류 해제한 부분 처리해야 함
 * @todo BottomSheetProps 마음에 안들어서 이것도 처리해야함
 */

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  bookRead: UserBookRead;
}

function BottomSheet({ open, onClose, bookRead }: BottomSheetProps) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { bookTitle, userRate, userComment } = bookRead;

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      onOpen={() => {}}
      swipeAreaWidth={40}
      disableSwipeToOpen={false}>
      <div style={{ padding: '1rem' }}>
        {bookTitle}
        Rating: {userRate}
        Comment: {userComment}
      </div>
    </SwipeableDrawer>
  );
}

export default BottomSheet;

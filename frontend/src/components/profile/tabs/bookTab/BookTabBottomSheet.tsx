import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { SwipeableDrawer, Typography, Rating, Button } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// types
import { IComment } from '../../../../interfaces/comment/IComment';

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

const DataWrapper = styled.div`
  width: 80%;
  margin: 0.5rem 0;
`;
const DatumWrapper = styled.div`
  width: 100%;
`;

const UserComment = styled(Typography)`
  width: 100%;
  text-align: left;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const noThumbnailColor = 'var(--divider)';

const PrivateBookCommentCover = styled.div<{ bookcover: string }>`
  width: 6.5rem;
  aspect-ratio: 6.5/10;
  /* 임시 컬러 지정 */
  /* img를 가져와서 background-image로 넣을 것 */
  /* background-color: ${props =>
    props.bookcover ? '#d9d9d9' : noThumbnailColor}; */
  background-image: ${props =>
    props.bookcover ? `url(${props.bookcover})` : noThumbnailColor};
  background-size: cover;
`;

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  bookRead: IComment;
}

function BookTabBottomSheet({ open, onClose, bookRead }: BottomSheetProps) {
  const { bookId, bookTitle, bookCover, rating, commentContent } = bookRead;
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
        <Typography
          fontSize="1rem"
          fontWeight="600"
          marginTop="0.5rem"
          marginBottom="1rem">
          {bookTitle}
        </Typography>
        <Link
          to={`/book/${bookId}`}
          style={{
            display: 'flex',
            flexFlow: 'column',
            textDecoration: 'none',
          }}>
          <PrivateBookCommentCover bookcover={bookCover} />
          <Button
            size="small"
            endIcon={<ChevronRightIcon />}
            sx={{ color: 'var(--text-disabled)' }}>
            책 페이지로
          </Button>
        </Link>
        <DataWrapper>
          <DatumWrapper>
            <Typography>내 별점</Typography>
            <Rating
              defaultValue={rating}
              precision={0.5}
              readOnly
              size="large"
            />
          </DatumWrapper>
          <DatumWrapper>
            <Typography>내 코멘트</Typography>
            <UserComment>{commentContent}</UserComment>
          </DatumWrapper>
        </DataWrapper>
      </BottomSheetContent>
    </SwipeableDrawer>
  );
}

export default BookTabBottomSheet;

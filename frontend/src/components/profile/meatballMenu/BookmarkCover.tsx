import styled from 'styled-components';
// components
import { Rating } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// types
import { IBookmark } from '../../../interfaces/bookmark/IBookmark';

/**
 * 내 서재 - 읽은 책 탭의 책 요소
 *
 * @author 박성준
 * @see
 * @todo 무한스크롤
 * @todo 하트 클릭 -> X표시로 데이터 저장.
 */

const noThumbnailColor = 'var(--divider)';

const BookmarkCover = styled.div<{ bookCover: string }>`
  position: relative;
  width: 100%;
  border-radius: 0.25rem;
  aspect-ratio: 6.5/10;
  /* 임시 컬러 지정 */
  /* img를 가져와서 background-image로 넣을 것 */
  background-color: ${props =>
    props.bookCover ? '#d9d9d9' : noThumbnailColor};
  background-image: ${props =>
    props.bookCover ? `url${props.bookCover}` : noThumbnailColor};
`;

const HeartMark = styled(Rating)({
  top: '80%',
  left: '30%',
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff6d75',
  },
});

function BookTabCover({ bookmarkBook }: { bookmarkBook: IBookmark }) {
  return (
    <>
      <BookmarkCover bookCover={bookmarkBook.bookCover}>
        <HeartMark
          max={1}
          icon={<FavoriteIcon fontSize="inherit" />}
          emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
        />
        {/* <HeartToggle value="like">
          <FavoriteIcon />
        </HeartToggle> */}
      </BookmarkCover>
      {/* 바텀시트 그냥 안나오게 하자.. 하트 값 유지 모르겠다 */}
    </>
  );
}

export default BookTabCover;

import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Card, CardContent, CardMedia, CardActionArea } from '@mui/material';
// styles
import 'react-horizontal-scrolling-menu/dist/styles.css';
// types
import { IBook } from '../../interfaces/book/IBook';

/** 메인페이지 책 카드
 * @author 박성준
 * @todo 책 표지와 텍스트 컨텐트 영역이 모호한 부분 처리: border/divider 삽입
 */

const BookTitle = styled.span`
  margin-bottom: 0.25rem;
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.3;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
const BookAuthor = styled.span`
  font-weight: 400;
  font-size: 0.5rem;
  line-height: 1.3;
  text-align: right;
  color: var(--text-secondary);
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

function BookCard({ book, itemId }: { book: IBook; itemId: string }) {
  const { authors, thumbnail, title } = book;
  // 임시로 책 제목을 통해 책의 상세로 들어간다. 추후 책 isbn으로 넘어가도록 해야 할 듯.
  const bookLink = `/book/${encodeURIComponent(title)}`;
  return (
    <Card
      id={itemId}
      sx={{
        width: '7.5rem',
        marginLeft: '0.5rem',
        marginRight: '0.5rem',
        height: '99.5%',
        boxShadow: 'none',
      }}>
      <Link
        to={bookLink}
        style={{ textDecoration: 'none', color: 'var(--text-main)' }}>
        <CardActionArea sx={{ height: '100%' }}>
          <CardMedia
            component="img"
            image={thumbnail}
            alt={title}
            sx={{
              borderRadius: '0.25rem',
              boxShadow: '2',
            }}
          />
          <CardContent
            sx={{
              height: '5rem',
              padding: '0.5rem',
              paddingTop: '1rem',
              display: 'flex',
              flexFlow: 'column',
              justifyContent: 'space-between',
            }}>
            <BookTitle>{title}</BookTitle>
            <BookAuthor>{authors}</BookAuthor>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
}

export default BookCard;

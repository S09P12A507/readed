// import styled from 'styled-components';
import BookTabThumbnail from './BookTabThumbnail';
// types
import { UserBookRead } from '../../../../interfaces/user/UserBookRead';

/**
 * 내 서재 - 읽은 책 탭
 * 여기서 내가 읽은 책들의 데이터를 받습니다.
 *
 * @author 박성준
 * @see
 * @todo filter 기능
 */

// 책 데이터
const dummyBookData: UserBookRead[] = [
  {
    bookId: '1',
    bookTitle: 'title1',
    bookThumbnail: 'thumbnail1',
    userRate: 3,
    userComment: 'hello1',
  },
  {
    bookId: '2',
    bookTitle: 'title2',
    bookThumbnail: 'thumbnail2',
    userRate: 2.5,
    userComment: 'hello2',
  },
  {
    bookId: '3',
    bookTitle: 'title3',
    bookThumbnail: 'thumbnail3',
    userRate: 4,
    userComment: 'hello3',
  },
];

// 썸네일, 개인평점을 썸네일버튼에 내리고
// 제목, 개인평점, 코멘트를 모달에 내리도록 한다
function BookTab() {
  const bookData = dummyBookData;
  return (
    <>
      <div>읽은 책들 나오는 탭</div>
      {bookData.map(bookRead => {
        return <BookTabThumbnail key={bookRead.bookId} bookRead={bookRead} />;
      })}
      <div />
    </>
  );
}

export default BookTab;

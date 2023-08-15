// import axios, { AxiosResponse } from 'axios';
// import { useInfiniteQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import BookTabCover from './BookTabCover';
// hooks
// types
import { IUserBookRead } from '../../../../interfaces/user/IUserBookRead';

/**
 * 내 서재 - 읽은 책 탭
 * 여기서 내가 읽은 책들의 데이터를 받습니다.
 *
 * @author 박성준
 * @see
 * @todo filter 기능
 * @todo react query,useInfiniteQuery를 이용한 무한스크롤
 * @todo 이미지가 없는 책의 경우 기본이미지 제공
 *
 */

// 책 더미 데이터
const dummyBookData: IUserBookRead[] = [
  {
    bookId: '1',
    bookTitle: 'title1',
    bookCover: 'thumbnail1',
    userRate: 3,
    userComment: 'hello1',
  },
  {
    bookId: '2',
    bookTitle: 'title2',
    bookCover: 'thumbnail2',
    userRate: 2.5,
    userComment: 'hello2',
  },
  {
    bookId: '3',
    bookTitle: 'title3',
    bookCover: 'thumbnail3',
    userRate: 4,
    userComment: 'hello3',
  },
  {
    bookId: '4',
    bookTitle: 'title4',
    bookCover: 'thumbnail3',
    userRate: 4,
    userComment: 'hello3',
  },
  {
    bookId: '5',
    bookTitle: 'title5',
    bookCover: 'thumbnail3',
    userRate: 4,
    userComment: 'hello3',
  },
  {
    bookId: '6',
    bookTitle: 'title6',
    bookCover: 'thumbnail3',
    userRate: 4,
    userComment: 'hello3',
  },
  {
    bookId: '7',
    bookTitle: 'title7',
    bookCover: 'thumbnail3',
    userRate: 4,
    userComment: 'hello3',
  },
  {
    bookId: '8',
    bookTitle: 'title8',
    bookCover: 'thumbnail3',
    userRate: 4,
    userComment: 'hello3',
  },
  {
    bookId: '9',
    bookTitle: 'title9',
    bookCover: 'thumbnail3',
    userRate: 4,
    userComment: 'hello3',
  },
  {
    bookId: '10',
    bookTitle: 'title10',
    bookCover: 'thumbnail3',
    userRate: 4,
    userComment: 'hello3',
  },
  {
    bookId: '11',
    bookTitle: 'title11',
    bookCover: 'thumbnail3',
    userRate: 4,
    userComment: 'hello3',
  },
  {
    bookId: '12',
    bookTitle: 'title12',
    bookCover: 'thumbnail3',
    userRate: 4,
    userComment: 'hello3',
  },
  {
    bookId: '13',
    bookTitle: 'title13',
    bookCover: 'thumbnail3',
    userRate: 4,
    userComment: 'hello3',
  },
  {
    bookId: '14',
    bookTitle: 'title14',
    bookCover: 'thumbnail3',
    userRate: 4,
    userComment: 'hello3',
  },
  {
    bookId: '15',
    bookTitle: 'title15',
    bookCover: 'thumbnail3',
    userRate: 4,
    userComment: 'hello3',
  },
  {
    bookId: '16',
    bookTitle: 'title16',
    bookCover: 'thumbnail3',
    userRate: 4,
    userComment: 'hello3',
  },
  {
    bookId: '17',
    bookTitle: 'title17',
    bookCover: 'thumbnail3',
    userRate: 4,
    userComment: 'hello3',
  },
  {
    bookId: '18',
    bookTitle: 'title18',
    bookCover: 'thumbnail3',
    userRate: 4,
    userComment: 'hello3',
  },
  {
    bookId: '19',
    bookTitle: 'title19',
    bookCover: 'thumbnail3',
    userRate: 4,
    userComment: 'hello3',
  },
  {
    bookId: '20',
    bookTitle: 'title20',
    bookCover: 'thumbnail3',
    userRate: 4,
    userComment: 'hello3',
  },
  {
    bookId: '21',
    bookTitle: 'title21',
    bookCover: 'thumbnail3',
    userRate: 4,
    userComment: 'hello3',
  },
  {
    bookId: '22',
    bookTitle: 'title22',
    bookCover: 'thumbnail3',
    userRate: 4,
    userComment: 'hello3',
  },
  {
    bookId: '23',
    bookTitle: 'title23',
    bookCover: 'thumbnail3',
    userRate: 4,
    userComment: 'hello3',
  },
  {
    bookId: '24',
    bookTitle: 'title24',
    bookCover: 'thumbnail3',
    userRate: 4,
    userComment: 'hello3',
  },
  {
    bookId: '25',
    bookTitle: 'title25',
    bookCover: 'thumbnail3',
    userRate: 4,
    userComment: 'hello3',
  },
  {
    bookId: '26',
    bookTitle: 'title26',
    bookCover: 'thumbnail3',
    userRate: 4,
    userComment: 'hello3',
  },
];

const BookTabCoverList = styled.section`
  text-align: center;
  justify-content: space-between;
  display: grid;
  grid-template-columns: repeat(3, 32.4%);
  row-gap: 0.4rem;
`;

function BookTab() {
  const bookData = dummyBookData;

  return (
    <BookTabCoverList>
      {bookData.map(bookRead => {
        return <BookTabCover key={bookRead.bookId} bookRead={bookRead} />;
      })}
    </BookTabCoverList>
  );
}

export default BookTab;

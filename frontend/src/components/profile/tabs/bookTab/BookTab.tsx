import { useState, useEffect } from 'react';
// import axios, { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import BookTabCover from './BookTabCover';
// hooks
import { useAccessToken } from '../../../../hooks/useAccessToken';
// apis
import {
  ICommentResponse,
  getMemberComment,
} from '../../../../apis/comment/CommentListByMember';
// types
import { IComment } from '../../../../interfaces/comment/IComment';
// components
import ReadedFooter from '../../../common/Footer';

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

const BookTabCoverList = styled.section`
  text-align: center;
  justify-content: space-between;
  display: grid;
  grid-template-columns: repeat(3, 32.4%);
  row-gap: 0.4rem;
`;

function BookTab() {
  const accessToken = useAccessToken();

  const [comment, setComment] = useState<IComment[]>([]);

  const { data } = useQuery<ICommentResponse | null>(['memberComment'], () =>
    getMemberComment(accessToken),
  );

  useEffect(() => {
    if (data !== null && data !== undefined) {
      const memberComment = data.data.reverse();
      setComment(memberComment);
    }
  }, [data, comment]);

  return (
    <>
      <BookTabCoverList>
        {comment.map(bookRead => {
          return <BookTabCover key={bookRead.bookId} bookRead={bookRead} />;
        })}
      </BookTabCoverList>
      <ReadedFooter />
    </>
  );
}

export default BookTab;

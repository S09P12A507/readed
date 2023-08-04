import styled from 'styled-components';
/**
 * 내 서재 - 읽은 책 탭의 책 요소
 *
 * @author 박성준
 * @see
 * @todo 무한스크롤
 * @todo 책 표지 데이터 가져와서 씌우기: 책 썸네일도 제공되는지? 내가 찾아와야 하는지?
 */
const BookReadDefault = styled.div`
  width: 6.5rem;
  height: 9rem;
  background-color: var(--divider);
`;
const BookReadThumbnail = styled.div`
  width: 6.5rem;
  height: 9rem;
`;
function BookReadButton() {
  return (
    <>
      <BookReadDefault />
      <BookReadThumbnail />
    </>
  );
}

export default BookReadButton;

import { useState, useEffect } from 'react';
// styles
import styled from 'styled-components';
// components
import { Typography, Divider } from '@mui/material';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import MainSlider from '../components/main/MainSlider';
import ReadedFooter from '../components/common/Footer';
import BookCard from '../components/main/BookCard';
import { LeftArrow } from '../components/main/LeftArrowButton';
import { RightArrow } from '../components/main/RightArrowButton';
import 'react-alice-carousel/lib/alice-carousel.css';
// types & apis
// import { IBook } from '../interfaces/book/IBook';
import { IMainBook, getBestSeller } from '../apis/book/BookBestSellerAPI';
import { getTopTen } from '../apis/book/BookTopTenAPI';
// hooks
import { useAccessToken } from '../hooks/useAccessToken';

/** 메인 페이지
 * @author 김보석, 박성준
 * @todo 하루종일 "임시코드"라 불렸던 것들을 리팩토링
 * @todo 처음 데이터를 불러오는 동안 스켈레톤 로딩
 * @todo 수평 스크롤 오른쪽 화살표는 호버해도 잘 안나옴
 */

const Container = styled.section`
  /* padding: 0 var(--padding-global); */
`;

const HorizontalScrollSectionContainer = styled.article`
  position: relative;
  overflow: hidden;
  margin: 0rem 0rem 3rem 0rem;
  padding: 1rem 0;
  .react-horizontal-scrolling-menu--scroll-container::-webkit-scrollbar {
    display: none;
  }
  .react-horizontal-scrolling-menu--scroll-container {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`;

const BackgroundBoxPri = styled.div`
  position: absolute;
  top: 40%;
  width: 100%;
  height: 3rem;
  background-color: var(--primary-light);
  z-index: -1;
  /* transform: translateY(-50%); */
`;

let term = {
  year: 0,
  month: 0,
  week: 0,
};

function Home() {
  const accessToken = useAccessToken();
  const [topTen, setTopten] = useState<IMainBook[]>([]);
  const [bestSeller, setBestSeller] = useState<IMainBook[]>([]);

  useEffect(() => {
    if (!accessToken) {
      return;
    }
    // 리디드만의 알고리즘으로 뽑은 topten
    getTopTen(accessToken)
      .then(response => {
        if (response !== null) {
          setTopten(response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching bestsellers:', error);
      });
  }, [accessToken]);
  useEffect(() => {
    // 특정 기간의 베스트셀러를 가져와요
    term = {
      year: 2023,
      month: 8,
      week: 2,
    };
    getBestSeller(accessToken, term)
      .then(response => {
        if (response !== null) {
          setBestSeller(response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching bestsellers:', error);
      });
  }, [accessToken]);

  return (
    <Container>
      <MainSlider />

      {/* <Skeleton
        width="100%"
        height="30rem"
        animation="wave"
        sx={{
          padding: 0,
          marginTop: '-3rem',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;(피드백) 조금 더 화려한 요소
      </Skeleton> */}

      <HorizontalScrollSectionContainer>
        <Typography
          variant="h5"
          fontSize="1.75rem"
          fontWeight="700"
          marginLeft="var(--padding-global)"
          marginBottom="1.5rem"
          position="relative"
          sx={
            {
              // textDecoration: 'underline',
              // textDecorationStyle: 'inherit',
              // textDecorationColor: 'var(--secondary-light)',
            }
          }>
          리디드 Top 10
        </Typography>
        <BackgroundBoxPri />
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
          {topTen.map((book: IMainBook) => {
            return (
              <BookCard
                itemId={book.bookId.toString()}
                key={book.bookId}
                book={book}
              />
            );
          })}
        </ScrollMenu>
      </HorizontalScrollSectionContainer>

      <Divider
        sx={{
          width: '40%',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '2rem',
          marginBottom: '3rem',
        }}
      />

      <HorizontalScrollSectionContainer>
        <Typography
          variant="h5"
          fontSize="1.75rem"
          fontWeight="700"
          marginLeft="var(--padding-global)"
          marginBottom="1.5rem"
          position="relative"
          sx={
            {
              // textDecoration: 'underline',
              // textDecorationStyle: 'inherit',
              // textDecorationColor: 'var(--secondary-light)',
            }
          }>
          {term.month}월 {term.week}주차 베스트셀러
          {/* <BackgroundBoxSec /> */}
        </Typography>
        <BackgroundBoxPri />
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
          {bestSeller.map((book: IMainBook) => {
            return (
              <BookCard
                itemId={book.bookId.toString()}
                key={book.bookId}
                book={book}
              />
            );
          })}
        </ScrollMenu>
      </HorizontalScrollSectionContainer>
      <ReadedFooter />
    </Container>
  );
}

export default Home;

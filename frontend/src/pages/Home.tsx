import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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

const HeaderTmpWrapper = styled.header`
  padding: 0 var(--padding-global);

  /* background-color: var(--primary-main); */
  display: flex;
  justify-content: space-between;
  align-items: center;
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

function Home() {
  const accessToken = useAccessToken();
  // const apikey = 'e1496c3a1b0232c4d6f84d511cf90255';
  const [topTen, setTopten] = useState<IMainBook[]>([]);
  const [bestSeller, setBestSeller] = useState<IMainBook[]>([]);

  // useEffect(() => {
  //   axios
  //     .get<{ documents: IMainBook[] }>(
  //       `https://dapi.kakao.com/v3/search/book?query=${encodeURIComponent(
  //         '공부',
  //       )}`,
  //       {
  //         headers: {
  //           Authorization: `KakaoAK ${apikey}`,
  //         },
  //       },
  //     )
  //     .then(response => {
  //       // console.log('탑텐');
  //       console.log(response);
  //       // setTopten(response.data.documents);
  //       // setIsTopTenLoading(false);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching topTen:', error);
  //     });
  // }, []);

  useEffect(() => {
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
    const term = {
      year: 2023,
      month: 1,
      week: 1,
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
      {/* 메인페이지 헤더, 우측 임시 버튼은 다 구현되면 제거. */}
      <HeaderTmpWrapper>
        <Typography variant="h4" color="var(--primary-light)" fontWeight="500">
          readed
        </Typography>
        <div>
          <Link to="/login" style={{ color: 'var(--divider)' }}>
            [login→]
          </Link>
          <Link to="/profilechange/:userId" style={{ color: 'var(--divider)' }}>
            [profileChange→]
          </Link>
        </div>
      </HeaderTmpWrapper>

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
          베스트셀러
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

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// styles
import styled from 'styled-components';
// components
import { Typography, Skeleton } from '@mui/material';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import ReadedFooter from '../components/common/Footer';
// import AliceCarousel from 'react-alice-carousel';
import BookCard from '../components/main/BookCard';
import { LeftArrow } from '../components/main/LeftArrowButton';
import { RightArrow } from '../components/main/RightArrowButton';
import 'react-alice-carousel/lib/alice-carousel.css';
// types
import { IBook } from '../interfaces/book/IBook';

/** 메인 페이지
 * @author 김보석, 박성준
 * @todo 하루종일 "임시코드"라 불렸던 것들을 리팩토링
 * @todo 처음 데이터를 불러오는 동안 스켈레톤 로딩
 * @todo 수평 스크롤 오른쪽 화살표는 호버해도 잘 안나옴
 * @todo 리디드 Top10 부분, 최상단에는 조금 더 화려한 요소를 넣는 게 좋아 보임.
 */

const Container = styled.section`
  /* padding: 0 var(--padding-global); */
`;

const HeaderTmpWrapper = styled.header`
  padding: 0 var(--padding-global);

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

// const BackgroundBoxSec = styled.div`
//   position: absolute;
//   width: 100%;
//   height: 0.3rem;
//   background-color: var(--secondary-light);
//   z-index: -1;
//   transform: translateY(-50%);
// `;
const BackgroundBoxPri = styled.div`
  position: absolute;
  top: 40%;
  width: 100%;
  height: 3rem;
  background-color: var(--primary-light);
  z-index: -1;
  /* transform: translateY(-50%); */
`;

// const Box = styled.div`
//   background-color: #4285f4;
//   color: #ffffff;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 36px;
//   font-weight: bold;
//   width: 150px;
//   height: 200px;
//   margin: 5px;
//   border-radius: 10px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
// `;

function Home() {
  // const items = Array.from({ length: 7 }, (_, i) => i + 1);
  const apikey = 'e1496c3a1b0232c4d6f84d511cf90255';
  const [topTen, setTopten] = useState<IBook[]>([]);
  const [bestSeller, setBest] = useState<IBook[]>([]);

  useEffect(() => {
    axios
      .get<{ documents: IBook[] }>(
        `https://dapi.kakao.com/v3/search/book?query=${encodeURIComponent(
          '공부',
        )}`,
        {
          headers: {
            Authorization: `KakaoAK ${apikey}`,
          },
        },
      )
      .then(response => {
        setTopten(response.data.documents);
      })
      .catch(error => {
        console.error('Error fetching topTen:', error);
      });
  }, []);

  useEffect(() => {
    axios
      .get<{ documents: IBook[] }>(
        `https://dapi.kakao.com/v3/search/book?query=${encodeURIComponent(
          '용의자',
        )}`,
        {
          headers: {
            Authorization: `KakaoAK ${apikey}`,
          },
        },
      )
      .then(response => {
        setBest(response.data.documents);
      })
      .catch(error => {
        console.error('Error fetching topTen:', error);
      });
  }, []);

  return (
    <Container>
      {/* 메인페이지 헤더, 우측 임시 버튼은 다 구현되면 제거 */}
      <HeaderTmpWrapper>
        <Typography variant="h4" color="var(--primary-main)">
          readed
        </Typography>
        <div>
          <Link to="/login" style={{ color: 'black' }}>
            [login→]
          </Link>
          <Link to="/profilechange/:userId" style={{ color: 'black' }}>
            [profileChange→]
          </Link>
        </div>
      </HeaderTmpWrapper>

      <Skeleton
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
      </Skeleton>

      <HorizontalScrollSectionContainer>
        <Typography
          variant="h5"
          fontSize="1.75rem"
          fontWeight="700"
          marginLeft="var(--padding-global)"
          marginBottom="1.5rem"
          position="relative"
          sx={{
            textDecoration: 'underline',
            textDecorationStyle: 'inherit',
            textDecorationColor: 'var(--secondary-light)',
          }}>
          리디드 Top 10
        </Typography>
        <BackgroundBoxPri />
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
          {topTen.map((book: IBook) => {
            return <BookCard itemId={book.isbn} key={book.isbn} book={book} />;
          })}
        </ScrollMenu>
        {/* <BackgroundBox /> */}
      </HorizontalScrollSectionContainer>

      {/* <Divider sx={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }} /> */}

      <HorizontalScrollSectionContainer>
        <Typography
          variant="h5"
          fontSize="1.75rem"
          fontWeight="700"
          marginLeft="var(--padding-global)"
          marginBottom="1.5rem"
          position="relative"
          sx={{
            textDecoration: 'underline',
            textDecorationStyle: 'inherit',
            textDecorationColor: 'var(--secondary-light)',
          }}>
          베스트셀러
          {/* <BackgroundBoxSec /> */}
        </Typography>
        <BackgroundBoxPri />
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
          {bestSeller.map((book: IBook) => {
            return <BookCard itemId={book.isbn} key={book.isbn} book={book} />;
          })}
        </ScrollMenu>
      </HorizontalScrollSectionContainer>
      {/* <AliceCarousel
        mouseTracking
        items={topTen.map((item: IBook) => (
          <div
            role="button"
            tabIndex={0}
            key={item.isbn}
            style={{ width: 100 }}
            onClick={() => handlebookDetail(item.title)}>
            <img src={item.thumbnail} alt={item.title} />
            {item.title}
          </div>
        ))}
        responsive={{ 0: { items: 3 }, 1024: { items: 3 } }}
        disableDotsControls
      />
      <h2>베스트 셀러</h2>
      <AliceCarousel
        mouseTracking
        items={bestSeller.map((item: IBook) => (
          <div
            role="button"
            tabIndex={0}
            onClick={() => handlebookDetail(item.title)}
            key={item.isbn}
            style={{ width: 130 }}>
            <img src={item.thumbnail} alt={item.title} />
            {item.title}
          </div>
        ))}
        responsive={{ 0: { items: 3 }, 1024: { items: 3 } }}
        disableDotsControls
      />
      <h2>리디드 북클럽</h2>
      <AliceCarousel
        mouseTracking
        items={items.map(item => (
          <Box key={item} style={{ width: 130 }}>
            {item}
          </Box>
        ))}
        responsive={{ 0: { items: 3 }, 1024: { items: 3 } }}
        disableDotsControls
      /> */}
      <ReadedFooter />
    </Container>
  );
}

export default Home;

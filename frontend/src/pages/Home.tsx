import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AliceCarousel from 'react-alice-carousel';
import axios from 'axios';
import 'react-alice-carousel/lib/alice-carousel.css';
import Mainpage from '../assets/img/Mainpage.jpg';

const Box = styled.div`
  background-color: #4285f4;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  font-weight: bold;
  width: 150px;
  height: 200px;
  margin: 5px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

interface Book {
  authors: string[];
  contents: string;
  isbn: string;
  thumbnail: string;
  title: string;
}

function Home() {
  const [showImage, setShowImage] = useState(true);
  const items = Array.from({ length: 7 }, (_, i) => i + 1);
  const apikey = 'e1496c3a1b0232c4d6f84d511cf90255';
  const [data, setData] = useState<Book[]>([]);
  const [best, setBest] = useState<Book[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImage(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    axios
      .get<{ documents: Book[] }>(
        `https://dapi.kakao.com/v3/search/book?query=${encodeURIComponent(
          '코난',
        )}`,
        {
          headers: {
            Authorization: `KakaoAK ${apikey}`,
          },
        },
      )
      .then(response => {
        setData(response.data.documents);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    axios
      .get<{ documents: Book[] }>(
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
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>
      {showImage && (
        <img
          src={Mainpage}
          alt="Mainpage"
          style={{ width: '100%', height: '100vh' }}
        />
      )}
      {!showImage && (
        <div>
          <span>홈임</span>
          <br />
          <Link to="/login">불편하다고 하셔서 만든 로그인으로 가는 링크</Link>
          <br />
          <Link to="/profilechange/:userId">
            없으면 서운한 회원 변경하러 가는 링크
          </Link>
          <h2>리디드 Top 10</h2>
          <AliceCarousel
            mouseTracking
            items={data.map((item: Book) => (
              <div key={item.isbn} style={{ width: 130 }}>
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
            items={best.map((item: Book) => (
              <div key={item.isbn} style={{ width: 130 }}>
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
          />
        </div>
      )}
    </>
  );
}

export default Home;

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Grid, Button } from '@mui/material';
import axios from 'axios';

const Container = styled.div`
  padding-left: 20px;
`;

const Info = styled.div`
  font-size: 10px;
  color: gray;
`;

const BookCoverContainer = styled.div``;

const BookCover = styled.div<{ imageUrl: string }>`
  background-color: #beeaea;
  margin: 5px;
  height: 150px;
  background-image: url('${props => props.imageUrl}');
  background-size: cover;
`;

const BookCoverTest = styled.div`
  background-color: #beeaea;
  margin: 5px;
  height: 150px;
`;

const Start = styled(Button)`
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  left: 0;
`;

interface NameData {
  MemberName: string;
}

function Select() {
  const storedData = localStorage.getItem('signupData');
  const signUpData: NameData = storedData
    ? (JSON.parse(storedData) as NameData)
    : {
        MemberName: '',
      };
  const [MemberName] = useState<string>(signUpData.MemberName || '');
  const [bookCovers, setBookCovers] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/select')
      .then(response => {
        setBookCovers(response.data as string[]);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleSignUp = () => {
    window.location.href = '/';
  };

  return (
    <div>
      <Container>
        <h1>읽은 책 기록하기</h1>
        <h3>
          {MemberName} 님이 <br /> 재미있게 읽은 책들을 알려주세요!
        </h3>
        <Info>· 별점을 남길 책을 선택해주세요 </Info>
        <BookCoverContainer>
          <Grid container alignItems="center">
            {bookCovers.map(imageUrl => (
              <Grid item xs={3.5} key={imageUrl}>
                {' '}
                <BookCover imageUrl={imageUrl} />
              </Grid>
            ))}
          </Grid>
        </BookCoverContainer>
        {/* 아래는 테스트코드 */}
        <BookCoverContainer>
          <Grid container alignItems="center">
            <Grid item xs={3.5}>
              <BookCoverTest>책표지</BookCoverTest>
            </Grid>
            <Grid item xs={3.5}>
              <BookCoverTest>책표지</BookCoverTest>
            </Grid>
            <Grid item xs={3.5}>
              <BookCoverTest>책표지</BookCoverTest>
            </Grid>
          </Grid>
          <Grid container alignItems="center">
            <Grid item xs={3.5}>
              <BookCoverTest>책표지</BookCoverTest>
            </Grid>
            <Grid item xs={3.5}>
              <BookCoverTest>책표지</BookCoverTest>
            </Grid>
            <Grid item xs={3.5}>
              <BookCoverTest>책표지</BookCoverTest>
            </Grid>
          </Grid>
          <Grid container alignItems="center">
            <Grid item xs={3.5}>
              <BookCoverTest>책표지</BookCoverTest>
            </Grid>
            <Grid item xs={3.5}>
              <BookCoverTest>책표지</BookCoverTest>
            </Grid>
            <Grid item xs={3.5}>
              <BookCoverTest>책표지</BookCoverTest>
            </Grid>
          </Grid>
          <Grid container alignItems="center">
            <Grid item xs={3.5}>
              <BookCoverTest>책표지</BookCoverTest>
            </Grid>
            <Grid item xs={3.5}>
              <BookCoverTest>책표지</BookCoverTest>
            </Grid>
            <Grid item xs={3.5}>
              <BookCoverTest>책표지</BookCoverTest>
            </Grid>
          </Grid>
          <Grid container alignItems="center">
            <Grid item xs={3.5}>
              <BookCoverTest>책표지</BookCoverTest>
            </Grid>
            <Grid item xs={3.5}>
              <BookCoverTest>책표지</BookCoverTest>
            </Grid>
            <Grid item xs={3.5}>
              <BookCoverTest>책표지</BookCoverTest>
            </Grid>
          </Grid>
        </BookCoverContainer>
      </Container>
      <Start
        variant="contained"
        onClick={handleSignUp}
        style={{ backgroundColor: '#4b8346', color: '#ffffff' }}>
        바로 시작하기
      </Start>
    </div>
  );
}

export default Select;

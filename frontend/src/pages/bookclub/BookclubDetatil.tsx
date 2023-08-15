import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Box, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ScheduleIcon from '@mui/icons-material/Schedule';
import PeopleIcon from '@mui/icons-material/People';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import BackButton from '../../components/common/button/BackButton';

const Container = styled.section`
  padding: 0 var(--padding-global);
`;

const ChangeButton = styled(Button)`
  color: #7aa874;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Info = styled.div`
  display: grid;
  margin-top: 20%;
`;

const Infodetail = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 2%;
`;

const Introduce = styled.div`
  display: grid;
`;

const Members = styled.div`
  display: grid;
`;

const StartButtonContainer = styled(Button)`
  height: 50px;
`;

interface BookClub {
  title: string;
  booktitle: string;
  contexts: string;
  coverImage: string;
  time: Date;
  duration: number;
  participant_count: number;
  participants: [];
  is_public: boolean;
}

function BookClubDetail() {
  const { bookclubId } = useParams();
  const [data, setData] = useState<BookClub | null>(null);
  let date = '';
  let start = '';
  let end = '';
  if (data?.time) {
    const year = data?.time.getFullYear();
    const month = (data.time.getMonth() + 1).toString().padStart(2, '0');
    const day = data?.time.getDate().toString().padStart(2, '0');
    const hours = data?.time.getHours().toString().padStart(2, '0');
    const minutes = data?.time.getMinutes().toString().padStart(2, '0');
    const endTime = new Date(data.time);
    endTime.setMinutes(endTime.getMinutes() + data?.duration);
    const endhours = endTime.getHours().toString().padStart(2, '0');
    const endminutes = endTime.getMinutes().toString().padStart(2, '0');
    date = `${year}.${month}.${day}`;
    start = `${hours}:${minutes}`;
    end = `${endhours}:${endminutes}`;
  }

  const navigate = useNavigate();
  const handleBookClubChange = (bookclubId: number) => {
    navigate(`/bookclub/detail/${bookclubId}`);
  };

  const handleSubmit = () => {
    window.location.href = `/bookclub/waiting/${bookclubId}`;
  };

  useEffect(() => {
    axios
      .get<{ data: BookClub }>(
        `https://i9a507.p.ssafy.io/api/bookclubs/${bookclubId}`,
      )
      .then(response => {
        setData(response.data.data);
      })
      .catch(() => {});
  }, []);

  return (
    <Container>
      <Header>
        <BackButton />
        <Link to={`/bookclub/change/${bookclubId}`}>
          <ChangeButton>
            <h3>정보 수정</h3>
          </ChangeButton>
        </Link>
      </Header>
      <Box
        onClick={() => handleBookClubChange(1)}
        sx={{
          display: 'flex',
          border: 'none',
          boxShadow: 'none',
        }}>
        <CardMedia
          component="img"
          sx={{ width: 130 }}
          src={data?.coverImage}
          style={{ margin: '5%' }}
        />
        <CardContent sx={{ flex: '1 0 auto' }}>
          <h5> {data?.is_public ? '공개' : '비공개'}</h5>
          <h2> {data?.title}</h2>
          <h4> {data?.booktitle}</h4>
          <Info>
            <Infodetail>
              <CalendarTodayIcon />
              <p> {date}</p>
            </Infodetail>
            <Infodetail>
              <ScheduleIcon />
              <p>
                {' '}
                {start}~{end}
              </p>
            </Infodetail>
            <Infodetail>
              <PeopleIcon />
              <p>
                {data?.participants.length}명 / {data?.participant_count}명
              </p>
            </Infodetail>
          </Info>
        </CardContent>
      </Box>
      <Divider sx={{ marginBottom: '5%' }} />
      <Introduce>
        <h2>북클럽 소개</h2>
        <br />
        <h4>{data?.contexts}</h4>
        <Divider sx={{ marginTop: '5%', marginBottom: '5%' }} />
      </Introduce>
      <Members>
        <h2>멤버</h2>
        <Grid container alignItems="center">
          <Grid item xs={6}>
            (대충프로필사진) 코난
          </Grid>
          <Grid item xs={6}>
            (대충프로필사진) 남도일
          </Grid>
          <Grid item xs={6}>
            (대충프로필사진) 김전일
          </Grid>
          <Grid item xs={6}>
            (대충프로필사진) 셜록홈즈
          </Grid>
        </Grid>
      </Members>
      <StartButtonContainer
        variant="contained"
        style={{
          position: 'absolute',
          maxWidth: 'var(--screen-size-mobile)',
          width: '100%',
          bottom: '0',
          left: '0',
          background: '#4B8346',
          color: 'white',
        }}
        onClick={handleSubmit}>
        북클럽 시작하기
      </StartButtonContainer>
    </Container>
  );
}

export default BookClubDetail;

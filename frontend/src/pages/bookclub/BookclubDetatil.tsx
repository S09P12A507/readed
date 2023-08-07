import styled from 'styled-components';
import { Button, IconButton, Box, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ScheduleIcon from '@mui/icons-material/Schedule';
import PeopleIcon from '@mui/icons-material/People';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Divider from '@mui/material/Divider';
import testimg from '../../assets/img/test.jpg';

const CreateButton = styled(Button)`
  color: #7aa874;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BackButtonContainer = styled.div`
  position: flex;
  left: 5px;
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

function BackButton() {
  return (
    <BackButtonContainer>
      <Link to="/bookclub">
        <IconButton style={{ color: 'gray', fontSize: '14px' }}>
          <ArrowBackIcon /> 이전으로
        </IconButton>
      </Link>
    </BackButtonContainer>
  );
}

function BookClubDetail() {
  const navigate = useNavigate();

  const handleBookClubClick = (bookClubId: number) => {
    navigate(`/bookclub/detail/${bookClubId}`);
  };

  const handleSubmit = () => {
    window.location.href = '/bookclub/waiting/Namiya';
  };

  return (
    <div>
      <Header>
        <BackButton />
        <Link to="/bookclub/create">
          <CreateButton>
            <h3>정보 수정</h3>
          </CreateButton>
        </Link>
      </Header>
      <Box
        onClick={() => handleBookClubClick(1)}
        sx={{
          display: 'flex',
          border: 'none',
          boxShadow: 'none',
        }}>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          src={testimg}
          style={{ margin: '5%' }}
        />
        <CardContent sx={{ flex: '1 0 auto' }}>
          <h5> 공개 모임일걸?</h5>
          <h2>북클럽 제목임</h2>
          <h4>잡화점 용의자의 나미야</h4>
          <Info>
            {' '}
            <Infodetail>
              <CalendarTodayIcon />
              <p style={{ marginLeft: '5px' }}>2099.12.31</p>
            </Infodetail>
            <Infodetail>
              <ScheduleIcon />
              <p> 01:00~23:59</p>
            </Infodetail>
            <Infodetail>
              <PeopleIcon />
              <p>2명 / 669957명</p>
            </Infodetail>
          </Info>
        </CardContent>
      </Box>
      <Divider sx={{ marginBottom: '5%' }} />
      <Introduce>
        <h2>북클럽 소개</h2>
        <br />
        <h4>
          우리 북클럽은 잡화점 용의자의 나미야를 읽고 누가 범인인지 토론합니다.
          시간은 저녁에 해요. 사람은 많을수록 좋아요. 내일 진행하구요 우리
          북클럽은 잡화점 용의자의 나미야를 읽고 누가 범인인지 토론합니다.
          시간은 저녁에 해요. 사람은 많을수록 좋아요. 내일 진행하구요우리
          북클럽은 잡화점 용의자의 나미야를 읽고 누가 범인인지 토론합니다.
          시간은 저녁에 해요. 사람은 많을수록 좋아요. 내일 진행하구요우리
          북클럽은 잡화점 용의자의 나미야를 읽고 누가 범인인지 토론합니다.
          시간은 저녁에 해요. 사람은 많을수록 좋아요. 내일 진행하구요 범인을
          잡아봅시다
        </h4>
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
          width: 'var(--screen-size-mobile)',
          bottom: '0',
          left: '0',
          background: '#4B8346',
          color: 'white',
        }}
        onClick={handleSubmit}>
        북클럽 시작하기
      </StartButtonContainer>
    </div>
  );
}

export default BookClubDetail;

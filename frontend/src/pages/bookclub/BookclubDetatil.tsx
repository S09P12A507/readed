import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Box, Grid } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ScheduleIcon from '@mui/icons-material/Schedule';
import PeopleIcon from '@mui/icons-material/People';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
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
  bookTitle: string;
  context: string;
  bookCoverImageUrl: string;
  startTime: Date;
  endTime: Date;
  participantCount: number;
  memberList: {
    memberNickname: string;
    memberProfileImage: string;
  }[];
  is_public: boolean;
  isJoined: boolean;
}

function BookClubDetail() {
  const token: string | null = useSelector(
    (state: RootState) => state.auth.accessToken,
  );

  const { bookclubId } = useParams();
  const [data, setData] = useState<BookClub | null>(null);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [registerd, setRegisterd] = useState<boolean>(false);

  const navigate = useNavigate();
  const handleBookClubChange = () => {
    navigate(`/bookclub/detail/${bookclubId as string}`);
  };

  const handleSubmit = () => {
    if (token) {
      axios
        .get<{ data: BookClub }>(
          `https://i9a507.p.ssafy.io/api/bookclubs/join/${
            bookclubId as string
          }`,
          {
            headers: {
              'X-READED-ACCESSTOKEN': token,
            },
          },
        )
        .then(response => {
          console.log(response.data.data);
        })
        .catch(() => {});
    }
  };
  const handleunRegisterd = () => {
    if (token) {
      axios
        .delete(
          `https://i9a507.p.ssafy.io/api/bookclubs/leave/${
            bookclubId as string
          }`,
          {
            headers: {
              'X-READED-ACCESSTOKEN': token,
            },
          },
        )
        .then(response => {
          setRegisterd(false);
          console.log(response.data);
        })
        .catch(() => {});
    }
  };
  useEffect(() => {
    if (token) {
      axios
        .get<{ data: BookClub }>(
          `https://i9a507.p.ssafy.io/api/bookclubs/${bookclubId as string}`,
          {
            headers: {
              'X-READED-ACCESSTOKEN': token,
            },
          },
        )
        .then(response => {
          setData(response.data.data);
          setRegisterd(response.data.data.isJoined);
          console.log(response.data.data);
        })
        .catch(() => {});
    }
  }, [bookclubId, token]);

  useEffect(() => {
    if (data) {
      const endTime = new Date(data.endTime);
      const intervalId = setInterval(() => {
        const currentTime = new Date();
        const timeDiff = endTime.getTime() - currentTime.getTime();
        setRemainingTime(timeDiff);
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [data]);

  const formatTime = (timeInSeconds: number) => {
    const day = Math.floor(timeInSeconds / 86400);
    const hours = Math.floor(timeInSeconds / 3600 - day * 24);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${day}일 ${hours}시 ${minutes
      .toString()
      .padStart(2, '0')}분 ${seconds.toString().padStart(2, '0')}초`;
  };

  return (
    <Container>
      <Header>
        <BackButton />
        <Link to={`/bookclub/change/${bookclubId as string}`}>
          <ChangeButton>
            <h3>정보 수정</h3>
          </ChangeButton>
        </Link>
      </Header>
      <Box
        onClick={() => handleBookClubChange()}
        sx={{
          display: 'flex',
          border: 'none',
          boxShadow: 'none',
        }}>
        <CardMedia
          component="img"
          sx={{ width: 130 }}
          src={data?.bookCoverImageUrl}
          style={{ margin: '5%' }}
        />
        <CardContent sx={{ flex: '1 0 auto' }}>
          <h5> {data?.is_public ? '비공개' : '공개'}</h5>
          <h2>
            {data && data?.title && data?.title.length > 8
              ? `${data?.title.slice(0, 8)}...`
              : data?.title}
          </h2>
          <h4>
            {' '}
            {data && data?.bookTitle && data?.bookTitle.length > 10
              ? `${data?.bookTitle.slice(0, 16)}...`
              : data?.bookTitle}
          </h4>
          <Info>
            <Infodetail>
              <CalendarTodayIcon />
              <p>
                {data?.startTime &&
                  new Date(data?.startTime).toLocaleDateString('ko-KR')}
              </p>
            </Infodetail>
            {data?.startTime && data?.endTime && (
              <Infodetail>
                <ScheduleIcon />
                <p>
                  {new Date(data.startTime).toLocaleTimeString('ko-KR', {
                    timeZone: 'Asia/Seoul',
                    hour12: false,
                    hour: '2-digit',
                    minute: '2-digit',
                  })}{' '}
                  ~{' '}
                  {new Date(data.endTime).toLocaleTimeString('ko-KR', {
                    timeZone: 'Asia/Seoul',
                    hour12: false,
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </Infodetail>
            )}
            <Infodetail>
              <PeopleIcon />
              <p>
                {data?.memberList.length}명 / {data?.participantCount}명
              </p>
            </Infodetail>
          </Info>
        </CardContent>
      </Box>
      <Divider sx={{ marginBottom: '5%' }} />
      <Introduce>
        <h2>북클럽 소개</h2>
        <br />
        <h4>{data?.context}</h4>
        <Divider sx={{ marginTop: '5%', marginBottom: '5%' }} />
      </Introduce>
      <Members>
        <h2 style={{ marginBottom: '1rem' }}>멤버</h2>
        <Grid container alignItems="center">
          {data?.memberList.map(member => (
            <Grid
              item
              xs={6}
              style={{ display: 'flex', alignItems: 'center' }}
              key={member.memberNickname}>
              <img
                src={member.memberProfileImage}
                alt={`${member.memberNickname} 이미지`}
                style={{
                  width: '4rem',
                  height: '4rem',
                  borderRadius: '100%',
                  marginRight: '1rem',
                }}
              />
              {member.memberNickname}
            </Grid>
          ))}
        </Grid>
      </Members>
      {registerd ? (
        <StartButtonContainer
          variant="contained"
          style={{
            position: 'absolute',
            maxWidth: 'var(--screen-size-mobile)',
            width: '100%',
            bottom: '0',
            left: '0',
            background: '#FF6D75',
            color: 'white',
          }}
          onClick={handleunRegisterd}>
          {remainingTime !== null &&
            remainingTime > 0 &&
            `북클럽 참여 취소 (${formatTime(
              Math.floor(remainingTime / 1000),
            )} 남음)`}
        </StartButtonContainer>
      ) : (
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
          {remainingTime !== null && remainingTime > 0
            ? `북클럽 참여하기 (${formatTime(
                Math.floor(remainingTime / 1000),
              )} 남음)`
            : '북클럽 접속하기'}
        </StartButtonContainer>
      )}
    </Container>
  );
}

export default BookClubDetail;

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ScheduleIcon from '@mui/icons-material/Schedule';
import PeopleIcon from '@mui/icons-material/People';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const Container = styled.section`
  padding: 0 var(--padding-global);
`;

const CreateButton = styled(Button)`
  color: #7aa874;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Search = styled.div`
  position: relative;
  background-color: #f5f5f5;
  border-radius: 10%;
  margin-left: 0;
  width: 100%;
`;

const SearchIconWrapper = styled.div`
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 4px;
`;

const StyledInputBase = styled(InputBase)`
  margin-left: 40px;
  width: calc(100% - 40px);
  color: inherit;
`;

const BookClubList = styled.div`
  display: grid;
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

interface BookClub {
  roomId: number;
  title: string;
  booktitle: string;
  contexts: string;
  coverImage: string;
  time: Date;
  duration: number;
  participant_count: number;
  participants: [];
  is_public: boolean;
  meetingpw: string;
}

function Bookclub() {
  const token: string | null = useSelector(
    (state: RootState) => state.auth.accessToken,
  );

  const [data, setData] = useState<BookClub[]>([]);

  const navigate = useNavigate();

  const handleBookClubClick = (bookclubId: number) => {
    navigate(`/bookclub/detail/${bookclubId}`);
  };

  useEffect(() => {
    if (token) {
      axios
        .get<{ data: BookClub[] }>('https://i9a507.p.ssafy.io/api/bookclubs', {
          headers: {
            'X-READED-ACCESSTOKEN': token,
          },
        })
        .then(response => {
          console.log(response.data.data);
          setData(response.data.data);
        })
        .catch(() => {});
    }
  }, [token]);

  return (
    <Container>
      <Header>
        <h1>리디드 북클럽</h1>
        <Link to="/bookclub/create">
          <CreateButton>
            <h3>북클럽 생성</h3>
          </CreateButton>
        </Link>
      </Header>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase placeholder="관심있는 북클럽을 검색해보세요" />
      </Search>

      <BookClubList>
        {data.map((bookclub: BookClub) => (
          <Card
            onClick={() => handleBookClubClick(bookclub.roomId)}
            sx={{ display: 'flex', margin: '2%' }}
            key={bookclub.roomId}>
            <CardMedia
              component="img"
              sx={{ width: 130 }}
              src={bookclub.coverImage}
              style={{ margin: '5%' }}
            />
            <CardContent sx={{ flex: '1 0 auto' }}>
              <h6>{bookclub.is_public ? '비공개' : '공개'}</h6>
              <h2>{bookclub.title}</h2>
              <h5>{bookclub.booktitle}</h5>
              <Info>
                <Infodetail>
                  <CalendarTodayIcon />
                  <p> {new Date(bookclub.time).toLocaleDateString('ko-KR')} </p>
                </Infodetail>
                {bookclub.time && (
                  <Infodetail>
                    <ScheduleIcon />
                    <p>
                      {/* {new Date(
                        bookclub.time.getTime() + bookclub.duration,
                      ).toLocaleTimeString('en-US', {
                        hour12: false,
                        hour: '2-digit',
                        minute: '2-digit',
                      })} */}
                    </p>
                  </Infodetail>
                )}

                <Infodetail>
                  <PeopleIcon />
                  {bookclub.participants && bookclub.participants.length}명 /{' '}
                  {bookclub.participant_count}명
                </Infodetail>
              </Info>
            </CardContent>
            {bookclub.booktitle}
          </Card>
        ))}
      </BookClubList>
    </Container>
  );
}

export default Bookclub;

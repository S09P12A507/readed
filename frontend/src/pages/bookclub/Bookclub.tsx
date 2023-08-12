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
import testimg from '../../assets/img/test.jpg';

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

function Bookclub() {
  const navigate = useNavigate();

  const handleBookClubClick = (bookClubId: number) => {
    navigate(`/bookclub/detail/${bookClubId}`);
  };

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
        {Array.from({ length: 10 }).map(() => (
          <Card
            onClick={() => handleBookClubClick(1)}
            sx={{ display: 'flex', margin: '2%' }}
            key={Math.random()}>
            <CardMedia
              component="img"
              sx={{ width: 130 }}
              src={testimg}
              style={{ margin: '5%' }}
            />
            <CardContent sx={{ flex: '1 0 auto' }}>
              <h6> 공개 모임일걸?</h6>
              <h2>북클럽 제목임</h2>
              <h5>잡화점 용의자의 나미야</h5>
              <Info>
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
          </Card>
        ))}
      </BookClubList>
    </Container>
  );
}

export default Bookclub;

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {
  SelectChangeEvent,
  TextField,
  Select,
  MenuItem,
  Button,
  Switch,
  Modal,
  InputBase,
  Grid,
} from '@mui/material';
import { useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { RootState } from '../../store/store';
import Alerts from '../../components/common/alert/Alert';
import BackButton from '../../components/common/button/BackButton';

const Container = styled.section`
  padding: 0 var(--padding-global);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const CoverContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
`;

const MakeButtonContainer = styled(Button)`
  height: 50px;
`;

const SecretContainer = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FindBook = styled(Button)`
  height: 250px;
  width: 40%;
  margin-bottom: 20px;
`;

const ModalCloseButton = styled(Button)`
  position: absolute;
  top: 5px;
`;

const ModalUpper = styled.div``;

const Search = styled.div`
  position: relative;
  background-color: #f5f5f5;
  border-radius: 10%;
  margin-left: 5%;
  width: 90%;
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

interface Book {
  bookId: number;
  coverImage: string;
  bookTitle: string;
}

function BookclubCreate() {
  const [meetingTitle, setMeetingTitle] = useState('');
  const [selectedInterval, setSelectedInterval] = useState(15);
  const [selectedpeople, setSelectedPeople] = useState(2);
  const [bookclubIntro, SetBookclubIntro] = useState<string>('');
  const [isPublic, setIsPublic] = useState(true);
  const [meetingpw, setMeetingpw] = useState('');
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [showAlert, setShowAlert] = useState(false);
  const todays = dayjs().startOf('minute');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [query, setQuery] = useState<string>('');
  const [data, setData] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const token: string | null = useSelector(
    (state: RootState) => state.auth.accessToken,
  );

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMeetingTitle(event.target.value);
  };

  const handleIntervalChange = (event: SelectChangeEvent<number>) => {
    setSelectedInterval(Number(event.target.value));
  };

  const handlePeopleChange = (event: SelectChangeEvent<number>) => {
    setSelectedPeople(Number(event.target.value));
  };

  const handleIntroChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    SetBookclubIntro(event.target.value);
  };

  const handlePublicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPublic(event.target.checked);
  };

  const handleDateChange = (newDate: dayjs.Dayjs | null) => {
    setSelectedDate(dayjs(newDate));
  };

  const handleFindBook = () => {
    setShowModal(true);
  };

  const handleSelectdBook = (book: Book) => {
    setSelectedBook(book);
    setShowModal(false);
  };

  const handleMeetingpw = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMeetingpw(event.target.value);
  };

  const handleSubmit = () => {
    if (
      !meetingTitle ||
      !selectedDate ||
      !selectedInterval ||
      !selectedpeople ||
      !bookclubIntro
    ) {
      setMessage('입력하지 않은 항목이 있어요!');
      setShowAlert(true);
      return;
    }

    if (selectedBook) {
      const formData = {
        bookId: selectedBook.bookId,
        title: meetingTitle,
        description: bookclubIntro,
        startTime: selectedDate.toDate(),
        duration: selectedInterval,
        maxMember: selectedpeople,
        isPublic,
        password: meetingpw,
      };
      if (token) {
        axios
          .post('https://i9a507.p.ssafy.io/api/bookclubs', formData, {
            headers: {
              'X-READED-ACCESSTOKEN': `${token}`,
            },
          })
          .then(() => {
            setMessage('정상적으로 등록되었습니다!');
            setShowAlert(true);
          })
          .catch(() => {
            setMessage('잠시 후 다시 시도해주세요!');
            setShowAlert(true);
          });
      }
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false);

    if (message === '정상적으로 등록되었습니다!') {
      window.location.href = '/bookclub';
    }
  };

  useEffect(() => {
    if (query) {
      axios
        .get<{ data: Book[] }>(
          `https://i9a507.p.ssafy.io/api/search?kw=${encodeURIComponent(
            query,
          )}`,
          {
            headers: {
              'X-READED-ACCESSTOKEN': token,
            },
          },
        )
        .then(response => {
          setData(response.data.data);
        })
        .catch(() => {});
    }
  }, [query, token]);

  return (
    <Container>
      <BackButton />
      <Header>
        <h1>북클럽 생성</h1>
      </Header>
      <CoverContainer>
        {selectedBook ? (
          <img
            style={{ height: '250px', width: '40%' }}
            src={selectedBook.coverImage}
            alt={selectedBook.bookTitle}
            onClick={handleFindBook}
          />
        ) : (
          <FindBook
            onClick={handleFindBook}
            style={{
              background: 'rgba(0, 0, 0, 0.12)',
              fontSize: '5rem',
              color: 'rgba(0, 0, 0, 0.38)',
            }}>
            +
          </FindBook>
        )}
        <h3>{selectedBook ? selectedBook.bookTitle : '책을 선택해주세요'}</h3>
      </CoverContainer>
      <ContentContainer>
        <h4> 모임 제목</h4>
        <TextField
          variant="standard"
          placeholder="모임 제목을 입력하세요"
          value={meetingTitle}
          onChange={handleTitleChange}
          style={{
            width: '80%',
          }}
        />
      </ContentContainer>
      <ContentContainer>
        <h4> 날짜/시간</h4>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="zh-cn">
          <DemoContainer components={['DateTimePicker']} sx={{ width: '80%' }}>
            <DateTimePicker
              minDateTime={todays}
              value={selectedDate}
              onChange={handleDateChange}
            />
          </DemoContainer>
        </LocalizationProvider>
      </ContentContainer>
      <ContentContainer>
        <h4> 진행 시간</h4>
        <Select
          value={selectedInterval}
          onChange={handleIntervalChange}
          style={{
            width: '80%',
          }}>
          <MenuItem value={15}>15분</MenuItem>
          <MenuItem value={30}>30분</MenuItem>
          <MenuItem value={45}>45분</MenuItem>
          <MenuItem value={60}>60분</MenuItem>
          <MenuItem value={75}>75분</MenuItem>
          <MenuItem value={90}>90분</MenuItem>
          <MenuItem value={105}>105분</MenuItem>
          <MenuItem value={120}>120분</MenuItem>
        </Select>
      </ContentContainer>
      <ContentContainer>
        <h4> 모집 인원</h4>
        <Select
          value={selectedpeople}
          onChange={handlePeopleChange}
          style={{
            width: '80%',
          }}>
          <MenuItem value={2}>2명</MenuItem>
          <MenuItem value={3}>3명</MenuItem>
          <MenuItem value={4}>4명</MenuItem>
          <MenuItem value={5}>5명</MenuItem>
          <MenuItem value={6}>6명</MenuItem>
        </Select>
      </ContentContainer>
      <ContentContainer>
        <h4> 모임 소개</h4>
        <TextField
          variant="outlined"
          value={bookclubIntro}
          onChange={handleIntroChange}
          margin="dense"
          multiline
          placeholder="북클럽에 대해 소개해주세요"
          rows={3}
          style={{ width: '80%' }}
        />
      </ContentContainer>
      <SwitchContainer>
        <h4>공개 설정</h4>
        <Switch checked={isPublic} onChange={handlePublicChange} />
        {isPublic && <h4>공개</h4>}
        {!isPublic && (
          <SecretContainer>
            <h4>비공개</h4>
            <TextField
              variant="standard"
              placeholder="비밀번호를 입력하세요"
              onChange={handleMeetingpw}
              value={meetingpw}
            />
          </SecretContainer>
        )}
      </SwitchContainer>
      <MakeButtonContainer
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
        북클럽 만들기
      </MakeButtonContainer>
      <Alerts open={showAlert} onClose={handleAlertClose} message={message} />

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <div
          style={{
            display: 'grid',
            height: '100%',
            backgroundColor: 'white',
            maxWidth: 'var(--screen-size-mobile)',
            width: '100%',
            overflow: 'auto',
          }}>
          <ModalUpper>
            <ModalCloseButton
              startIcon={<CloseIcon />}
              onClick={() => setShowModal(false)}
              style={{
                left: '2%',
                margin: '2%',
                fontWeight: 'bold',
                fontSize: '1rem',
              }}>
              닫기
            </ModalCloseButton>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="관심있는 책을 검색해보세요"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </Search>
          </ModalUpper>
          <Grid container alignItems="center" style={{ margin: '1rem' }}>
            {data.map((item: Book) => (
              <Grid
                item
                xs={3.8}
                key={item.bookId}
                onClick={() => handleSelectdBook(item)}>
                <img width={150} src={item.coverImage} alt={item.bookTitle} />
                <p>{item.bookTitle}</p>
              </Grid>
            ))}
          </Grid>
        </div>
      </Modal>
    </Container>
  );
}

export default BookclubCreate;

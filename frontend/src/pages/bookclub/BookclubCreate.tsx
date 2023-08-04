import { useState } from 'react';
import styled from 'styled-components';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {
  SelectChangeEvent,
  TextField,
  IconButton,
  Select,
  MenuItem,
  Button,
  Switch,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Alerts from '../../components/common/alert/Alert';
import testimg from '../../assets/img/test.jpg';

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const BackButtonContainer = styled.div`
  position: absolute;
  left: 5px;
`;

const CoverContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  height: 250px;
  width: auto;
  margin-bottom: 20px;
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

function BookclubCreate() {
  const [meetingTitle, setMeetingTitle] = useState('');
  const [selectedInterval, setSelectedInterval] = useState(15);
  const [selectedpeople, setSelectedPeople] = useState(2);
  const [bookclubIntro, SetBookclubIntro] = useState<string>('');
  const [isPublic, setIsPublic] = useState(true);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [showAlert, setShowAlert] = useState(false);
  const todays = dayjs().startOf('minute');
  const [message, setMessage] = useState('');

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

  const handleSubmit = () => {
    console.log(selectedDate?.toDate());
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
    setMessage('정상적으로 등록되었습니다!');
    setShowAlert(true);
  };

  const handleAlertClose = () => {
    setShowAlert(false);

    if (message === '정상적으로 등록되었습니다!') {
      window.location.href = '/bookclub';
    }
  };

  return (
    <>
      <Header>
        <BackButton />
        <h1>북클럽 생성</h1>
      </Header>
      <CoverContainer>
        <Image src={testimg} alt="북클럽 이미지" />
        <h3> 나미야 뭐시깽이</h3>
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
            <TextField variant="standard" placeholder="비밀번호를 입력하세요" />
          </SecretContainer>
        )}
      </SwitchContainer>
      <MakeButtonContainer
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
        북클럽 만들기
      </MakeButtonContainer>
      <Alerts open={showAlert} onClose={handleAlertClose} message={message} />
    </>
  );
}

export default BookclubCreate;

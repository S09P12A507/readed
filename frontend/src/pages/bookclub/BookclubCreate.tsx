import { useState } from 'react';
import styled from 'styled-components';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
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

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  height: 300px;
  width: auto;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
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
  const [selectedDate, setSelectedDate] = useState('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMeetingTitle(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div>
      <Header>
        <BackButton />
        <h1>북클럽 생성</h1>
      </Header>
      <ContentContainer>
        <Image src={testimg} alt="북클럽 이미지" />
        <p> 책 제목 : 나미야 뭐시깽이</p>
        <Input
          type="text"
          placeholder="모임 제목을 입력하세요"
          value={meetingTitle}
          onChange={handleTitleChange}
        />
        <Input
          type="datetime-local"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </ContentContainer>
    </div>
  );
}

export default BookclubCreate;

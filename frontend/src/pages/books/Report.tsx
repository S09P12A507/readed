import { useState, useEffect } from 'react';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import { Button, TextField, Switch } from '@mui/material';
import axios from 'axios';
import Divider from '@mui/material/Divider';

const CloseButton = styled(Button)`
  position: absolute;
  top: 5px;
`;

const ApplyButton = styled(Button)`
  position: absolute;
  top: 5px;
  right: 3%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled(TextField)`
  display: 'flex';
  text-align: center;
`;

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
`;

interface NameData {
  MemberName: string;
}

function Report() {
  const storedData = localStorage.getItem('signupData');
  const signUpData: NameData = storedData
    ? (JSON.parse(storedData) as NameData)
    : {
        MemberName: '',
      };
  const [isPageLoaded, setIsPageLoaded] = useState(true);
  const [MemberName] = useState<string>(signUpData.MemberName || '');
  const [bookCovers, setBookCovers] = useState<string[]>([]);
  const [inputText, setInputText] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  const handleCloseModal = () => {
    setInputText('');
  };

  const handlePublicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPublic(event.target.checked);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    if (inputValue.length > 300) {
      return;
    }
    setInputText(inputValue);
  };

  const handleSaveButton = () => {
    console.log('Input Text:', inputText);
  };

  useEffect(() => {
    if (isPageLoaded) {
      axios
        .get('http://localhost:8080/api/select')
        .then(response => {
          setBookCovers(response.data as string[]);
        })
        .catch(error => {
          console.log(error);
        });
    }
    setIsPageLoaded(false);
  }, [isPageLoaded]);

  return (
    <div style={{ padding: '3%' }}>
      <Header>
        <CloseButton
          startIcon={<CloseIcon />}
          onClick={handleCloseModal}
          style={{
            left: '2%',
            margin: '2%',
            fontWeight: 'bold',
            fontSize: '1.1rem',
          }}>
          닫기
        </CloseButton>
        <p> 여기엔 책이름을 넣어보자</p>
        <ApplyButton
          onClick={handleSaveButton}
          style={{
            color: '#7aa874',
            fontWeight: 'bold',
            fontSize: '1.1rem',
          }}>
          등록
        </ApplyButton>
      </Header>
      <Divider />
      <Title
        variant="standard"
        placeholder="제목"
        style={{ width: '100%', height: '60px' }}
        InputProps={{
          endAdornment: (
            <SwitchContainer>
              <p style={{ width: '4rem' }}>{isPublic ? '공개' : '비공개'}</p>
              <Switch checked={isPublic} onChange={handlePublicChange} />
            </SwitchContainer>
          ),
        }}
      />

      <TextField
        value={inputText}
        onChange={handleInputChange}
        placeholder="책을 읽고 느낀 감상을 기록해요."
        variant="standard"
        multiline
        rows={25}
        style={{
          width: '96%',
          flexWrap: 'wrap',
        }}
        InputProps={{
          disableUnderline: true,
        }}
      />
    </div>
  );
}

export default Report;

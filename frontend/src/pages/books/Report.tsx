import { useState } from 'react';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import { Button, TextField, Switch } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Divider from '@mui/material/Divider';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import AlertsModal from '../../components/common/alert/Alert';

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

// interface NameData {
//   MemberName: string;
// }

function Report() {
  // const storedData = localStorage.getItem('signupData');
  // const signUpData: NameData = storedData
  //   ? (JSON.parse(storedData) as NameData)
  //   : {
  //       MemberName: '',
  //     };
  // const [MemberName] = useState<string>(signUpData.MemberName || '');
  const [titles, setTitles] = useState('');
  const [inputText, setInputText] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const { bookId } = useParams();
  const bookname = bookId as string;
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState('');

  const token: string | null = useSelector(
    (state: RootState) => state.auth.accessToken,
  );

  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  const handlePublicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPublic(event.target.checked);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitles(event.target.value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    if (inputValue.length > 300) {
      return;
    }
    setInputText(inputValue);
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const handleSaveButton = () => {
    const formData = {
      title: titles,
      content: inputText,
      isPublic,
    };

    if (token) {
      axios
        .post('http://localhost:8080/api/report/1', formData, {
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

    if (message === '정상적으로 등록되었습니다!') {
      navigate(-1);
    }
  };

  return (
    <div style={{ padding: '3%' }}>
      <Header>
        <CloseButton
          startIcon={<CloseIcon />}
          onClick={handleClose}
          style={{
            fontWeight: 'bold',
            fontSize: '1rem',
          }}>
          닫기
        </CloseButton>
        <h2>
          {' '}
          {bookname.length > 10 ? `${bookname.slice(0, 10)}...` : bookname}
        </h2>
        <ApplyButton
          onClick={handleSaveButton}
          style={{
            color: '#7aa874',
            fontWeight: 'bold',
            fontSize: '1rem',
          }}>
          등록
        </ApplyButton>
      </Header>
      <Divider />
      <Title
        value={titles}
        onChange={handleTitleChange}
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
      <AlertsModal
        open={showAlert}
        onClose={handleAlertClose}
        message={message}
      />
    </div>
  );
}

export default Report;

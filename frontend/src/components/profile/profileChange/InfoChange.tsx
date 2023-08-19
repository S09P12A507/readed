import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TextField, Button, Grid } from '@mui/material';
import axios from 'axios';
import { RootState } from '../../../store/store';
import AlertsModal from '../../common/alert/Alert';
import basic from '../../../assets/img/non.png';

const ImageContainer = styled.div`
  text-align: center;
  max-width: 500px;
  max-height: 200px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImg = styled.img`
  max-width: 500px;
  max-height: 200px;
  display: table-cell;
  vertical-align: middle;
`;

const IntroduceForm = styled(TextField)`
  width: 100%;
`;

const AuthButton = styled(Button)`
  width: 20%;
  height: 56px;
`;

interface UserInfo {
  nickname: string;
  profileImage: string;
  profileBio: string;
}

function InfoChange() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [ProfileImage, setprofileimage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string>('');
  const [ProfileBio, setprofilebio] = useState<string | null>('');
  const [nicknameExists, setNicknameExists] = useState<boolean>(false);

  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState('');

  const token: string | null = useSelector(
    (state: RootState) => state.auth.accessToken,
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setprofileimage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false);

    if (message === '회원 정보가 변경됐습니다!') {
      window.location.href = '/main';
    }
  };

  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/');
  };
  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!userInfo) return;
    setNickname(event.target.value);
    setNicknameExists(false);
  };

  const handleIntroChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setprofilebio(event.target.value);
  };

  const handleInfoChange = () => {
    if (nicknameExists) {
      const InfoData = {
        nickname,
        profileBio: ProfileBio,
      };
      const InfoDataJson = JSON.stringify(InfoData);
      const formData = new FormData();
      formData.append(
        'requestDto',
        new Blob([InfoDataJson], { type: 'application/json' }),
      );
      if (ProfileImage) {
        formData.append('profileImage', ProfileImage);
      }

      if (token) {
        axios
          .patch('https://i9a507.p.ssafy.io/api/members/profile', formData, {
            headers: {
              'X-READED-ACCESSTOKEN': token,
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(() => {
            setMessage('회원 정보가 변경됐습니다!');
            setShowAlert(true);
          })
          .catch(() => {});
      }
    }
  };

  const handleVerify = () => {
    axios
      .get(
        `https://i9a507.p.ssafy.io/api/auth/check-nickname-duplicate?nickname=${nickname}`,
      )
      .then(response => {
        if (response.status >= 200 && response.status <= 299) {
          setNicknameExists(true);
          setMessage('중복 확인되었습니다.');
          setShowAlert(true);
        } else {
          setNicknameExists(false);
          setMessage('중복된 닉네임입니다.');
          setShowAlert(true);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (token) {
      axios
        .get<{ data: UserInfo }>(
          `https://i9a507.p.ssafy.io/api/members/profile?id=`,
          {
            headers: {
              'X-READED-ACCESSTOKEN': token,
            },
          },
        )
        .then(response => {
          setUserInfo(response.data.data);
          console.log(response.data.data);
        })
        .catch(() => {});
    }
  }, [token]);

  useEffect(() => {
    if (userInfo) {
      setNickname(userInfo.nickname);
      setprofilebio(userInfo.profileBio);
      setPreviewUrl(userInfo.profileImage);
    }
  }, [userInfo]);
  return (
    <div>
      {userInfo ? (
        <div>
          <h2 style={{ display: 'flex', justifyContent: 'center' }}>
            {' '}
            프로필 이미지 수정
          </h2>
          <ImageContainer>
            <label htmlFor="fileInput">
              {previewUrl ? (
                <ProfileImg src={previewUrl} alt="프로필 미리보기" />
              ) : (
                <ProfileImg src={basic} alt="기본 이미지" />
              )}
            </label>
            <input
              type="file"
              id="fileInput"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </ImageContainer>

          <Grid container alignItems="center">
            <Grid item xs={9.9}>
              <IntroduceForm
                label="닉네임"
                variant="outlined"
                value={nickname}
                onChange={handleNicknameChange}
                margin="dense"
                InputProps={{
                  style: {
                    backgroundColor: '#f5f5f5',
                  },
                }}
              />
            </Grid>
            <Grid item xs={1}>
              <AuthButton
                variant="contained"
                color="primary"
                onClick={handleVerify}
                style={{
                  marginLeft: '10px',
                  background: 'var(--primary-dark)',
                }}>
                중복 확인
              </AuthButton>
            </Grid>
          </Grid>
          <IntroduceForm
            label="한 줄 소개"
            variant="outlined"
            value={ProfileBio}
            onChange={handleIntroChange}
            margin="dense"
            multiline
            rows={4}
            InputProps={{
              style: {
                backgroundColor: '#f5f5f5',
              },
            }}
          />
          <Button
            variant="contained"
            style={{ width: '40%', margin: '5%' }}
            onClick={handleBack}>
            취소
          </Button>
          <Button
            variant="contained"
            color="success"
            style={{ width: '40%', margin: '5%' }}
            onClick={handleInfoChange}>
            저장
          </Button>

          <AlertsModal
            onClose={handleAlertClose}
            open={showAlert}
            message={message}
          />
        </div>
      ) : (
        <p>로딩중.. (안되면 axios 에러 난거임)</p>
      )}
    </div>
  );
}

export default InfoChange;

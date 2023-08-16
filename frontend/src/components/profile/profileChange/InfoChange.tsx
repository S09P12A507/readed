import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TextField, Button, Grid } from '@mui/material';
import axios from 'axios';
import { RootState } from '../../../store/store';
import AlertsModal from '../../common/alert/Alert';

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
  // name: string;
  // email: string;
  nickname: string;
  profile_image: string;
  profile_bio: string;
}

function InfoChange() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  // const [ProfileImage, setprofileimage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string>('');
  const [ProfileBio, setprofilebio] = useState<string>('');
  const [nicknameExists, setNicknameExists] = useState<boolean>(false);
  const [ProfileImage, setprofileimage] = useState<string | undefined>(
    undefined,
  );
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState('');

  const token: string | null = useSelector(
    (state: RootState) => state.auth.accessToken,
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      // setprofileimage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!userInfo) return;
    setNickname(event.target.value);
    setNicknameExists(false);
  };

  const handleIntroChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setprofilebio(event.target.value);
    console.log(nicknameExists);
  };

  const handleInfoChange = () => {
    const formData = {
      nickname,
      profile_bio: ProfileBio,
      profile_image: previewUrl,
    };
    console.log(formData);
    if (token) {
      axios
        .patch('https://i9a507.p.ssafy.io/api/members/profile', formData, {
          headers: {
            'X-READED-ACCESSTOKEN': `${token}`,
          },
        })
        .then(() => {
          setMessage('회원 정보가 변경됐습니다.');
          setShowAlert(true);
        })
        .catch(error => {
          console.error(error);
        });
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
      .catch(error => {
        console.error('중복 확인 실패:', error);
      });
  };

  useEffect(() => {
    if (token) {
      axios
        .get<{ data: UserInfo }>(
          `https://i9a507.p.ssafy.io/api/members/profile?id=3`,
          {
            headers: {
              'X-READED-ACCESSTOKEN': token,
            },
          },
        )
        .then(response => {
          setUserInfo(response.data.data);
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [token]);

  useEffect(() => {
    if (userInfo) {
      setNickname(userInfo.nickname);
      setprofilebio(userInfo.profile_bio);
      setprofileimage(userInfo.profile_image);
    }
  }, [userInfo]);
  return (
    <div>
      {userInfo ? (
        <div>
          <h2> 프로필 이미지</h2>
          <ImageContainer>
            <label htmlFor="fileInput">
              {previewUrl ? (
                <ProfileImg src={previewUrl} alt="프로필 미리보기" />
              ) : (
                <ProfileImg src={ProfileImage} alt="기본 이미지" />
              )}
            </label>
            <input
              type="file"
              id="fileInput"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </ImageContainer>
          {/* <h3>이메일</h3>
          <p>{userInfo.email}</p> */}

          <Grid container alignItems="center">
            <Grid item xs={10.2}>
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
          <Button variant="contained" style={{ width: '40%', margin: '5%' }}>
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
            open={showAlert}
            onClose={() => setShowAlert(false)}
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

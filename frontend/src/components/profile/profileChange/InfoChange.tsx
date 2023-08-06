import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { RootState } from '../../../store/store';
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

const AuthForm = styled(TextField)`
  width: 100%;
`;

const IntroduceForm = styled(TextField)`
  width: 100%;
`;

interface UserInfo {
  name: string;
  email: string;
  nickname: string;
  // profile_image: string;
  // profile_bio: string;
}

function InfoChange() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [ProfileImage, setprofileimage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string>('');
  const [ProfileBio, setprofilebio] = useState<string>('');
  const [nicknameExists, setNicknameExists] = useState<boolean>(false);

  const token: string | null = useSelector(
    (state: RootState) => state.auth.token,
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

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!userInfo) return;
    setNickname(event.target.value);
    setNicknameExists(false);
  };

  const handleIntroChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setprofilebio(event.target.value);
    console.log(ProfileImage);
    console.log(nicknameExists);
  };

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const response = await axios.get(`/api/members/{member-id}`, {
          headers: {
            Authorization: `Token ${token as string}`,
          },
        });
        setUserInfo(response.data as UserInfo);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUserInfo().catch(error => {
      console.error(error);
    });
  }, [token]);

  useEffect(() => {
    if (userInfo) {
      setNickname(userInfo.nickname);
      // 이미지도
      // 한줄 소개글도
    }
  }, [userInfo]);
  return (
    <div>
      {userInfo ? (
        <div>
          {/* <img src={userInfo.profile_image} alt="프로필 사진" /> */}
          <h2> 프로필 이미지</h2>
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
          <h3>이메일</h3>
          <p>{userInfo.email}</p>
          <AuthForm
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
          {/* <p>한줄 소개: {userInfo.profile_bio}</p> */}
          <Button variant="contained" style={{ width: '40%', margin: '5%' }}>
            {' '}
            취소
          </Button>
          <Button
            variant="contained"
            color="success"
            style={{ width: '40%', margin: '5%' }}>
            {' '}
            저장
          </Button>
        </div>
      ) : (
        <p>로딩중.. (안되면 axios 에러 난거임)</p>
      )}
    </div>
  );
}

export default InfoChange;

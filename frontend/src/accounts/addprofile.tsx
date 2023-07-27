import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import axios from 'axios';
import './addprofile.css';

interface SignUpData {
  MemberName: string;
  email: string;
  password1: string;
  password2: string;
}

function Addprofile() {
  const storedData = localStorage.getItem('signupData');
  const signUpData: SignUpData = storedData
    ? (JSON.parse(storedData) as SignUpData)
    : {
        MemberName: '',
        email: '',
        password1: '',
        password2: '',
      };
  const [MemberName] = useState<string>(signUpData.MemberName || '');
  const [email] = useState<string>(signUpData.email || '');
  const [password1] = useState<string>(signUpData.password1 || '');
  const [password2] = useState<string>(signUpData.password2 || '');

  const [ProfileImage, setprofileimage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string>('');
  const [ProfileBio, setprofilebio] = useState<string>('');
  const [nicknameExists, setNicknameExists] = useState<boolean>(false);

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
    setNickname(event.target.value);
    setNicknameExists(false);
  };

  const handleIntroChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setprofilebio(event.target.value);
  };

  const handleVerify = () => {
    setNicknameExists(true);
    alert('중복확인 성공');
    // axios
    // 	.get(`http://local:8080/user?nickname=${nickname}`)
    // 	.then(response => {
    // 		const exists = response.data.exists;
    // 		setNicknameExists(exists);
    // 	})
    // 	.catch(error => {
    // 		console.error('중복 확인 실패:', error);
    // 	});
  };

  const handleSignUp = () => {
    if (!nicknameExists) {
      // 중복 확인을 하지 않은 경우 알람을 띄우기
      alert('중복 여부를 체크해주세요');
      return;
    }
    const formData = new FormData();
    if (ProfileImage) {
      formData.append('file', ProfileImage);
    }
    formData.append('member_name', MemberName);
    formData.append('email', email);
    formData.append('password1', password1);
    formData.append('password2', password2);
    formData.append('nickname', nickname);
    formData.append('ProfileBio', ProfileBio);
    console.log('사진', ProfileImage);
    console.log('이메일', email);
    console.log('이름', MemberName);
    console.log('비번', password1);
    console.log('비번확인', password2);
    console.log('닉네임', nickname);
    console.log('한줄소개', ProfileBio);
    axios
      .post('http://local:8080/signup', formData)
      .then(response => {
        console.log('회원가입 성공:', response.data);
      })
      .catch(error => {
        console.error('회원가입 실패:', error);
      });
  };

  return (
    <div className="container">
      <h1>거의 다 되었어요</h1>
      <h3>
        {MemberName} 님에 대해 <br /> 더 알려주세요
      </h3>

      <p>프로필 사진(선택)</p>
      <div className="image-container">
        <label htmlFor="fileInput">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="프로필 미리보기"
              className="profile-image"
            />
          ) : (
            <img
              src="/assets/non.jpg"
              alt="기본 이미지"
              className="profile-image"
            />
          )}
        </label>
        <input
          type="file"
          id="fileInput"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>

      <p>닉네임 입력(필수)</p>
      <Grid container alignItems="center">
        <Grid item xs={9.5}>
          <TextField
            className="authform"
            label="다른사람에게 보일 이름이에요"
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
        <Grid item xs={2.5}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleVerify}
            className="auth-button"
            style={{ marginLeft: '10px', background: '#606C5D' }}>
            중복 확인
          </Button>
        </Grid>
      </Grid>

      <div>
        <p>한 줄 소개(선택)</p>
        <TextField
          className="introduceform"
          label="책에 관한 당신의 이야기를 들려주세요."
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
      </div>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSignUp}
        className="button-auth"
        style={{ marginTop: '20px', background: '#606C5D' }}>
        회원가입
      </Button>
    </div>
  );
}

export default Addprofile;

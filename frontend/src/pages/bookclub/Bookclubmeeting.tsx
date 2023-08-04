import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import VideocamIcon from '@mui/icons-material/Videocam';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import LogoutIcon from '@mui/icons-material/Logout';

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VideoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
`;

const Icons = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

function Bookclubmeeting() {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const [videoEnabled, setVideoEnabled] = useState<boolean>(true);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);

  const handleLocalMediaStream = (stream: MediaStream) => {
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
    }
  };
  const toggleVideo = () => {
    setVideoEnabled(prevState => !prevState);
  };

  const toggleAudio = () => {
    setAudioEnabled(prevState => !prevState);
  };

  const bookclubOut = () => {
    window.location.href = '/bookclub/detail/2:';
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: videoEnabled, audio: audioEnabled })
      .then(handleLocalMediaStream)
      .catch(error => console.error('Error accessing media devices:', error));
  }, [videoEnabled, audioEnabled]);

  return (
    <div>
      <Header>
        <h2>카메라 설정</h2>
      </Header>
      <VideoContainer>
        <video
          ref={localVideoRef}
          autoPlay
          playsInline
          muted={videoEnabled}
          width="var(--screen-size-mobile)"
          height="300">
          <track kind="captions" srcLang="en" label="English captions" />
        </video>
      </VideoContainer>
      <Icons>
        <VideocamIcon
          style={{
            fontSize: '4rem',
            backgroundColor: '#d9d9d9',
            borderRadius: '50%',
          }}
          onClick={toggleVideo}
        />
        <KeyboardVoiceIcon
          style={{
            fontSize: '4rem',
            backgroundColor: '#d9d9d9',
            borderRadius: '50%',
          }}
          onClick={toggleAudio}
        />
        <LogoutIcon
          style={{
            fontSize: '4rem',
            backgroundColor: '#d9d9d9',
            borderRadius: '50%',
          }}
          onClick={bookclubOut}
        />
      </Icons>
    </div>
  );
}

export default Bookclubmeeting;

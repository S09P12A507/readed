import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';
// import LeaveIcon from '../../components/bookclub/LeaveIcon';
import VoiceIcon from '../../components/bookclub/VoiceIcon';
import VideoIcon from '../../components/bookclub/VideoIcon';

const Container = styled.section`
  padding: 0 var(--padding-global);
`;

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

function BookclubRoom() {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const [videoEnabled, setVideoEnabled] = useState<boolean>(true);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const { bookclubId } = useParams();

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

  const handlestart = () => {
    window.location.href = `/bookclub/${bookclubId as string}`;
  };

  useEffect(() => {
    if (
      'mediaDevices' in navigator &&
      'getUserMedia' in navigator.mediaDevices
    ) {
      navigator.mediaDevices
        .getUserMedia({ video: videoEnabled, audio: audioEnabled })
        .then(handleLocalMediaStream)
        .catch(error => console.error(error));
    } else {
      console.error('이 브라우저에서는 지원되지 않습니다.');
    }
  }, [videoEnabled, audioEnabled]);

  return (
    <Container>
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
      <Button color="success" onClick={handlestart}>
        시작하기
      </Button>
      <Icons>
        <VideoIcon toggleVideo={toggleVideo} isVideoOn={videoEnabled} />
        <VoiceIcon toggleVoice={toggleAudio} isVoiceOn={audioEnabled} />
        {/* <LeaveIcon /> */}
      </Icons>
    </Container>
  );
}

export default BookclubRoom;

import styled from 'styled-components';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.12);
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  color: rgba(0, 0, 0, 0.54);
`;

interface Props {
  toggleVideo: () => void;
  isVideoOn: boolean;
}

function VideoIcon({ toggleVideo, isVideoOn }: Props) {
  return (
    <div>
      {isVideoOn ? (
        <IconContainer>
          <VideocamIcon fontSize="large" onClick={toggleVideo} />
        </IconContainer>
      ) : (
        <IconContainer>
          <VideocamOffIcon fontSize="large" onClick={toggleVideo} />
        </IconContainer>
      )}
    </div>
  );
}

export default VideoIcon;

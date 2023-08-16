import styled from 'styled-components';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import MicOffIcon from '@mui/icons-material/MicOff';

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
  toggleVoice: () => void;
  isVoiceOn: boolean;
}

function VoiceIcon({ toggleVoice, isVoiceOn }: Props) {
  return (
    <div>
      {isVoiceOn ? (
        <IconContainer>
          <KeyboardVoiceIcon fontSize="large" onClick={toggleVoice} />
        </IconContainer>
      ) : (
        <IconContainer>
          <MicOffIcon fontSize="large" onClick={toggleVoice} />
        </IconContainer>
      )}
    </div>
  );
}

export default VoiceIcon;

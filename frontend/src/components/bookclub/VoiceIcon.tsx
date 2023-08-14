import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';

interface Props {
  toggleVoice: () => void;
}

function VoiceIcon({ toggleVoice }: Props) {
  return (
    <div>
      <KeyboardVoiceIcon
        style={{
          fontSize: '4rem',
          backgroundColor: '#d9d9d9',
          borderRadius: '50%',
        }}
        onClick={toggleVoice}
      />
    </div>
  );
}

export default VoiceIcon;

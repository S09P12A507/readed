import VideocamIcon from '@mui/icons-material/Videocam';

interface Props {
  toggleVideo: () => void;
}

function VideoIcon({ toggleVideo }: Props) {
  return (
    <div>
      <VideocamIcon
        style={{
          fontSize: '4rem',
          backgroundColor: '#d9d9d9',
          borderRadius: '50%',
        }}
        onClick={toggleVideo}
      />
    </div>
  );
}

export default VideoIcon;

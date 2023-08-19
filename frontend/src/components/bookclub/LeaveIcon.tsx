import styled from 'styled-components';
import { useSelector } from 'react-redux';
import axios from 'axios';
import LogoutIcon from '@mui/icons-material/Logout';
import { RootState } from '../../store/store';

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
  bookclubId: string;
}

function LeaveIcon({ bookclubId }: Props) {
  const token: string | null = useSelector(
    (state: RootState) => state.auth.accessToken,
  );
  const handleBookclubOut = () => {
    axios
      .delete(`https://i9a507.p.ssafy.io/api/bookclubs/leave/${bookclubId}`, {
        headers: {
          'X-READED-ACCESSTOKEN': token,
        },
      })
      .then(() => {
        window.location.href = '/bookclub';
      })
      .catch(() => {});
  };

  return (
    <IconContainer>
      <LogoutIcon fontSize="large" onClick={handleBookclubOut} />
    </IconContainer>
  );
}

export default LeaveIcon;

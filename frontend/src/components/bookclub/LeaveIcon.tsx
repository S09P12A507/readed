import styled from 'styled-components';
import LogoutIcon from '@mui/icons-material/Logout';

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

function LeaveIcon() {
  const handleBookclubOut = () => {
    window.location.href = '/bookclub';
  };

  return (
    <IconContainer>
      <LogoutIcon fontSize="large" onClick={handleBookclubOut} />
    </IconContainer>
  );
}

export default LeaveIcon;

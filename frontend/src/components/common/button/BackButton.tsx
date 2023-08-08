import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { IconButton } from '@mui/material';
import styled from 'styled-components';

const BackButtonContainer = styled.div`
  position: flex;
  left: 5px;
`;

function BackButton() {
  const navigate = useNavigate();

  const handleback = () => {
    navigate(-1);
  };
  return (
    <BackButtonContainer>
      <IconButton
        onClick={handleback}
        style={{ color: 'gray', fontSize: '14px' }}>
        <ArrowBackIcon /> 이전으로
      </IconButton>
    </BackButtonContainer>
  );
}

export default BackButton;

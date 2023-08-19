import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Typography, Button } from '@mui/material';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import bookclubImg from '../../assets/img/mainSlider/2/laptop.jpg';

/**
 * @author 박성준
 * @todo
 */

const BookclubBackground = styled.div`
  position: relative;
  height: 100%;
  border-radius: 0.5rem;
  background-image: url(${bookclubImg});
  background-size: cover;
  background-position: right 60%;
  padding-right: 1rem;
`;

const TypoContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 1.5rem;
  text-align: left;
`;

function MainSliderItem2() {
  return (
    <BookclubBackground>
      <TypoContainer>
        <Typography
          fontSize="1.75rem"
          fontWeight="500"
          color="var(--text-primary)"
          textAlign="left"
          lineHeight="1.5">
          함께 책으로 소통하다.
        </Typography>
        <Typography
          fontSize="1.75rem"
          fontWeight="800"
          color="var(--text-primary)"
          textAlign="left"
          lineHeight="1.5">
          리디드 북클럽
        </Typography>
        <Link to="bookclub">
          <Button
            variant="contained"
            endIcon={<ChevronRightRoundedIcon />}
            sx={{ marginTop: '1rem', zIndex: '1', borderRadius: '999rem' }}
            disableElevation>
            바로가기
          </Button>
        </Link>
      </TypoContainer>
    </BookclubBackground>
  );
}

export default MainSliderItem2;

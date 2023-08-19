import styled from 'styled-components';
import { Typography } from '@mui/material';
import bookclubImg from '../../assets/img/mainSlider/2/online.jpg';

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
  bottom: 0;
  right: 0;
  padding: 1.5rem;
  text-align: right;
`;

function MainSliderItem3() {
  return (
    <BookclubBackground>
      <TypoContainer>
        <Typography
          fontSize="1.75rem"
          fontWeight="500"
          color="var(--main-white)"
          textAlign="right"
          lineHeight="1.5">
          더 추가할 만한 이야기.
        </Typography>
        <Typography
          fontSize="1.75rem"
          fontWeight="800"
          color="var(--main-white)"
          textAlign="right"
          lineHeight="1.5">
          SSAFY 프로젝트
        </Typography>
      </TypoContainer>
    </BookclubBackground>
  );
}

export default MainSliderItem3;

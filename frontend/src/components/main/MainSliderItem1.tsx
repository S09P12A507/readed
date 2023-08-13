import styled from 'styled-components';
import { Typography } from '@mui/material';
import namiyaImg from '../../assets/img/mainSlider/1/namiya.png';
import nightSkyImg from '../../assets/img/mainSlider/1/nightsky.jpg';

/**
 * @author 박성준
 * @todo 모바일 사이즈에 따라 배너 디자인이 달라짐...
 */

const Background = styled.div`
  position: absolute;
  text-align: left;
  width: 100%;
  height: 50%;
  top: 40%;
  padding: 20% 1rem 1rem 1rem;
  border-radius: 0.5rem;
  background-color: var(--primary-light);
  background-image: url(${nightSkyImg});
  background-size: cover;
  background-repeat: no-repeat;
`;

const Item = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 30%;
  background-image: url(${namiyaImg});
  background-repeat: no-repeat;
  background-size: 70%;
  transform-origin: left bottom;
  transform: translate(-10%, -10%);
`;

function MainSliderItem1() {
  return (
    <>
      <Typography
        variant="h5"
        position="absolute"
        fontSize="1.75rem"
        fontWeight="800"
        textAlign="right"
        lineHeight="1.6"
        right="5%"
        marginTop="2rem"
        sx={{
          textDecoration: 'underline',
          textDecorationStyle: 'inherit',
          textDecorationColor: 'var(--secondary-light)',
        }}>
        올 여름 꼭 읽어야 할 <br />
        추천 도서
      </Typography>
      <Background>
        <Typography
          color="white"
          marginLeft="55%"
          sx={{ wordBreak: 'keep-all' }}>
          히가시노 게이고
        </Typography>
        <Typography
          color="white"
          variant="h6"
          fontWeight="600"
          marginLeft="55%"
          whiteSpace="normal"
          sx={{ wordBreak: 'keep-all' }}>
          나미야 잡화점의 기적
        </Typography>
      </Background>
      <Item />
    </>
  );
}

export default MainSliderItem1;

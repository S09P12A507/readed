import styled from 'styled-components';
import Slider from 'react-slick';

import MainSliderItem1 from './MainSliderItem1';
import MainSliderItem2 from './MainSliderItem2';
import MainSliderItem3 from './MainSliderItem3';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ReadedSlider = styled(Slider)`
  width: 90%;
  margin: 2rem auto 4rem auto;
`;

const SliderItemContainer = styled.div`
  position: relative;
  display: block;
  border-radius: 0.5rem;
  width: 100%;
  height: 24rem;
  text-align: center;
  align-items: center;
  /* background-color: var(--divider); */
`;

function MainSlider() {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
  };
  return (
    <ReadedSlider {...settings}>
      <SliderItemContainer>
        <MainSliderItem1 />
      </SliderItemContainer>
      <SliderItemContainer>
        <MainSliderItem2 />
      </SliderItemContainer>
      <SliderItemContainer>
        <MainSliderItem3 />
      </SliderItemContainer>
    </ReadedSlider>
  );
}

export default MainSlider;

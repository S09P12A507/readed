import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

/**
 * 모든 파일에 전역으로 적용할 CSS, 디자인 시스템을 설정합니다.
 *
 * @author 박성준
 * @see https://styled-components.com/docs/api
 */

const GlobalStyle = createGlobalStyle`
  ${normalize}

  :root {
    /* color */
    --primary-main: #7AA874;
    --primary-dark: #4b8346;
    --primary-light: #9BC095;

    --secondary-main: #F7DB6A;
    --secondary-dark: #F3C32C;
    --secondary-light: #F9E88E;

    /* 아래 --main-black의 경우 용도에 따라 opacity를 조정합니다.
    primary
    => opacity: 0.87
    secondary
    => opacity: 0.60
    disabled
    => opacity: 0.38
    divider
    => opacity: 0.12
    */
    --main-white: #FFFFFF;
    --main-black: #000000

    // grey 및 다른 색상이 필요한 경우 추가합니다.
  }

  html {
    /* HTML font-size를 10px로 설정 (10px == 1rem) */
    font-size: 62.5%
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  hr {
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: none;
  }
`;

export default GlobalStyle;

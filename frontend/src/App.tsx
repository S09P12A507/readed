import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// mui
import { Container } from '@mui/material';
// style
import styled from '@emotion/styled';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import GlobalStyle from './GlobalStyle';
// pages
import Login from './components/login/login';
import Signup from './components/signup/signup';
import Emailcheck from './components/signup/emailcheck';
import Addprofile from './components/signup/addprofile';
import Genre from './components/signup/genre';
import Genrebook from './components/signup/genrebook';
import Home from './pages/Home';
import Search from './pages/Search';
import Bookclub from './pages/Bookclub';
import Profile from './pages/Profile';
import PageNotFound from './pages/PageNotFound';
// components
import BottomNav from './components/common/nav/BottomNav';

/**
 * bottom navigation
 *
 * @author 김보석, 박성준
 * @see
 * @todo container 양옆 테두리/그림자 추가
 * @todo container에 들어가지 않는 페이지 리팩토링
 */

// 모든 페이지를 해당 container에 가둡니다.
// 우선 앱만을 위해 디자인하며 반응형 웹이 아닙니다.
// 임시로 min-height와 테두리(border)를 지정하였습니다.
const MobileContainer = styled(Container)`
  max-width: 480px;
  min-height: 100%;
  border: solid red;
  padding-top: 2.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  @media screen and (min-width: 480px) {
    width: 480px;
  }
`;

// mui를 위한 custom theme입니다.
const theme = createTheme({
  typography: {
    fontFamily: 'Pretendard',
  },
  palette: {
    primary: {
      main: '#7AA874',
      dark: '#4b8346',
      light: '#9BC095',
      contrastText: '#fff',
    },
    secondary: {
      main: '#F7DB6A',
      dark: '#F3C32C',
      light: '#F9E88E',
      contrastText: '#000',
    },
  },
});

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <MobileContainer maxWidth="md">
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup/" element={<Signup />} />
              <Route path="/signup/emailcheck" element={<Emailcheck />} />
              <Route path="/signup/addprofile" element={<Addprofile />} />
              <Route path="/genre" element={<Genre />} />
              <Route path="/genre/:genre" element={<Genrebook />} />

              <Route element={<BottomNav />}>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/bookclub" element={<Bookclub />} />
                <Route path="/profile" element={<Profile />} />
              </Route>

              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Router>
        </MobileContainer>
      </ThemeProvider>
    </>
  );
}

export default App;

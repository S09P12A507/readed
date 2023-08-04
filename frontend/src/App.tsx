import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// mui
import { Container } from '@mui/material';
// style
import styled from '@emotion/styled';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import GlobalStyle from './GlobalStyle';
// pages
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import Emailcheck from './pages/signup/emailcheck';
import Addprofile from './pages/signup/addprofile';
import Genre from './pages/signup/genre';
import Genrebook from './pages/signup/genrebook';
import Home from './pages/Home';
import Search from './pages/Search';
import Bookclub from './pages/Bookclub';
import BookclubCreate from './pages/bookclub/BookclubCreate';
import Profile from './pages/Profile';
import KaKao from './pages/login/KakaoLogin';
import Google from './pages/login/GoogleLogin';
// import PageNotFound from './pages/PageNotFound';
// components
import BottomNav from './components/common/nav/BottomNav';
import StatisticsTab from './components/profile/tabs/statisticsTab/StatisticsTab';
import BookTab from './components/profile/tabs/bookTab/BookTab';
import ReportTab from './components/profile/tabs/reportTab/ReportTab';

/**
 * bottom navigation
 *
 * @author 김보석, 박성준
 * @breif 메인 app 컴포넌트
 * @see
 */

const MobileContainer = styled(Container)`
  position: relative;
  max-width: var(--screen-size-mobile);
  min-height: 100vh;
  padding-top: 2.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  box-shadow:
    1px 0 16px #888,
    -1px 0 16px #888;
  /* 조건문에 var 적용이 안되므로, screen-size-mobile 수정시 min-width 부분도 수정해주세요 */
  @media screen and (min-width: 480px) {
    width: var(--screen-size-mobile);
  }
`;

// mui를 위한 custom theme
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
              <Route path="/oauth/google/callback" element={<Google />} />
              <Route path="/oauth/kakao/callback" element={<KaKao />} />
              <Route path="/bookclub/create" element={<BookclubCreate />} />
              <Route path="/" element={<BottomNav />}>
                <Route path="" element={<Home />} />
                <Route path="search" element={<Search />} />
                <Route path="bookclub" element={<Bookclub />} />
                <Route path=":userId" element={<Profile />}>
                  <Route path="" element={<StatisticsTab />} />
                  <Route path="book" element={<BookTab />} />
                  <Route path="report" element={<ReportTab />} />
                </Route>
              </Route>

              {/* <Route path="*" element={<PageNotFound />} /> */}
            </Routes>
          </Router>
        </MobileContainer>
      </ThemeProvider>
    </>
  );
}

export default App;

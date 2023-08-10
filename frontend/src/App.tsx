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
import Bookclub from './pages/bookclub/Bookclub';
import BookclubCreate from './pages/bookclub/BookclubCreate';
import BookclubDetail from './pages/bookclub/BookclubDetatil';
import BookclubRoom from './pages/bookclub/BookclubRoom';
import BookclubMeeting from './pages/bookclub/BookclubMeeting';
import BookDetail from './pages/books/BookDetail';
import Profilechange from './pages/profile/Profilechange';
import Profile from './pages/profile/Profile';
import KaKao from './pages/login/KakaoLogin';
import Google from './pages/login/GoogleLogin';
import Report from './pages/books/Report';
// import PageNotFound from './pages/PageNotFound';
// components
import BottomNav from './components/common/nav/BottomNav';
import StatisticsTab from './components/profile/tabs/statisticsTab/StatisticsTab';
import BookTab from './components/profile/tabs/bookTab/BookTab';
import ReportTab from './components/profile/tabs/reportTab/ReportTab';
import Bookmark from './pages/profile/meatballMenu/Bookmark';
import InfoChange from './components/profile/profileChange/InfoChange';
import PwChange from './components/profile/profileChange/PwChange';

/**
 * bottom navigation
 *
 * @author 김보석, 박성준
 * @breif 메인 app 컴포넌트.
 * @see
 * @todo profile 페이지 url을 userId만 받아도 되도록 하고, 그 외의 값이 들어오면 접근 불가하도록
 */

const MobileContainer = styled(Container)`
  position: relative;
  max-width: var(--screen-size-mobile);
  min-height: 100vh;
  padding-top: 2.5rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
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
    common: {
      black: 'rgba(0, 0, 0, 0.87)',
      white: '#fff',
      // textPrimary: 'rgba(0, 0, 0, 0.87)',
      // textSecondary: 'rgba(0, 0, 0, 0.60)',
      // textDisabled: 'rgba(0, 0, 0, 0.38)',
      // divider: 'rgba(0, 0, 0, 0.12)',
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
              <Route
                path="/bookclub/detail/:bookclubid"
                element={<BookclubDetail />}
              />
              <Route
                path="/bookclub/waiting/:bookclubId"
                element={<BookclubRoom />}
              />
              <Route
                path="/bookclub/:bookclubId"
                element={<BookclubMeeting />}
              />
              <Route path="/report/:bookId" element={<Report />} />
              <Route path="/" element={<BottomNav />}>
                <Route path="" element={<Home />} />
                <Route path="search" element={<Search />} />
                <Route path="book/:bookId" element={<BookDetail />} />
                <Route path="bookclub" element={<Bookclub />} />
                <Route path="profilechange/:userId" element={<Profilechange />}>
                  <Route path="" element={<InfoChange />} />
                  <Route path="pwchange" element={<PwChange />} />
                </Route>

                <Route path="/profile/:userId" element={<Profile />}>
                  <Route index path="" element={<StatisticsTab />} />
                  <Route path="book" element={<BookTab />} />
                  <Route path="report" element={<ReportTab />} />
                </Route>
                <Route path="bookmark" element={<Bookmark />} />
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

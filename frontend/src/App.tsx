import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
// style
import styled from '@emotion/styled';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import GlobalStyle from './GlobalStyle';
// Pages
import Login from './components/login/login';
import Signup from './components/signup/signup';
import Emailcheck from './components/signup/emailcheck';
import Addprofile from './components/signup/addprofile';
import Genre from './components/signup/genre';
import Genrebook from './components/signup/genrebook';
import Select from './components/signup/select';
import Home from './pages/Home';
import Search from './pages/Search';
import Profile from './pages/Profile';
// import BottomNav from './components/common/nav/BottomNav';

const MobileContainer = styled(Container)`
  padding-left: 1rem;
  padding-right: 1rem;
  margin-left: auto;
  margin-right: auto;
`;
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
              <Route path="/select" element={<Select />} />
              <Route path="/genre" element={<Genre />} />
              <Route path="/genre/:genre" element={<Genrebook />} />
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Router>
        </MobileContainer>
      </ThemeProvider>
    </>
  );
}

export default App;

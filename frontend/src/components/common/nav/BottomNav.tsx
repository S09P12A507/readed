import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import styled from '@emotion/styled';

import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ContactsIcon from '@mui/icons-material/Contacts';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

// import { motion, AnimatePresence } from 'framer-motion';

/**
 * bottom navigation
 *
 * @author 박성준
 * @see https://mui.com/material-ui/react-bottom-navigation/
 * @todo 페이지 트랜지션 애니메이션 추가
 */

// BottomNavigation 관련 CSS
const ReadedBottomNavigation = styled(BottomNavigation)`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 0;
  max-width: 480px;
  width: 100vw;
  height: 5rem;
  border-top: solid 1px var(--divider);
  opacity: 0.8;
`;

const ReadedBottomNavigationAction = styled(BottomNavigationAction)`
  padding-top: 0.5rem;
  padding-bottom: 1rem;
`;

// Page Transition Animaion

function BottomNav() {
  const [bnValue, setBNValue] = useState<number>(0);
  const navigate = useNavigate();
  return (
    <>
      <Outlet />
      <ReadedBottomNavigation
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        showLabels
        value={bnValue}
        onChange={(event, newValue: number) => {
          setBNValue(newValue);
        }}>
        <ReadedBottomNavigationAction
          label="홈"
          icon={<HomeIcon />}
          onClick={() => navigate('/')}
        />
        <ReadedBottomNavigationAction
          label="검색"
          icon={<SearchIcon />}
          onClick={() => navigate('/search')}
        />
        <ReadedBottomNavigationAction
          label="북클럽"
          icon={<ContactsIcon />}
          onClick={() => navigate('/bookclub')}
        />
        <ReadedBottomNavigationAction
          label="내 서재"
          icon={<AutoStoriesIcon />}
          onClick={() => navigate('/profile')}
        />
      </ReadedBottomNavigation>
    </>
  );
}

export default BottomNav;

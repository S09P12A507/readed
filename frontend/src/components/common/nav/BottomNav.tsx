import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ContactsIcon from '@mui/icons-material/Contacts';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

function BottomNav() {
  const [bnValue, setBNValue] = useState<number>(0);
  const navigate = useNavigate();
  return (
    <BottomNavigation
      sx={{ width: '100%', position: 'absolute', bottom: 0 }}
      showLabels
      value={bnValue}
      onChange={(event, newValue: number) => {
        setBNValue(newValue);
      }}>
      <BottomNavigationAction
        label="홈"
        icon={<HomeIcon />}
        value={bnValue}
        onClick={() => navigate('/')}
      />
      <BottomNavigationAction
        label="검색"
        icon={<SearchIcon />}
        value={bnValue}
        onClick={() => navigate('/search')}
      />
      <BottomNavigationAction
        label="북클럽"
        icon={<ContactsIcon />}
        value={bnValue}
        onClick={() => navigate('/bookclub')}
      />
      <BottomNavigationAction
        label="내 서재"
        icon={<AutoStoriesIcon />}
        value={bnValue}
        onClick={() => navigate('/profile')}
      />
    </BottomNavigation>
  );
}

export default BottomNav;

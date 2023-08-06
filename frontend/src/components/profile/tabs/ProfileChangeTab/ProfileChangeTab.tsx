import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link, matchPath, useLocation, Outlet } from 'react-router-dom';

function useRouteMatch(patterns: readonly string[]) {
  const { pathname } = useLocation();
  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}

function ProfileChangeTabs() {
  const routeMatch = useRouteMatch([
    'profilechange/:userId',
    'profilechange/:userId/pwchange',
  ]);
  const currentTab = routeMatch?.pattern?.path;
  return (
    <>
      <Tabs value={currentTab} centered sx={{ marginBottom: '1rem' }}>
        <Tab
          label="회원 정보 수정"
          value="profilechange/:userId"
          to=""
          component={Link}
          sx={{ width: '40%' }}
        />
        <Tab
          label="비밀번호 변경"
          value="profilechange/:userId/pwchange"
          to="pwchange"
          component={Link}
          sx={{ width: '40%' }}
        />
      </Tabs>
      <Outlet />
    </>
  );
}

export default ProfileChangeTabs;

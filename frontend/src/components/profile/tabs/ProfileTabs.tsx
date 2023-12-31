import { ReactNode } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Divider } from '@mui/material';
// import { Divider, Tooltip } from '@mui/material';
import {
  MemoryRouter,
  Link,
  matchPath,
  useLocation,
  Outlet,
} from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';

/**
 * 내 서재 페이지의 탭
 *
 * @author 박성준
 * @see
 */

function Router(props: { children?: ReactNode }) {
  const { children } = props;
  if (typeof window === 'undefined') {
    return <StaticRouter location="">{children}</StaticRouter>;
  }

  return (
    <MemoryRouter initialEntries={['']} initialIndex={0}>
      {children}
    </MemoryRouter>
  );
}

Router.defaultProps = {
  children: undefined,
};

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

// 로그인된 유저 정보(임시)
const loginUserId = 'me';

function ProfileTabs() {
  const routeMatch = useRouteMatch([
    `profile/${loginUserId}/book`,
    `profile/${loginUserId}/report`,
    `profile/${loginUserId}`,
  ]);
  const currentTab = routeMatch?.pattern?.path;

  return (
    <>
      <Divider variant="middle" sx={{ marginTop: '1rem' }} />
      <Tabs
        value={currentTab}
        centered
        sx={{
          marginBottom: '1rem',
        }}>
        <Tab
          label="통계"
          value={`profile/${loginUserId}`}
          to=""
          component={Link}
          sx={{ width: '30.5%' }}
        />

        <Tab
          label="읽은 책"
          value={`profile/${loginUserId}/book`}
          to="book"
          component={Link}
          sx={{ width: '30.5%' }}
        />
        <Tab
          label="독서록"
          value={`profile/${loginUserId}/report`}
          to="report"
          component={Link}
          sx={{ width: '30.5%' }}
        />
      </Tabs>
      <Outlet />
    </>
  );
}

export default ProfileTabs;

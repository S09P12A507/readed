import { ReactNode } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Divider } from '@mui/material';
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

function ProfileTabs() {
  const routeMatch = useRouteMatch([
    ':userId/book',
    ':userId/report',
    ':userId',
  ]);
  const currentTab = routeMatch?.pattern?.path;

  return (
    <>
      <Divider variant="middle" />
      <Tabs
        value={currentTab}
        centered
        sx={{
          marginBottom: '1rem',
        }}>
        <Tab
          label="통계"
          value=":userId"
          to=""
          component={Link}
          sx={{ width: '30%' }}
        />
        <Tab
          label="읽은 책"
          value=":userId/book"
          to="book"
          component={Link}
          sx={{ width: '30%' }}
        />
        <Tab
          label="독서록"
          value=":userId/report"
          to="report"
          component={Link}
          sx={{ width: '30%' }}
        />
      </Tabs>
      <Outlet />
    </>
  );
}

export default ProfileTabs;

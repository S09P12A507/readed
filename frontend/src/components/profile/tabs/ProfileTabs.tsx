import { ReactNode } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Divider, Tooltip } from '@mui/material';
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
    'profile/:userId/book',
    'profile/:userId/report',
    'profile/:userId',
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
          value="profile/:userId"
          to=""
          component={Link}
          sx={{ width: '30.5%' }}
        />

        <Tab
          label="읽은 책"
          value="profile/:userId/book"
          to="book"
          component={Link}
          sx={{ width: '30.5%' }}
        />
        {/* 독서록 탭 완성하면, tooltip과 span을 지우고 Tab의 disabled를 지운다. */}
        <Tooltip title="곧 출시 예정이에요." arrow placement="top">
          <span
            style={{
              width: '30.5%',
              textAlign: 'center',
              fontSize: '0.875rem',
              color: 'var(--text-disabled)',
              marginTop: 'auto',
              marginBottom: 'auto',
              cursor: 'default',
            }}>
            {/* <Tab
              label="독서록"
              value="profile/:userId/report"
              to="report"
              component={Link}
              sx={{ width: '30.5%' }}
              disabled
            /> */}
            독서록
          </span>
        </Tooltip>
      </Tabs>
      <Outlet />
    </>
  );
}

export default ProfileTabs;

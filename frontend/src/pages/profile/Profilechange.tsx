import styled from 'styled-components';

import ProfileChangeTabs from '../../components/profile/tabs/ProfileChangeTab/ProfileChangeTab';

const Container = styled.section`
  padding: 0 var(--padding-global);
`;

function ProfileChange() {
  return (
    <Container>
      <ProfileChangeTabs />
    </Container>
  );
}

export default ProfileChange;

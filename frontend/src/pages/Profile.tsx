// import styled from 'styled-components';

import ReadedH2 from '../components/common/heading/ReadedH2';
// import ProfileCard from '../components/profile/tabs/profileCard/ProfileCard';

// import { UserProfileInfo } from '../interfaces/user/UserProfileInfo';

// const dummyUserProfileInfo: UserProfileInfo = {
//   profilePic: 'dd',
//   nickname: 'ff',
//   bookRead: 1,
//   bookReport: 2,
//   bookClubActivity: 3,
//   bio: 'hi',
// };

function Profile() {
  return (
    <>
      <ReadedH2 text="내 서재" />
      {/* <ProfileCard userProfileInfo={dummyUserProfileInfo} /> */}
    </>
  );
}

export default Profile;

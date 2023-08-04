// import styled from 'styled-components';
// components
import ReadedH2 from '../components/common/heading/ReadedH2';
import ProfileCard from '../components/profile/profileCard/ProfileCard';
import ProfileTabs from '../components/profile/tabs/ProfileTabs';
// types
import { UserProfileInfo } from '../interfaces/user/UserProfileInfo';

/**
 * 내 서재
 *
 * @author 박성준
 * @see
 */

const dummyUserProfileInfo: UserProfileInfo = {
  profilePic: '사진',
  nickname: '닉네임',
  bookRead: 1,
  bookReport: 2,
  bookClubActivity: 3,
  bio: 'hidfdfdfdf',
};

function Profile() {
  if (dummyUserProfileInfo.profilePic === null)
    dummyUserProfileInfo.profilePic = '.';
  if (dummyUserProfileInfo.bio === null) dummyUserProfileInfo.bio = '.';

  return (
    <>
      <ReadedH2 text="내 서재" />
      <ProfileCard userProfileInfo={dummyUserProfileInfo} />
      <ProfileTabs />
    </>
  );
}

export default Profile;

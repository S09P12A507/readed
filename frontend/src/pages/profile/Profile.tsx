// import styled from 'styled-components';
// components
import ReadedH2 from '../../components/common/heading/ReadedH2';
import ProfileCard from '../../components/profile/profileCard/ProfileCard';
import ProfileTabs from '../../components/profile/tabs/ProfileTabs';
// types
import { UserProfileInfo } from '../../interfaces/user/IUserProfileInfo';

/**
 * 내 서재
 *
 * @author 박성준
 * @see
 */

const dummyUserProfileInfo: UserProfileInfo = {
  id: 1,
  nickname: '닉네임',
  bio: '안녕하세요 😀',
  profileImage: '사진',
  readCount: 1,
  reportCount: 2,
  bookClubCount: 3,
};

function Profile() {
  const {
    // id,
    nickname,
    bio,
    profileImage,
    readCount,
    reportCount,
    bookClubCount,
  } = dummyUserProfileInfo;
  return (
    <>
      <ReadedH2 text="내 서재" />
      <ProfileCard
        profileCardInfo={{
          nickname,
          bio,
          profileImage,
          readCount,
          reportCount,
          bookClubCount,
        }}
      />
      <ProfileTabs />
    </>
  );
}

export default Profile;

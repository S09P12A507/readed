// import styled from 'styled-components';
// components
import ReadedH2 from '../../components/common/heading/ReadedH2';
import ProfileCard from '../../components/profile/profileCard/ProfileCard';
import ProfileTabs from '../../components/profile/tabs/ProfileTabs';
// types
import { UserProfileInfo } from '../../interfaces/user/UserProfileInfo';

/**
 * 내 서재
 *
 * @author 박성준
 * @see
 */

const dummyUserProfileInfo: UserProfileInfo = {
  // 프로필 상단
  id: 1,
  nickname: '닉네임',
  bio: '안녕하세요 😀',
  profileImage: '사진',
  readCount: 1,
  reportCount: 2,
  bookClubCount: 3,
  // 프로필 통계 탭
  pageCount: 100,
  star0count: 0,
  star0p5count: 0,
  star1count: 0,
  star1p5count: 0,
  star2count: 0,
  star2p5count: 0,
  star3count: 0,
  star3p5count: 0,
  star4count: 0,
  star4p5count: 0,
  star5count: 0,
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
    // pageCount,
    // star0count,
    // star0p5count,
    // star1count,
    // star1p5count,
    // star2count,
    // star2p5count,
    // star3count,
    // star3p5count,
    // star4count,
    // star4p5count,
    // star5count,
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
      <ProfileTabs
      // profileStatistics={{
      //   readCount,
      //   pageCount,
      //   star0count,
      //   star0p5count,
      //   star1count,
      //   star1p5count,
      //   star2count,
      //   star2p5count,
      //   star3count,
      //   star3p5count,
      //   star4count,
      //   star4p5count,
      //   star5count,
      // }}
      />
    </>
  );
}

export default Profile;

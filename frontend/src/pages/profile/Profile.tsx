import styled from 'styled-components';
// import { useQuery } from '@tanstack/react-query';
// import { getMemberProfile } from '../../apis/member/MemberProfileAPI';
// components
import ReadedH2 from '../../components/common/heading/ReadedH2';
import ProfileCard from '../../components/profile/profileCard/ProfileCard';
import ProfileTabs from '../../components/profile/tabs/ProfileTabs';
// import ProfileCardLoading from './loading/ProfileCardLoading';
// types
import { IUserProfileInfo } from '../../interfaces/user/IUserProfileInfo';
import MeatballMenu from '../../components/profile/meatballMenu/MeatballMenu';

/**
 * 내 서재
 *
 * @author 박성준
 * @see
 */

const HeaderTopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const dummyUserProfileInfo: IUserProfileInfo = {
  id: 1,
  nickname: '닉네임',
  bio: '안녕하세요 😀',
  profileImage: '사진',
  readCount: 154,
  reportCount: 26,
  bookClubCount: 8,
};

function Profile() {
  // const { isLoading, data } = useQuery<IUserProfileInfo>(
  //   ['memberProfile'],
  //   () => getMemberProfile(1), // 1=> store에서 현재 유저 id 가져와야 함
  // );
  // const profileCardInfo: IUserProfileInfo = {
  //   id: data?.id || 0,
  //   nickname: data?.nickname || '',
  //   bio: data?.bio || '',
  //   profileImage: data?.profileImage || '',
  //   readCount: data?.readCount || 0,
  //   reportCount: data?.reportCount || 0,
  //   bookClubCount: data?.bookClubCount || 0,
  // };
  return (
    <>
      <HeaderTopContainer>
        <ReadedH2 text="내 서재" />
        <MeatballMenu />
      </HeaderTopContainer>
      {/* {isLoading ? (
        <ProfileCardLoading />
      ) : (
        <ProfileCard profileCardInfo={dummyUserProfileInfo} />
      )} */}
      <ProfileCard profileCardInfo={dummyUserProfileInfo} />
      <ProfileTabs />
    </>
  );
}

export default Profile;

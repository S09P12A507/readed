import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { getMemberProfile } from '../../apis/member/MemberProfileAPI';
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

const Container = styled.section`
  padding: 0 var(--padding-global);
`;

const HeaderTopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// 더미데이터
const dummyUserProfileInfo: IUserProfileInfo = {
  id: 1,
  nickname: '닉네임',
  bio: '안녕하세요 😀 책을 좋아합니다. \n책에 대한 생각을 이야기하는 것도 좋아해요.',
  profileImage: '사진',
  readCount: 154,
  reportCount: 26,
  bookClubCount: 8,
};

function Profile() {
  // const { data, isLoading, isError } = useQuery<IUserProfileInfo>(
  const { data } = useQuery<IUserProfileInfo>(['profileCardInfo'], () =>
    getMemberProfile(''),
  );
  let profileCardInfo = null;
  if (data) {
    // Assuming 'IProfileCardInfo' is a subset of 'IUserProfileInfo'
    profileCardInfo = {
      // id: data.id,
      nickname: data.nickname,
      bio: data.bio,
      profileImage: data.profileImage,
      readCount: data.readCount,
      reportCount: data.reportCount,
      bookClubCount: data.bookClubCount,
    };
  }
  // profileImage, nickname, readCount, reportCount, bookClubCount, bio;
  // console.log(data);
  return (
    <Container>
      <HeaderTopContainer>
        <ReadedH2 text="내 서재" />
        <MeatballMenu />
      </HeaderTopContainer>

      <ProfileCard profileCardInfo={dummyUserProfileInfo} />
      {profileCardInfo && <ProfileCard profileCardInfo={profileCardInfo} />}
      <ProfileTabs />
    </Container>
  );
}

export default Profile;

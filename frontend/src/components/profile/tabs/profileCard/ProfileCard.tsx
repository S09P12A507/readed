import styled from 'styled-components';
import ReadedH3 from '../../../common/heading/ReadedH3';
import ReadedSpan from '../../../common/text/ReadedSpan';
import ReadedTextarea from '../../../common/text/ReadedTextarea';
import ReadedParagraph from '../../../common/text/ReadedParagraph';

/**
 * bottom navigation
 *
 * @author 박성준
 * @see
 * @todo profile 페이지에서 props를 내려받을 수 있도록 다시 설계해야 합니다.
 * @todo paragraph ... 등의 컴포넌트에 props로 폰트크기 등을 내릴 수 있도록 다시 설계해야 합니다.
 */

interface UserInfoProp {
  profilePic: string | null;
  nickname: string;
  bookRead: number;
  bookReport: number;
  bookClubActivity: number;
  bio: string | null;
}

const ProfileCardTag = styled.div``;

function ProfileCard() {
  const UserInfo: UserInfoProp = {
    profilePic: 'a',
    nickname: 'b',
    bookRead: 0,
    bookReport: 0,
    bookClubActivity: 0,
    bio: 'c',
  };
  return (
    <ProfileCardTag>
      <ReadedH3 text="프링글스" />
      {UserInfo.profilePic}
      {UserInfo.nickname}
      {UserInfo.bookRead}
      {UserInfo.bookReport}
      {UserInfo.bookClubActivity}
      {UserInfo.bio}
      <ReadedSpan text="스팬테스트" />
      <ReadedTextarea text="텍스트에리어테스트" />
      <ReadedParagraph text="패러그래프테스트" />
    </ProfileCardTag>
  );
}

export default ProfileCard;

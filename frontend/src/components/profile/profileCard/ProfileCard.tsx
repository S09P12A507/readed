import styled from 'styled-components';
// components
import ReadedParagraph from '../../common/text/ReadedParagraph';
import ProfilePicture from './ProfileCardPicture';
import ProfileCardTextContent from './ProfileCardTextContent';
// types
import { UserProfileInfo } from '../../../interfaces/user/UserProfileInfo';

/**
 * 프로필 페이지에 들어갈 프로필 카드 컴포넌트
 *
 * @author 박성준
 * @see https://cpro95.tistory.com/656
 */

const ProfileCardWrapper = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  margin: 1rem;
  flex-basis: auto;
`;

const ProfileCardTop = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 0.5rem;
`;

const ParagraphWrapper = styled.div`
  margin-left: 2rem;
  margin-right: 2rem;
`;

// interface ProfileCardProps {
//   profileCardInfo: Partial<UserProfileInfo>;
// }

type ProfileCardInfo = Pick<
  UserProfileInfo,
  | 'nickname'
  | 'bio'
  | 'profileImage'
  | 'readCount'
  | 'reportCount'
  | 'bookClubCount'
>;

function ProfileCard({
  profileCardInfo,
}: {
  profileCardInfo: ProfileCardInfo;
}) {
  const { profileImage, nickname, readCount, reportCount, bookClubCount, bio } =
    profileCardInfo;
  return (
    <ProfileCardWrapper>
      <ProfileCardTop>
        <ProfilePicture imageSource={profileImage} />
        <ProfileCardTextContent
          nickname={nickname}
          readCount={readCount}
          reportCount={reportCount}
          bookClubCount={bookClubCount}
        />
      </ProfileCardTop>

      <ParagraphWrapper>
        <ReadedParagraph text={bio} fontSize="0.75rem" fontWeight="200" />
      </ParagraphWrapper>
    </ProfileCardWrapper>
  );
}

export default ProfileCard;

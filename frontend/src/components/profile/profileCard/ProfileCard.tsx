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

function ProfileCard({
  userProfileInfo,
}: {
  userProfileInfo: UserProfileInfo;
}) {
  const { profilePic, nickname, bookRead, bookReport, bookClubActivity, bio } =
    userProfileInfo;
  return (
    <ProfileCardWrapper>
      <ProfileCardTop>
        <ProfilePicture imageSource={profilePic} />
        <ProfileCardTextContent
          nickname={nickname}
          bookRead={bookRead}
          bookReport={bookReport}
          bookClubActivity={bookClubActivity}
        />
      </ProfileCardTop>

      <ParagraphWrapper>
        <ReadedParagraph text={bio} fontSize="0.75rem" fontWeight="200" />
      </ParagraphWrapper>
    </ProfileCardWrapper>
  );
}

export default ProfileCard;

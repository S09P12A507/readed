import styled from 'styled-components';
// components
import ReadedParagraph from '../../common/text/ReadedParagraph';
import ProfilePicture from './ProfileCardPicture';
import ProfileCardTextContent from './ProfileCardTextContent';
// types
import { IUserProfileInfo } from '../../../interfaces/user/IUserProfileInfo';

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
  flex-basis: auto;
  margin: 0 auto;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`;

const ProfileCardTop = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
`;

const ParagraphWrapper = styled.div`
  margin-left: calc((100% - 21rem) / 2);
  margin-right: calc((100% - 21rem) / 2);
`;

type IProfileCardInfo = Pick<
  IUserProfileInfo,
  | 'nickname'
  | 'bio'
  | 'profileImage'
  | 'readCount'
  | 'reportCount'
  | 'bookclubCount'
>;

function ProfileCard({
  profileCardInfo,
}: {
  profileCardInfo: IProfileCardInfo;
}) {
  const { profileImage, nickname, readCount, reportCount, bookclubCount, bio } =
    profileCardInfo;
  return (
    <ProfileCardWrapper>
      <ProfileCardTop>
        <ProfilePicture imageSource={profileImage} />
        <ProfileCardTextContent
          nickname={nickname}
          readCount={readCount}
          reportCount={reportCount}
          bookclubCount={bookclubCount}
        />
      </ProfileCardTop>

      <ParagraphWrapper>
        <ReadedParagraph text={bio} fontSize="0.75rem" fontWeight="200" />
      </ParagraphWrapper>
    </ProfileCardWrapper>
  );
}

export default ProfileCard;

import styled from 'styled-components';
import ReadedH3 from '../../common/heading/ReadedH3';
import ReadedSpan from '../../common/text/ReadedSpan';
// types
import { IUserProfileInfo } from '../../../interfaces/user/IUserProfileInfo';

/**
 * 프로필카드 우측 텍스트 내용 컴포넌트
 *
 * @author 박성준
 */

const ProfileTextContentWrapper = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
`;

const NicknameWrapper = styled.div`
  display: flex;
`;
const NicknameDeco = styled.div`
  background-color: var(--primary-main);
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 1rem;
  width: 0.25rem;
  height: 1.25rem;
`;
const RecordContainerWrapper = styled.div`
  display: flex;
  flex-flow: row;
  margin-top: 1rem;
`;
const RecordContainer = styled.div`
  display: flex;
  flex-flow: column;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  width: 3.5rem;
`;

function ProfileCardTextContent({
  nickname,
  readCount,
  reportCount,
  bookclubCount,
}: {
  nickname: IUserProfileInfo['nickname'];
  readCount: IUserProfileInfo['readCount'];
  reportCount: IUserProfileInfo['reportCount'];
  bookclubCount: IUserProfileInfo['bookclubCount'];
}) {
  const readCountString: string = readCount.toString();
  const reportCountString: string = reportCount.toString();
  const bookClubCountString: string = bookclubCount.toString();
  return (
    <ProfileTextContentWrapper>
      <NicknameWrapper>
        <NicknameDeco />
        <ReadedH3 text={nickname} />
      </NicknameWrapper>
      <RecordContainerWrapper>
        <RecordContainer>
          <ReadedSpan
            text={readCountString}
            fontSize="1.125rem"
            fontWeight="500"
            textAlign="center"
          />
          <ReadedSpan
            text="읽은 책"
            fontSize="0.75rem"
            fontWeight="300"
            textAlign="center"
          />
        </RecordContainer>
        <RecordContainer>
          <ReadedSpan
            text={reportCountString}
            fontSize="1.125rem"
            fontWeight="500"
            textAlign="center"
          />
          <ReadedSpan
            text="독서록"
            fontSize="0.75rem"
            fontWeight="300"
            textAlign="center"
          />
        </RecordContainer>
        <RecordContainer>
          <ReadedSpan
            text={bookClubCountString}
            fontSize="1.125rem"
            fontWeight="500"
            textAlign="center"
          />
          <ReadedSpan
            text="북클럽 활동"
            fontSize="0.75rem"
            fontWeight="300"
            textAlign="center"
            whiteSpace="nowrap"
          />
        </RecordContainer>
      </RecordContainerWrapper>
    </ProfileTextContentWrapper>
  );
}

export default ProfileCardTextContent;

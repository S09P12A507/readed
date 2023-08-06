import styled from 'styled-components';
import ReadedH3 from '../../common/heading/ReadedH3';
import ReadedSpan from '../../common/text/ReadedSpan';
// types
import { UserProfileInfo } from '../../../interfaces/user/UserProfileInfo';

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
  width: 0.3rem;
  height: 1rem;
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
  width: 3rem;
`;

function ProfileCardTextContent({
  nickname,
  bookRead,
  bookReport,
  bookClubActivity,
}: {
  nickname: UserProfileInfo['nickname'];
  bookRead: UserProfileInfo['bookRead'];
  bookReport: UserProfileInfo['bookReport'];
  bookClubActivity: UserProfileInfo['bookClubActivity'];
}) {
  const bookReadString = bookRead.toString();
  const bookReportString = bookReport.toString();
  const bookClubActivityString = bookClubActivity.toString();
  return (
    <ProfileTextContentWrapper>
      <NicknameWrapper>
        <NicknameDeco />
        <ReadedH3 text={nickname} />
      </NicknameWrapper>
      <RecordContainerWrapper>
        <RecordContainer>
          <ReadedSpan
            text={bookReadString}
            fontWeight="600"
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
            text={bookReportString}
            fontWeight="600"
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
            text={bookClubActivityString}
            fontWeight="600"
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

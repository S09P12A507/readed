import styled from 'styled-components';
// components
import ReportTabCard from './ReportTabCard';
// types
import { IReport } from '../../../../interfaces/report/IReport';
import ReadedFooter from '../../../common/Footer';

/**
 * 내 서재 - 독서록 탭
 *
 * @author 박성준
 * @see
 */

const Container = styled.section``;

const dummyReportData: IReport[] = [
  {
    reportId: 4,
    reportTitle: '독후감 제목 변경',
    reportContent: '독후감 테스트 내용',
    isPublic: false,
    bookId: 3,
    bookTitle: '제목',
    bookCover: null,
    memberId: 3,
    memberNickname: '닉네임22',
  },
  {
    reportId: 5,
    reportTitle: '독후감 3',
    reportContent: '독후감 테스트 내용',
    isPublic: true,
    bookId: 3,
    bookTitle: '제목',
    bookCover: null,
    memberId: 3,
    memberNickname: '닉네임22',
  },
  {
    reportId: 6,
    reportTitle: '독후감 3',
    reportContent: '독후감 테스트 내용',
    isPublic: true,
    bookId: 3,
    bookTitle: '제목',
    bookCover: null,
    memberId: 3,
    memberNickname: '닉네임22',
  },
];

function ReportTab() {
  const reportData = dummyReportData;

  return (
    <Container>
      {reportData.map(report => {
        return <ReportTabCard key={report.reportId} report={report} />;
      })}
      <ReadedFooter />
    </Container>
  );
}

export default ReportTab;

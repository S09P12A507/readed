import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
// components
import ReportTabCard from './ReportTabCard';
// hooks
import { useAccessToken } from '../../../../hooks/useAccessToken';
// apis
import {
  IReportResponse,
  getMemberReport,
} from '../../../../apis/report/ReportListByMember';
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

function ReportTab() {
  // const reportData = dummyReportData;

  const accessToken = useAccessToken();

  const [reportData, setReportData] = useState<IReport[]>([]);

  const { data } = useQuery<IReportResponse | null>(['memberReport'], () =>
    getMemberReport(accessToken),
  );

  useEffect(() => {
    if (data !== null && data !== undefined) {
      const memberReport = data.data.reverse();
      setReportData(memberReport);
    }
  }, [data]);

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

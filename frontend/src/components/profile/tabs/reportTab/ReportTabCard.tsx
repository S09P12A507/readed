import styled from 'styled-components';
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
} from '@mui/material';
import { IReport } from '../../../../interfaces/report/IReport';

/**
 * 내 서재 - 독서록 탭 - 독서록 카드
 *
 * @author 박성준
 * @see
 */

const TextContentTitleWrapper = styled.div`
  display: flex;
  flex-flow: column;
`;
const TextContentBottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ReportTitle = styled(Typography)`
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
const BookTitle = styled(Typography)`
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;
const ReportContent = styled(Typography)`
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;
const WrittenDate = styled(Typography)``;

function ReportTabCard({ report }: { report: IReport }) {
  const { reportTitle, reportContent, isPublic, bookTitle } = report;
  return (
    <Card
      sx={{
        display: 'flex',
        width: '90%',
        aspectRatio: '10/5.2',
        margin: '0 auto',
      }}
      elevation={0}>
      <CardActionArea sx={{ display: 'flex', height: '90%' }}>
        <CardMedia
          component="img"
          sx={{
            width: '33%',
            margin: '0.5rem',
            borderRadius: '0.25rem',
            aspectRatio: '6.5/9',
            backgroundColor: '#d9d9d9',
          }}
          image={report.bookCover ? report.bookCover : undefined}
          alt={report.bookTitle}
        />
        {/* <BookReportCover bookCover={report.bookCover} /> */}
        <CardContent
          sx={{
            display: 'flex',
            flexFlow: 'column',
            justifyContent: 'space-between',
            width: '75%',
            height: '100%',
          }}>
          <TextContentTitleWrapper>
            <ReportTitle color="var(--text-primary)" fontWeight="700">
              {reportTitle}
            </ReportTitle>
            <BookTitle color="var(--text-primary)">{bookTitle}</BookTitle>
          </TextContentTitleWrapper>
          <ReportContent color="var(--text-secondary)" fontSize="0.875rem">
            {reportContent}
          </ReportContent>
          <TextContentBottomWrapper>
            <WrittenDate color="var(--text-secondary)" fontSize="0.875rem">
              날짜
            </WrittenDate>
            <Typography color="var(--text-secondary)" fontSize="0.875rem">
              {isPublic ? '공개' : '비공개'}
            </Typography>
          </TextContentBottomWrapper>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ReportTabCard;

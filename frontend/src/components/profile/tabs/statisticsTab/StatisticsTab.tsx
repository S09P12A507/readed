import { Container, Divider } from '@mui/material';
import StatisticsTabReadAmount from './StatisticsTabReadAmount';
import StatisticsTabRatingChart from './StatisticsTabRatingChart';
import { IUserProfileStatistics } from '../../../../interfaces/user/IUserProfileStatistics';
import ReadedFooter from '../../../common/Footer';

/**
 * 내 서재 - 통계 탭
 *
 * @author 박성준
 * @see
 * @todo 읽은 책 개수, 넘긴 페이지 수, 내가 남긴 별점들 api로 제공되는지?
 * @todo 선호 장르 워드클라우드는?
 */

const dummyStatisticsData: IUserProfileStatistics = {
  id: 0,
  readCount: 154,
  pageCount: 67483,
  star0count: 3,
  star0p5count: 2,
  star1count: 4,
  star1p5count: 5,
  star2count: 6,
  star2p5count: 3,
  star3count: 4,
  star3p5count: 7,
  star4count: 9,
  star4p5count: 8,
  star5count: 5,
};

function StatisticsTab() {
  const {
    readCount,
    pageCount,
    star0count,
    star0p5count,
    star1count,
    star1p5count,
    star2count,
    star2p5count,
    star3count,
    star3p5count,
    star4count,
    star4p5count,
    star5count,
  } = dummyStatisticsData;
  const readAmount = { readCount, pageCount };
  const chartData = {
    star0count,
    star0p5count,
    star1count,
    star1p5count,
    star2count,
    star2p5count,
    star3count,
    star3p5count,
    star4count,
    star4p5count,
    star5count,
  };
  return (
    <Container sx={{ paddingTop: '0.25rem' }}>
      <StatisticsTabReadAmount readAmount={readAmount} />
      <Divider sx={{ marginTop: '3rem', marginBottom: '3rem' }} />
      <StatisticsTabRatingChart chartData={chartData} />
      <ReadedFooter />
    </Container>
  );
}

export default StatisticsTab;

import StatisticsTabReadAmount from './StatisticsTabReadAmount';
import StatisticsTabRatingGraph from './StatisticsTabRatingGraph';

/**
 * 내 서재 - 통계 탭
 *
 * @author 박성준
 * @see
 * @todo 읽은 책 개수, 넘긴 페이지 수, 내가 남긴 별점들 api로 제공되는지?
 * @todo 선호 장르 워드클라우드는?
 */

function StatisticsTab() {
  return (
    <>
      <StatisticsTabReadAmount />
      <StatisticsTabRatingGraph />
    </>
  );
}

export default StatisticsTab;

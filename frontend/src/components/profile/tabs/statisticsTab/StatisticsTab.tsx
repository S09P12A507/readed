import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
// components
import { Container, Divider } from '@mui/material';
import StatisticsTabReadAmount from './StatisticsTabReadAmount';
import StatisticsTabRatingChart from './StatisticsTabRatingChart';
import StatisticsTabGenreWordCloud from './StatisticsTabGenreWordCloud';
import ReadedFooter from '../../../common/Footer';
// hooks
import { useAccessToken } from '../../../../hooks/useAccessToken';
// types, apis
import { IUserProfileStatistics } from '../../../../interfaces/user/IUserProfileStatistics';
import {
  getMemberProfileStatistics,
  IUserProfileStatisticsResponse,
} from '../../../../apis/member/MemberProfileStatisticsAPI';

/**
 * 내 서재 - 통계 탭
 *
 * @author 박성준
 * @see
 * @todo 읽은 책 개수, 넘긴 페이지 수, 내가 남긴 별점들 api로 제공되는지?
 * @todo 선호 장르 워드클라우드는?
 */

function StatisticsTab() {
  const [userProfile, setUserProfile] = useState<IUserProfileStatistics>();

  const accessToken = useAccessToken();
  // const { data, isLoading, isError } = useQuery<IUserProfileInfo>(
  const { data } = useQuery<IUserProfileStatisticsResponse | null>(
    ['profileCardInfo'],
    () => getMemberProfileStatistics(accessToken),
  );

  useEffect(() => {
    if (data !== null && data !== undefined) {
      const profileInfo = data.data;
      setUserProfile(profileInfo);
    }
  }, [data]);
  const readCount = userProfile?.readCount;
  const pageCount = userProfile?.pageCount;
  const star0count = userProfile?.star_0_count;
  const star0p5count = userProfile?.star_0p5_count;
  const star1count = userProfile?.star_1_count;
  const star1p5count = userProfile?.star_1p5_count;
  const star2count = userProfile?.star_2_count;
  const star2p5count = userProfile?.star_2p5_count;
  const star3count = userProfile?.star_3_count;
  const star3p5count = userProfile?.star_3p5_count;
  const star4count = userProfile?.star_4_count;
  const star4p5count = userProfile?.star_4p5_count;
  const star5count = userProfile?.star_5_count;
  const topPercentage = userProfile?.topPercentage;

  const nickname = userProfile?.nickname;

  const chartData: Omit<
    IUserProfileStatistics,
    'id' | 'readCount' | 'pageCount' | 'topPercentage' | 'nickname'
  > = {
    star_0_count: star0count || 0,
    star_0p5_count: star0p5count || 0,
    star_1_count: star1count || 0,
    star_1p5_count: star1p5count || 0,
    star_2_count: star2count || 0,
    star_2p5_count: star2p5count || 0,
    star_3_count: star3count || 0,
    star_3p5_count: star3p5count || 0,
    star_4_count: star4count || 0,
    star_4p5_count: star4p5count || 0,
    star_5_count: star5count || 0,
  };
  return (
    <Container sx={{ paddingTop: '0.25rem' }}>
      {/* <StatisticsTabReadAmount readAmount={readAmount} /> */}
      {readCount !== undefined &&
      pageCount !== undefined &&
      topPercentage !== undefined &&
      nickname !== undefined ? (
        <>
          <StatisticsTabReadAmount
            readAmount={{ readCount, pageCount, topPercentage, nickname }}
          />
          <Divider sx={{ marginTop: '3rem', marginBottom: '3rem' }} />
        </>
      ) : null}
      <StatisticsTabRatingChart chartData={chartData} />
      <Divider sx={{ marginTop: '3rem', marginBottom: '3rem' }} />
      <StatisticsTabGenreWordCloud />
      <ReadedFooter />
    </Container>
  );
}

export default StatisticsTab;

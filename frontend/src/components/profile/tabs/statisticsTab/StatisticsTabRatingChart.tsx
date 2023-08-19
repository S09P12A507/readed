import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';
import { Divider } from '@mui/material';
import ReadedSpan from '../../../common/text/ReadedSpan';
// types
import { IUserProfileStatistics } from '../../../../interfaces/user/IUserProfileStatistics';

/**
 * 내 서재 - 통계 탭 - 별점 그래프
 *
 * @author 박성준
 * @see
 * @todo 스크롤을 내렸을 때 차트가 렌더링
 */

const Container = styled.article``;
const ChartContainer = styled.div`
  width: 80%;
  max-width: var(--screen-size-mobile);
  margin: 0 auto;
  margin-top: 0.5rem;
  transform: translate(-0.5rem);
  /* visibility: hidden; */
`;
const DataContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 1.5rem;
`;
const DatumContainer = styled.div`
  display: flex;
  flex-flow: column;
  text-align: center;
  width: 33%;
`;

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

// 각 별점 개수 합
function countRating(ratings: number[]) {
  return ratings.reduce((acc, val) => {
    return acc + val;
  });
}

// 별점 * 개수 합
function countRatingVal(ratings: number[]) {
  const rateValArr = ratings.map((value, index) => {
    // console.log(rateValArr);
    return value * (index / 2);
  });

  return Number(
    rateValArr
      .reduce((acc, val) => {
        return acc + val;
      })
      .toFixed(1),
  );
}
function countRatingAvg(ratings: number[]) {
  const ratingVal = countRatingVal(ratings);
  const ratingCnt = countRating(ratings);
  return (ratingVal / ratingCnt).toFixed(2);
}

function StatisticsTabRatingChart({
  chartData,
}: {
  chartData: Omit<
    IUserProfileStatistics,
    'id' | 'readCount' | 'pageCount' | 'topPercentage' | 'nickname'
  >;
}) {
  const userRateData: number[] = [...Object.values(chartData)];
  const chartUserRateData = userRateData.slice(1, -1);
  const maxIndex = userRateData.indexOf(Math.max(...userRateData));
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          callback: (tickValue: string | number, index: number) => {
            let labelValue: string | number = tickValue;
            if (typeof tickValue === 'number') {
              labelValue = tickValue / 2 + 0.5;
            } else if (typeof tickValue === 'string') {
              labelValue = Number(tickValue) / 2 + 0.5;
            }
            return index % 2 === 1 ? labelValue : '';
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
    barPercentage: 1.1,
  };

  const labels = ['0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5'];
  const data = {
    labels,
    datasets: [
      {
        label: '코멘트 수',
        data: chartUserRateData,
        backgroundColor: chartUserRateData.map((value, index) =>
          // var() 사용 불가?
          index === maxIndex ? '#F3C32C' : '#F7DB6A',
        ),
      },
    ],
  };

  return (
    <Container>
      <ReadedSpan text="별점 통계" fontSize="1.125rem" fontWeight="600" />
      <div id="chart" style={{ visibility: 'hidden' }} />
      <ChartContainer>
        <Bar options={options} data={data} />
      </ChartContainer>
      <DataContainer>
        <DatumContainer>
          <ReadedSpan
            text="별점 평균"
            fontSize="0.875rem"
            fontWeight="300"
            fontColor="var(--text-secondary)"
            textAlign="center"
          />
          <ReadedSpan
            text={`${countRatingAvg(userRateData)}`}
            fontSize="1.5rem"
            fontWeight="500"
            textAlign="center"
          />
        </DatumContainer>
        <div>
          <Divider orientation="vertical" />
        </div>
        <DatumContainer>
          <ReadedSpan
            text="별 개수"
            fontSize="0.875rem"
            fontWeight="300"
            fontColor="var(--text-secondary)"
            textAlign="center"
          />
          <ReadedSpan
            text={`${countRatingVal(userRateData).toString()}개`}
            fontSize="1.5rem"
            fontWeight="500"
            textAlign="center"
          />
        </DatumContainer>
        <div>
          <Divider orientation="vertical" />
        </div>
        <DatumContainer>
          <ReadedSpan
            text="많이 준 별점"
            fontSize="0.875rem"
            fontWeight="300"
            fontColor="var(--text-secondary)"
            textAlign="center"
          />
          <ReadedSpan
            text={
              countRatingVal(userRateData)
                ? `${(Math.round(maxIndex + 1) / 2).toString()}점`
                : '0점'
            }
            fontSize="1.5rem"
            fontWeight="500"
            textAlign="center"
          />
        </DatumContainer>
      </DataContainer>
    </Container>
  );
}

export default StatisticsTabRatingChart;

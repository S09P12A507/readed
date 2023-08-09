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
import ReadedSpan from '../../../common/text/ReadedSpan';
// types
import { IUserProfileStatistics } from '../../../../interfaces/user/IUserProfileStatistics';

/**
 * 내 서재 - 통계 탭 - 별점 그래프
 *
 * @author 박성준
 * @see
 * @todo 배치, css
 */

const Container = styled.article``;
const ChartContainer = styled.div`
  width: 80%;
  max-width: var(--screen-size-mobile);
  margin: 0 auto;
  transform: translate(-0.5rem);
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
    return (value * Math.round(index + 1)) / 2;
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
  return (ratingVal / ratingCnt).toFixed(1);
}

function StatisticsTabRatingChart({
  chartData,
}: {
  chartData: Omit<IUserProfileStatistics, 'id' | 'readCount' | 'pageCount'>;
}) {
  const userRateData: number[] = [...Object.values(chartData)];
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
        data: userRateData,
        backgroundColor: userRateData.map((value, index) =>
          // var 사용 불가?
          index === maxIndex ? '#F3C32C' : '#F7DB6A',
        ),
      },
    ],
  };
  return (
    <Container>
      <ReadedSpan text="별점 통계" fontSize="1.125rem" fontWeight="600" />
      <ChartContainer>
        <Bar options={options} data={data} />
      </ChartContainer>
      <div>별점 평균: {countRatingAvg(userRateData)}</div>
      <div>별점 개수: {countRatingVal(userRateData)}</div>
      <div>많이 준 별점: {Math.round(maxIndex + 1) / 2}</div>
    </Container>
  );
}

export default StatisticsTabRatingChart;

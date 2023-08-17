import { useCallback } from 'react';
import styled from 'styled-components';
import { Divider } from '@mui/material';
import CountUp from 'react-countup';
import { IUserProfileStatistics } from '../../../../interfaces/user/IUserProfileStatistics';
import ReadedSpan from '../../../common/text/ReadedSpan';

/**
 * 내 서재 - 통계 탭 - 독서량
 *
 * @author 박성준
 * @see
 * @todo 전체/월간/연간 독서량은 일단 생략
 * @todo 상위 몇 퍼센트 / 멘트 설정 <- 백엔드에서 받아야 할 듯.
 * @todo 현재 로그인 유저 닉네임 <- store에서 받아야 할 듯.
 */

const Container = styled.article`
  margin-top: 1rem;
`;
const DataContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;
const DatumContainer = styled.div`
  display: flex;
  flex-flow: column;
  text-align: center;
  width: 50%;
`;
const NumberContainer = styled.span`
  font-size: 2rem;
  font-weight: 500;
`;
const SloganContainer = styled.div`
  display: flex;
  flex-flow: column;
  text-align: center;
`;

function getRankSlogan(topPercentage: number): string {
  if (topPercentage <= 1) return '책을 정말정말 사랑하는 분이시네요!!';
  if (topPercentage <= 3 && topPercentage > 1)
    return '책을 사랑하는 분이시군요!';
  if (topPercentage <= 5 && topPercentage > 3)
    return '책과 정말 친한 친구 사이네요!';
  if (topPercentage <= 10 && topPercentage > 5)
    return '책과 아주 열심히 읽고 계시네요!';
  if (topPercentage <= 25 && topPercentage > 10)
    return '책에 대한 은은한 애정이 느껴져요.';
  if (topPercentage <= 50 && topPercentage > 25)
    return '책을 꽤 열심히 읽고 계시군요!';
  return '책과 더 가까워질 기회입니다!';
}

function StatisticsTabReadAmount({
  readAmount,
}: {
  readAmount: Pick<
    IUserProfileStatistics,
    'readCount' | 'pageCount' | 'topPercentage' | 'nickname'
  >;
}) {
  const handleNumberFormat = useCallback((value: number) => {
    const formattedNumber = new Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value);
    return formattedNumber;
  }, []);
  const memberSlogan = getRankSlogan(readAmount.topPercentage);
  return (
    <Container>
      <ReadedSpan text="독서량" fontSize="1.125rem" fontWeight="600" />
      <DataContainer>
        <DatumContainer>
          <ReadedSpan
            text="읽은 책"
            fontSize="0.875rem"
            fontWeight="300"
            textAlign="center"
          />
          <NumberContainer>
            <CountUp
              end={readAmount.readCount}
              formattingFn={(value: number) => handleNumberFormat(value)}
            />
          </NumberContainer>
        </DatumContainer>
        <div>
          <Divider orientation="vertical" />
        </div>
        <DatumContainer>
          <ReadedSpan
            text="넘긴 페이지"
            fontSize="0.875rem"
            fontWeight="300"
            textAlign="center"
          />
          <NumberContainer>
            <CountUp
              end={readAmount.pageCount}
              formattingFn={(value: number) => handleNumberFormat(value)}
            />
          </NumberContainer>
        </DatumContainer>
      </DataContainer>
      <SloganContainer>
        <div>
          <ReadedSpan
            text={`${readAmount.nickname}님은 `}
            fontSize="0.875rem"
            fontWeight="300"
            textAlign="center"
            lineHeight="1.8"
          />
          <ReadedSpan
            text={`리디드 상위 ${readAmount.topPercentage.toFixed(2)}%`}
            fontSize="0.875rem"
            fontWeight="500"
            fontColor="var(--primary-dark)"
            textAlign="center"
            lineHeight="1.8"
          />
          <ReadedSpan
            text="입니다."
            fontSize="0.875rem"
            fontWeight="300"
            textAlign="center"
            lineHeight="1.8"
          />
        </div>
        <ReadedSpan
          text={memberSlogan}
          fontSize="0.875rem"
          fontWeight="300"
          textAlign="center"
          lineHeight="1.8"
        />
      </SloganContainer>
    </Container>
  );
}

export default StatisticsTabReadAmount;

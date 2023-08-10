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

function StatisticsTabReadAmount({
  readAmount,
}: {
  readAmount: Pick<IUserProfileStatistics, 'readCount' | 'pageCount'>;
}) {
  const handleNumberFormat = useCallback((value: number) => {
    const formattedNumber = new Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value);
    return formattedNumber;
  }, []);
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
            text="store: 유저명 님은 "
            fontSize="0.875rem"
            fontWeight="300"
            textAlign="center"
            lineHeight="1.8"
          />
          <ReadedSpan
            text="상위 n%"
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
          text=" 멘트: 책을 정말 사랑하는 분이시네요!"
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

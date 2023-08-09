import styled from 'styled-components';
import AnimatedNumbers from 'react-animated-numbers';
import { IUserProfileStatistics } from '../../../../interfaces/user/IUserProfileStatistics';
import ReadedSpan from '../../../common/text/ReadedSpan';

/**
 * 내 서재 - 통계 탭 - 독서량
 *
 * @author 박성준
 * @see
 * @todo 전체/월간/연간 독서량은 일단 생략, 만약 있으면 숫자 상승 애니메이션이 있는 편이 좋을 것.
 * @todo 넘긴 페이지 일정 수 이상일 때 K, M, ... 표시
 * @todo 상위 몇 퍼센트 / 멘트 설정 <- 백엔드에서 받아야 할 듯.
 */

const Container = styled.article`
  margin-top: 1rem;
`;

function StatisticsTabReadAmount({
  readAmount,
}: {
  readAmount: Pick<IUserProfileStatistics, 'readCount' | 'pageCount'>;
}) {
  return (
    <Container>
      <ReadedSpan text="독서량" fontSize="1.125rem" fontWeight="600" />
      <div>
        읽은 책
        <AnimatedNumbers
          animateToNumber={readAmount.readCount}
          fontStyle={{ fontSize: '2rem' }}
        />
        넘긴 페이지
        <AnimatedNumbers
          animateToNumber={readAmount.pageCount}
          fontStyle={{ fontSize: '2rem' }}
        />
        숫자 왜 삐뚤빼뚤
        <br /> 상위 n퍼센트에요, 멘트: 책을 좋아하시는 분이네요
      </div>
    </Container>
  );
}

export default StatisticsTabReadAmount;

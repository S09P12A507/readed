import styled from 'styled-components';
import { Typography } from '@mui/material';
import ReadedSpan from '../../../common/text/ReadedSpan';

/** 선호하는 장르 (워드클라우드) - 미완
 * @author 박성준
 */

const Container = styled.article``;

function StatisticsTabGenreWordCloud() {
  return (
    <Container>
      <ReadedSpan text="선호하는 장르" fontSize="1.125rem" fontWeight="600" />
      <Typography
        color="var(--text-disabled)"
        textAlign="center"
        margin="5rem 0">
        아직 준비중인 기능이에요!
      </Typography>
    </Container>
  );
}

export default StatisticsTabGenreWordCloud;

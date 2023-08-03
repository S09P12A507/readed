import styled from 'styled-components';
import { TextStyle } from '../../../interfaces/common/TextStyle';

/**
 * p 컴포넌트, 기본값 1rem, 500
 *
 * @author 박성준
 * @see
 */

const ReadedParagraphWrapper = styled.p<TextStyle>`
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.fontWeight};
`;
function ReadedParagraph({
  text,
  fontSize,
  fontWeight,
}: {
  text: string;
  fontSize: TextStyle['fontSize'];
  fontWeight: TextStyle['fontWeight'];
}) {
  return (
    <ReadedParagraphWrapper fontSize={fontSize} fontWeight={fontWeight}>
      {text}
    </ReadedParagraphWrapper>
  );
}

export default ReadedParagraph;

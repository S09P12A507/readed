import styled from 'styled-components';
import { ITextStyle } from '../../../interfaces/common/ITextStyle';

/**
 * p 컴포넌트, 기본값 1rem, 500
 *
 * @author 박성준
 * @see
 */

const ReadedParagraphWrapper = styled.p<ITextStyle>`
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.fontWeight};
`;
function ReadedParagraph({
  text,
  fontSize,
  fontWeight,
}: {
  text: string;
  fontSize: ITextStyle['fontSize'];
  fontWeight: ITextStyle['fontWeight'];
}) {
  return (
    <ReadedParagraphWrapper fontSize={fontSize} fontWeight={fontWeight}>
      {text}
    </ReadedParagraphWrapper>
  );
}

export default ReadedParagraph;

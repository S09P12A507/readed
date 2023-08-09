import styled from 'styled-components';
import { ITextStyle } from '../../../interfaces/common/ITextStyle';

/**
 * span 컴포넌트, 기본값 1rem, 500
 *
 * @author 박성준
 * @see
 */

const ReadedSpanWrapper = styled.span<ITextStyle>`
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.fontWeight};
  text-align: ${props => props.textAlign};
  white-space: ${props => props.whiteSpace};
`;
function ReadedSpan({
  text,
  fontSize,
  fontWeight,
  textAlign,
  whiteSpace,
}: {
  text: string;
  fontSize?: ITextStyle['fontSize'];
  fontWeight?: ITextStyle['fontWeight'];
  textAlign?: ITextStyle['textAlign'];
  whiteSpace?: ITextStyle['whiteSpace'];
}) {
  return (
    <ReadedSpanWrapper
      fontSize={fontSize}
      fontWeight={fontWeight}
      textAlign={textAlign}
      whiteSpace={whiteSpace}>
      {text}
    </ReadedSpanWrapper>
  );
}

ReadedSpan.defaultProps = {
  fontSize: '1rem',
  fontWeight: '500',
  textAlign: 'left',
  whiteSpace: 'normal',
};

export default ReadedSpan;

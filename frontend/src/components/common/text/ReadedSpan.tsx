import styled from 'styled-components';
import { TextStyle } from '../../../interfaces/common/TextStyle';

/**
 * span 컴포넌트, 기본값 1rem, 500
 *
 * @author 박성준
 * @see
 */

const ReadedSpanWrapper = styled.span<TextStyle>`
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
  fontSize?: TextStyle['fontSize'];
  fontWeight?: TextStyle['fontWeight'];
  textAlign?: TextStyle['textAlign'];
  whiteSpace?: TextStyle['whiteSpace'];
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

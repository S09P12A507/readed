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
  color: ${props => props.fontColor};
  line-height: ${props => props.lineHeight};
`;
function ReadedSpan({
  text,
  fontSize,
  fontWeight,
  fontColor,
  textAlign,
  lineHeight,
  whiteSpace,
}: {
  text: string;
  fontSize?: ITextStyle['fontSize'];
  fontWeight?: ITextStyle['fontWeight'];
  fontColor?: ITextStyle['fontColor'];
  textAlign?: ITextStyle['textAlign'];
  lineHeight?: ITextStyle['lineHeight'];
  whiteSpace?: ITextStyle['whiteSpace'];
}) {
  return (
    <ReadedSpanWrapper
      fontSize={fontSize}
      fontWeight={fontWeight}
      fontColor={fontColor}
      textAlign={textAlign}
      lineHeight={lineHeight}
      whiteSpace={whiteSpace}>
      {text}
    </ReadedSpanWrapper>
  );
}

ReadedSpan.defaultProps = {
  fontSize: '1rem',
  fontWeight: '500',
  fontColor: 'var(--text-primary)',
  textAlign: 'left',
  lineHeight: '1.5',
  whiteSpace: 'normal',
};

export default ReadedSpan;

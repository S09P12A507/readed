import styled from 'styled-components';

interface TextProp {
  text: string;
  // fontWeight: string;
}

type FontWeightValue =
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

interface SpanTagProps {
  fontWeight?: FontWeightValue;
}

const ReadedSpanTag = styled.span<SpanTagProps>`
  font-size: 1rem;
  font-weight: ${props => props.fontWeight};
`;
function ReadedSpan({ text }: TextProp) {
  return <ReadedSpanTag>{text}</ReadedSpanTag>;
}

export default ReadedSpan;

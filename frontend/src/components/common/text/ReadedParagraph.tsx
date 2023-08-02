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

type FontSizeValue = number;

interface ParagraphTagProps {
  fontWeight?: FontWeightValue;
  fontSize?: FontSizeValue;
}

const ReadedParagraphTag = styled.p<ParagraphTagProps>`
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.fontWeight};
`;
function ReadedParagraph({ text }: TextProp) {
  return <ReadedParagraphTag>{text}</ReadedParagraphTag>;
}

export default ReadedParagraph;

import styled from 'styled-components';

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
interface TextProp {
  text: string;
  // fontWeight?: FontWeightValue;
}

interface TextareaTagProps {
  fontWeight?: FontWeightValue;
  fontSize?: FontSizeValue;
}

const ReadedTextareaTag = styled.textarea<TextareaTagProps>`
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.fontWeight};
`;
function ReadedTextarea({ text }: TextProp) {
  return <ReadedTextareaTag>{text}</ReadedTextareaTag>;
}

export default ReadedTextarea;

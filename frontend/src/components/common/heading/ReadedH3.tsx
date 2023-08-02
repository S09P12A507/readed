import styled from 'styled-components';

interface H3Prop {
  text: string;
}

const ReadedH3Tag = styled.h3`
  font-size: 1rem;
`;

function ReadedH3({ text }: H3Prop) {
  return <ReadedH3Tag>{text}</ReadedH3Tag>;
}

export default ReadedH3;

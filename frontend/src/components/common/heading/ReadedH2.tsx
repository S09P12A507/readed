import styled from 'styled-components';

interface H2Prop {
  text: string;
}

const ReadedH2Tag = styled.h2`
  font-size: 1.5rem;
`;

function ReadedH2({ text }: H2Prop) {
  return <ReadedH2Tag>{text}</ReadedH2Tag>;
}

export default ReadedH2;

import React, { useState } from 'react';
import styled from 'styled-components';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';

/** 수평 스크롤 버튼
 * @author 박성준
 * @see https://velog.io/@071yoon/React-Horizontal-Scroll-%EA%B5%AC%ED%98%84
 */

const Transparent = styled.div`
  position: absolute;
  margin-right: 0.5rem;
  width: 2rem;
  height: 16rem;
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  z-index: 10;
`;

const Button = styled.button`
  position: absolute;
  margin-right: 0.5rem;
  width: 2rem;
  height: 16rem;
  color: black;
  opacity: 0.5;
  border-color: transparent;
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  z-index: 10;
  cursor: pointer;
  /* transform: translate(-100% 0); */
`;

function Right({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  const [show, setShow] = useState(false);
  return show ? (
    <Button
      onClick={onClick}
      onMouseLeave={() => {
        setShow(false);
      }}>
      {children}
    </Button>
  ) : (
    <Transparent
      onMouseEnter={() => {
        setShow(true);
      }}
    />
  );
}

export function RightArrow() {
  const { scrollNext } = React.useContext(VisibilityContext);
  return <Right onClick={() => scrollNext()}>→</Right>;
}

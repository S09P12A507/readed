import React, { useState } from 'react';
import styled from 'styled-components';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';

/** 수평 스크롤 버튼
 * @author 박성준
 * @see https://velog.io/@071yoon/React-Horizontal-Scroll-%EA%B5%AC%ED%98%84
 */

const Transparent = styled.div`
  position: absolute;
  width: 2rem;
  /* margin-left: 0.5rem; */
  height: 16rem;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  z-index: 10;
`;

const Button = styled.button`
  position: absolute;
  /* margin-left: 0.5rem; */
  width: 2rem;
  height: 16rem;
  color: black;
  opacity: 0.5;
  border-color: transparent;
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
  z-index: 10;
  cursor: pointer;
`;

function Left({
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

export function LeftArrow() {
  const { scrollPrev } = React.useContext(VisibilityContext);
  return <Left onClick={() => scrollPrev()}>←</Left>;
}

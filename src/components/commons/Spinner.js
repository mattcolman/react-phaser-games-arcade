// @flow

import React from 'react';
import glam from 'glamorous';
import { css } from 'glamor';

type Props = {
};

const rotation = css.keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(359deg)' },
});

const StyledSpan = glam.span({
  animation: `${rotation} .6s infinite linear`,
  borderRadius: '100%',
  display: 'flex',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: 28,
  height: 28,
  borderBottom: '2px solid rgba(255, 255, 255, 0.3)',
  borderLeft: '2px solid rgba(255, 255, 255, 0.3)',
  borderRight: '2px solid rgba(255, 255, 255, 0.3)',
  borderTop: '2px solid rgba(255, 255, 255, 1)',
  marginTop: 30,
  '@keyframes rotation': {
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform: 'rotate(359deg)',
    },
  },
});

function Spinner({
}: Props) {
  return (
    <StyledSpan />
  );
}

export default Spinner;

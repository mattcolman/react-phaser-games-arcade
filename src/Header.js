import React from 'react';
import glam from 'glamorous';

const HeaderDiv = glam.div({
  width: '100%',
  minHeight: 40,
  backgroundColor: 'pink',
  display: 'flex',
  alignItems: 'center',
  textTransform: 'uppercase',
  fontSize: '1.3em',
});

const Title = glam.span({
  paddingLeft: 10,
});

export default function Header() {
  return (
    <HeaderDiv>
      <Title>
        React + Phaser + Webpack = Games Arcade!
      </Title>
    </HeaderDiv>
  );
}

import React from 'react';
import glam from 'glamorous';
import colorUtils from 'color';
import { Link, NavLink } from 'react-router-dom';

const SidebarDiv = glam.div(({ width }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width,
  height: '100vh',
  backgroundColor: 'red',
}));

const Logo = glam.div({
  width: '100%',
  height: 100,
  backgroundColor: 'blue',
});

const GameButton = glam.div({
  height: 30,
  width: '100%',
  backgroundColor: colorUtils('white').alpha(0.3).string(),
  borderBottom: '1px solid black',
  display: 'flex',
  alignItems: 'center',
});

const StyledNavLink = glam(NavLink)({
  paddingLeft: 10,
  color: 'white',
  textTransform: 'uppercase',
  textDecoration: 'none',
  '&.selected': {
    color: 'blue',
  },
});

export default function Sidebar({
  games,
  width,
}) {
  return (
    <SidebarDiv width={width}>
      <Link to="/home">
        <Logo />
      </Link>
      {games.map(game => (
        <GameButton key={game.name}>
          <StyledNavLink to={game.url} activeClassName="selected">{game.name}</StyledNavLink>
        </GameButton>
      ))}
    </SidebarDiv>
  );
}

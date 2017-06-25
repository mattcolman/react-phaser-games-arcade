import React from 'react';
import Helmet from 'react-helmet';
import glam from 'glamorous';
import Header from './Header';
import Sidebar from './Sidebar';

const sideBarWidth = 200;
const bodyPadding = sideBarWidth + 10;
const Background = glam.div({
  backgroundColor: 'grey',
  position: 'absolute',
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
});
const AppBodyWrapper = glam.div({
  // width: '100%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  zIndex: 10,
  position: 'relative',
  paddingLeft: bodyPadding,
});
const AppBody = glam.div({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  // height: '100%',
});
const SidebarContainer = glam.div({
  position: 'absolute',
  top: 0,
  left: 0,
  width: sideBarWidth,
  height: '100vh',
});
const Footer = glam.div({
  width: '100%',
  minHeight: 30,
  backgroundColor: 'blue',
  paddingLeft: bodyPadding,
});

const games = [
  { name: 'game 1', url: '/game/fidget-spinner' },
  { name: 'game 2', url: '/game/2' },
  { name: 'game 3', url: '/game/3' },
];

export default function App({
  children,
}) {
  return (
    <div>
      <Helmet titleTemplate="%s | Games Arcade" />
      <Background />
      <AppBodyWrapper>
        <AppBody>
          <Header />
          {children}
        </AppBody>
        <Sidebar
          games={games}
          width={sideBarWidth}
        />
        <Footer
        />
      </AppBodyWrapper>
    </div>
  );
}

import React from 'react';
import Helmet from 'react-helmet';
import glam from 'glamorous';
import Header from './Header';

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
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  zIndex: 10,
  position: 'relative',
  paddingLeft: bodyPadding,
});
const AppBody = glam.div({
  flexGrow: 1,
});
const Sidebar = glam.div({
  position: 'absolute',
  top: 0,
  left: 0,
  width: sideBarWidth,
  height: '100vh',
  backgroundColor: 'red',
});
const Footer = glam.div({
  width: '100vw',
  minHeight: 30,
  backgroundColor: 'blue',
  paddingLeft: bodyPadding,
});

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
        />
        <Footer
        />
      </AppBodyWrapper>
    </div>
  );
}

import React from 'react';
import { render } from 'react-dom';
import Main from './Main';

const mountPoint = document.getElementById('app');

render(<Main />, mountPoint);

if (module.hot) {
  module.hot.accept('./Main', () => {
    const NextRoot = require('./Main').default; // eslint-disable-line global-require
    render(<NextRoot />, mountPoint);
  });
}

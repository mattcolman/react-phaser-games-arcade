import React from 'react';
import { createBrowserHistory } from 'history';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './styles/site.less';
import App from './App';
import Home from './Home';
import FidgetSpinner from './games/fidgetSpinner/FidgetSpinner';
import Pong from './games/pong/Pong';
import NotFound from './NotFound';

export default function Main() {
  const history = createBrowserHistory();
  return (
    <BrowserRouter history={history}>
      <App>
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/home" component={Home} />
          <Route path="/game/fidget-spinner" component={FidgetSpinner} />
          <Route path="/game/pong" component={Pong} />
          <Route path="*" component={NotFound} />
        </Switch>
      </App>
    </BrowserRouter>
  );
}

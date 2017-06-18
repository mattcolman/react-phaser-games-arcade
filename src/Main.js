import React from 'react';
import { createBrowserHistory } from 'history';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './styles/site.less';
import App from './App';
import Home from './Home';
import GameScene from './GameScene';
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
          <Route path="/game/:id" component={GameScene} />
          <Route path="*" component={NotFound} />
        </Switch>
      </App>
    </BrowserRouter>
  );
}

import React from 'react';
import { createBrowserHistory } from 'history';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import App from './App';
import Home from './Home';
import GameScene from './GameScene';
import NotFound from './NotFound';

export default function Main() {
  const history = createBrowserHistory();
  return (
    <App>
      <BrowserRouter history={history}>
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/home" component={Home} />
          <Route path="/:gameId" component={GameScene} />
          <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </App>
  );
}

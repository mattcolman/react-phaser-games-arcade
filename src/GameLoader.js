// @flow

import React, { Component } from 'react';
import glam, { Span } from 'glamorous';
import SuperLoader from './components/commons/SuperLoader';

type Props = {
  gameId: string,
};

type State = {
  isLoading: boolean,
  gameActuallyReady: boolean,
};

// use bundle-loader because it's slightly easier to handle lazy loading.
// you could easily replace this with dynamic import.
const Games = {
  'fidget-spinner': require("bundle-loader?lazy&name=fidgetspinner!./games/fidgetSpinner/src/index.js"),
  'pong': require("bundle-loader?lazy&name=pong!./games/pong/src/index.js"),
};

const MainDiv = glam.div({
  flexGrow: 1,
  height: '100%',
  minHeight: '100%',
  display: 'flex',
  flexDirection: 'column',
});

const GameDiv = glam.div(props => ({
  backgroundColor: 'orange',
  flexGrow: 1,
  justifyContent: 'center',
  display: 'flex',
  opacity: props.hide ? 0 : 1,
}));

class GameLoader extends Component {

  props: Props;
  state: State = {
    isLoading: true,
    gameActuallyReady: false,
  };

  componentWillMount() {
    this.loadNewGame(this.props.gameId);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.gameId !== this.props.gameId) {
      this.loadNewGame(nextProps.gameId);
    }
  }

  componentWillUnmount() {
    if (this.game) this.game.destroy();
  }

  game: ?Object = null;
  parent: any;

  loadNewGame = (gameId: string) => {
    if (this.game) this.game.destroy();
    this.game = null;
    this.setState({ isLoading: true });

    if (Games.hasOwnProperty(gameId)) {
      Games[gameId]((module) => {
        const create = module.default;
        this.game = create(this.parent);
        this.setState({ isLoading: false });
      });
    } else {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { gameId } = this.props;
    const {
      gameActuallyReady,
      isLoading,
    } = this.state;
    return (
      <MainDiv id="mainDiv">
        {!gameActuallyReady && (
          <SuperLoader
            isLoaded={!isLoading}
            delay={4}
            onComplete={() => this.setState({ gameActuallyReady: true })}
            title="game"
          />
        )}
        {!isLoading && !this.game && (
          <Span marginTop={30}>Game not found :(</Span>
        )}
        <GameDiv hide={!gameActuallyReady} innerRef={(ref) => { this.parent = ref; }} />
      </MainDiv>
    );
  }
}

export default GameLoader;

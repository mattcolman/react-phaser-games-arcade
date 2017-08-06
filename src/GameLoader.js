// @flow

import React, { Component } from 'react';
import glam, { Span } from 'glamorous';
import SuperLoader from './components/commons/SuperLoader';
import loadPhaser from './components/commons/loadPhaser';

type Props = {
  gameId: string,
};

type State = {
  isGameLoaded: boolean,
  isPhaserLoaded: boolean,
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
  position: 'relative',
});

const GameDiv = glam.div(props => ({
  backgroundColor: 'orange',
  flexGrow: 1,
  justifyContent: 'center',
  display: 'flex',
  opacity: props.hide ? 0 : 1,
  position: 'absolute',
  width: '100%',
  height: '100%',
}));

class GameLoader extends Component {

  props: Props;
  state: State = {
    isGameLoaded: false,
    isPhaserLoaded: window.Phaser,
  };

  componentWillMount() {
    if (!window.Phaser) {
      loadPhaser().then(() => {
        this.loadNewGame(this.props.gameId);
        // this.setState({ isPhaserLoaded: true });
      });
    } else {
      this.loadNewGame(this.props.gameId);
    }
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
    this.setState({ isGameLoaded: false });
    console.log('new game', gameId)
    if (Games.hasOwnProperty(gameId)) {
      Games[gameId]((module) => {
        const create = module.default;
        this.game = create(this.parent);
        console.log('what the game', this.game)
        // this.setState({ isGameLoaded: true });
      });
    } else {
      // this.setState({ isGameLoaded: true });
    }
  }

  render() {
    const { gameId } = this.props;
    const {
      isPhaserLoaded,
      isGameLoaded,
    } = this.state;
    return (
      <MainDiv id="mainDiv">
        {!(isPhaserLoaded && isGameLoaded) && (
          <div>
            {!isPhaserLoaded && (
              <SuperLoader
                delay={1}
                onComplete={() => this.setState({ isPhaserLoaded: true })}
                title="phaser"
              />
            )}
            {!isGameLoaded && isPhaserLoaded && (
              <SuperLoader
                delay={1}
                onComplete={() => this.setState({ isGameLoaded: true })}
                title="game"
              />
            )}
          </div>
        )}
        <GameDiv hide={!isGameLoaded || !isPhaserLoaded} innerRef={(ref) => { this.parent = ref; }} />
        {isGameLoaded && !this.game && (
          <Span position="relative" marginTop={30}>Game not found :(</Span>
        )}
      </MainDiv>
    );
  }
}

export default GameLoader;

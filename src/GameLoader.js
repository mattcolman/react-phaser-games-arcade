// @flow

import React, { Component } from 'react';
import glam from 'glamorous';
import Spinner from 'src/components/commons/Spinner';

type Props = {
  gameId: string,
};

type State = {
  isLoading: boolean,
};

// use bundle-loader because it's slightly easier to handle lazy loading.
// you could easily replace this with dynamic import.
const Games = {
  'fidget-spinner': require("bundle-loader?lazy&name=fidgetspinner!./games/fidgetSpinner/src/index.js"),
  'pong': require("bundle-loader?lazy&name=pong!./games/pong/src/index.js"),
};

const GameDiv = glam.div({
  backgroundColor: 'orange',
  flexGrow: 1,
  height: '100%',
  minHeight: '100%',
  display: 'flex',
  justifyContent: 'center',
});

class GameLoader extends Component {

  props: Props;
  state: State = { isLoading: true };

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

    Games[gameId]((module) => {
      const create = module.default;
      this.game = create(this.parent);
      this.setState({ isLoading: false });
    });
  }

  render() {
    const { isLoading } = this.state;
    return (
      <GameDiv innerRef={(ref) => { this.parent = ref; }}>
        {isLoading && (
          <Spinner />
        )}
      </GameDiv>
    );
  }
}

export default GameLoader;

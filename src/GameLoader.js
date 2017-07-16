import React, { Component } from 'react';
import glam from 'glamorous';

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

  state = { loading: true };

  componentWillMount() {
    this.loadNewGame(this.props.gameId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.gameId !== this.props.gameId) {
      this.loadNewGame(nextProps.gameId);
    }
  }

  componentWillUnmount() {
    if (this.game) this.game.destroy();
  }

  loadNewGame = (gameId) => {
    if (this.game) this.game.destroy();
    this.game = null;
    this.setState({ loading: true });

    Games[gameId]((module) => {
      const create = module.default;
      this.game = create(this.parent);
      this.setState({ loading: false });
    });
  }

  render() {
    if (this.loading) return null; // replace with spinner
    return (
      <GameDiv innerRef={(ref) => { this.parent = ref; }} />
    );
  }
}

export default GameLoader;

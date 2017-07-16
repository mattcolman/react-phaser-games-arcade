import React, { Component } from 'react';
import glam from 'glamorous';
import scriptjs from 'scriptjs';
import FidgetSpinner from './games/fidgetSpinner/FidgetSpinner';
import Pong from './games/pong/Pong';

const GameDiv = glam.div({
  backgroundColor: 'orange',
  flexGrow: 1,
  height: '100%',
  minHeight: '100%',
  display: 'flex',
  justifyContent: 'center',
});

const Games = {
  'fidget-spinner': FidgetSpinner,
  'pong': Pong,
};

class GameScene extends Component {

  state = { phaserReady: false };

  componentDidMount() {
    scriptjs(['https://cdnjs.cloudflare.com/ajax/libs/phaser/2.6.2/phaser.min.js'], 'phaser')
    scriptjs.ready('phaser', () => {
      this.setState({ phaserReady: true });
    });
  }

  render() {
    const { match: { params } } = this.props;
    const { phaserReady } = this.state;
    if (!phaserReady) return null;
    const Comp = Games[params.gameId];
    return (
      <Comp />
    );
  }
}

export default GameScene;

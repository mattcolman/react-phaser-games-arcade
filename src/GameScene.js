// @flow

import React, { Component } from 'react';
import scriptjs from 'scriptjs';
import GameLoader from './GameLoader';

type Props = {
  match: { params: { gameId: string }},
};

class GameScene extends Component {
  props: Props;
  state = { phaserReady: window.Phaser };

  componentWillMount() {
    if (!window.Phaser) {
      scriptjs(['./phaser.min.js'], 'phaser');
      scriptjs.ready('phaser', () => {
        this.setState({ phaserReady: true });
      });
    }
  }

  render() {
    const { match: { params } } = this.props;
    const { phaserReady } = this.state;
    if (!phaserReady) return null; // replace with spinner
    return (
      <GameLoader gameId={params.gameId} />
    );
  }
}

export default GameScene;

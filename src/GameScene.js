import React, { Component } from 'react';
import scriptjs from 'scriptjs';
import GameLoader from './GameLoader';

class GameScene extends Component {

  state = { phaserReady: false };

  componentDidMount() {
    if (window.Phaser) {
      // already loaded Phaser
      this.setState({ phaserReady: true });
    } else {
      scriptjs(['https://cdnjs.cloudflare.com/ajax/libs/phaser/2.6.2/phaser.min.js'], 'phaser')
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

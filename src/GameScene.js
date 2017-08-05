// @flow

import React, { Component } from 'react';
import scriptjs from 'scriptjs';
import GameLoader from './GameLoader';
import SuperLoader from './components/commons/SuperLoader';

type Props = {
  match: { params: { gameId: string }},
};

class GameScene extends Component {
  props: Props;
  state = {
    phaserReady: window.Phaser,
    phaserActuallyReady: false,
  };

  componentWillMount() {
    if (!window.Phaser) {
      this.phaserPromise = new Promise((resolve) => {
        scriptjs(['./phaser.min.js'], 'phaser');
        scriptjs.ready('phaser', () => {
          resolve();
        });
      }).then(() => {
        this.setState({ phaserReady: true });
      });
    }
  }

  render() {
    const { match: { params } } = this.props;
    const { phaserReady, phaserActuallyReady } = this.state;
    if (!phaserActuallyReady) {
      return (
        <SuperLoader
          isLoaded={phaserReady}
          delay={4}
          onComplete={() => this.setState({ phaserActuallyReady: true })}
          title="phaser"
        />
      );
    }
    return (
      <GameLoader gameId={params.gameId} />
    );
  }
}

export default GameScene;

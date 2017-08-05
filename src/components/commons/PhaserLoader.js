// @flow

import React, { Component } from 'react';
import scriptjs from 'scriptjs';
import SuperLoader from './SuperLoader';

class PhaserLoader extends Component {
  state = {
    isLoading: !window.Phaser,
  };

  componentWillMount() {
    if (!window.Phaser) {
      scriptjs(['./phaser.min.js'], 'phaser');
      scriptjs.ready('phaser', () => {
        this.setState({ phaserReady: true });
      });
    }
  }

  render() {
    const { isLoading } = this.state;
    return (
      <SuperLoader
        isLoaded={!isLoading}
        delay={4}
        onComplete={() => this.setState({ isLoading: false })}
        title="phaser"
      />
    );
  }
}

export default PhaserLoader;

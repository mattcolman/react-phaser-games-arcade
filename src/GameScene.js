// @flow

import React, { Component } from 'react';
import GameLoader from './GameLoader';

type Props = {
  match: { params: { gameId: string }},
};

class GameScene extends Component {
  props: Props;

  render() {
    const { match: { params } } = this.props;
    return (
      <GameLoader gameId={params.gameId} />
    );
  }
}

export default GameScene;

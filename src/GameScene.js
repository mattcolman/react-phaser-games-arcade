import React, { Component } from 'react';
import create from './games/test/src/index';
class GameScene extends Component {

  componentDidMount() {
    create(this.parent);
  }

  render() {
    const { match: { params } } = this.props;
    console.log('oh hi params', params);
    return (
      <div ref={(ref) => { this.parent = ref; }} />
    );
  }
}

export default GameScene;

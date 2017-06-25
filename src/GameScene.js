import React, { Component } from 'react';
import glam from 'glamorous';
import create from './games/test/src/index';

const GameDiv = glam.div({
  backgroundColor: 'orange',
  flexGrow: 1,
  height: '100%',
  minHeight: '100%',
  display: 'flex',
  justifyContent: 'center',
});

class GameScene extends Component {

  componentDidMount() {
    create(this.parent);
  }

  render() {
    const { match: { params } } = this.props;
    console.log('oh hi params', params);
    return (
      <GameDiv innerRef={(ref) => { this.parent = ref; }} />
    );
  }
}

export default GameScene;

import React, { Component } from 'react';
import glam from 'glamorous';

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
    import(/* webpackChunkName: "game" */ './games/test/src/index').then((module) => {
      const create = module.default;
      create(this.parent);
    })
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

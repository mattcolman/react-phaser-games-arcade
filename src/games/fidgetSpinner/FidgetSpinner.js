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

class FidgetSpinner extends Component {

  componentDidMount() {
    import(/* webpackChunkName: "fidget-spinner" */ './src/index').then((module) => {
      const create = module.default;
      this.game = create(this.parent);
    })
  }

  componentWillUnmount() {
    if (this.game) {
      console.log('kill fidget-spinner');
      this.game.destroy();
    }
  }

  render() {
    return (
      <GameDiv innerRef={(ref) => { this.parent = ref; }} />
    );
  }
}

export default FidgetSpinner;

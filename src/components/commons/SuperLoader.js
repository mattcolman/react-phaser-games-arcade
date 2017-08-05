// @flow

import React, { Component } from 'react';
import glam, { Span } from 'glamorous';
import { css } from 'glamor';
import { TweenMax } from 'gsap';

type Props = {
  delay: number,
  isLoaded: boolean,
  onComplete: () => void,
  title: string,
};

const SuperLoaderDiv = glam.div({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  color: 'white',
  paddingLeft: 10,
});

const Bar = glam.div(props => ({
  height: 30,
  transform: `scaleX(${props.percent}) translateZ(0)`,
  transformOrigin: 'left',
  width: '100%',
  backgroundColor: 'green',
  position: 'absolute',
  top: 0,
  left: 0,
}));

class SuperLoader extends Component {
  props: Props;
  state = { progress: 0 };
  static timer: ?TweenMax = null;

  componentDidMount() {
    const {
      delay,
    } = this.props;
    console.log('didmount')
    this.timer = TweenMax.to(this.barRef, delay, { onUpdate: this.handleUpdate, onUpdateParams: ['{self}'], onComplete: this.handleComplete });
  }

  componentWillUnmount() {
    if (this.timer) this.timer.kill();
    this.timer = null;
  }

  handleUpdate = (tween: TweenMax) => {
    this.setState({ progress: tween.progress() });
  }

  handleComplete = () => {
    const { onComplete } = this.props;
    console.log('handleComplete')
    onComplete();
  }

  render() {
    const {
      title,
    } = this.props;
    const { progress } = this.state;
    return (
      <SuperLoaderDiv>
        <Bar innerRef={ref => this.barRef = ref} percent={progress} />
        <Span position="relative">
          {progress === 1 ? `Loaded ${title}` : `Loading ${title}`}
        </Span>
      </SuperLoaderDiv>
    );
  }
}

export default SuperLoader;

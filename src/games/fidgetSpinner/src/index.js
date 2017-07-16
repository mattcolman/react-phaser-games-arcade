import 'gsap';
import BootState from './states/Boot';

function create(parent) {
  const WORLD_WIDTH = 1024;
  const WORLD_HEIGHT = 768;

  const config = {
    transparent: false,
    width: WORLD_WIDTH,
    height: WORLD_HEIGHT,
    parent,
    state: BootState,
    renderer: Phaser.AUTO,
  };

  const game = new Phaser.Game(config);
  return game;
}

export default create;

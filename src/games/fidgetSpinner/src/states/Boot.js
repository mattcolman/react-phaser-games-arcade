import ManifestLoader from 'phaser-manifest-loader';
import Main from './Main';

const req = require.context('../../assets', true, /.*\.png|json|ttf|woff|woff2|xml|mp3|jpg|jpeg$/);

const manifest = {
  audio: [
  ],
  spritesheets: [
  ],
  images: [
    'circle',
    'poo',
    'sunnies',
    'fire',
    'monkey',
    'poo_back',
    'poo_particle',
  ],
  bitmap_fonts: [
  ],
};

export default class extends Phaser.State {

  create() {
    console.log('boot me up');
    const loader = this.game.plugins.add(ManifestLoader, req);
    loader.loadManifest(manifest).then(() => {
      this.setupStage();
      this.addStates();
      this.startGame();
    });
    this.game.manifestLoader = loader;
  }

  setupStage() {
    this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    this.scale.setResizeCallback(this.scaleGame);
    this.scaleGame();
  }

  scaleGame = () => {
    const xScale = this.game.parent.offsetWidth / this.game.width;
    const yScale = this.game.parent.offsetHeight / this.game.height;
    const scale = Math.min(xScale, yScale);
    this.scale.setUserScale(scale, scale);
  }

  addStates() {
    this.state.add('Main', Main);
  }

  startGame() {
    this.state.start('Main');
  }

}

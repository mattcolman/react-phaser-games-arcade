import Phaser from 'phaser';
import ManifestLoader from 'phaser-manifest-loader';
import Main from './Main';

const req = require.context('../../assets', true, /.*\.png|json|ttf|woff|woff2|xml|mp3|jpg|jpeg$/);

const manifest = {
  audio: [
  ],
  spritesheets: [
  ],
  images: [
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
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.input.maxPointers = 1;
    this.scale.refresh();
  }

  addStates() {
    this.state.add('Main', Main);
  }

  startGame() {
    this.state.start('Main');
  }

}

import Phaser from 'phaser';

export default class extends Phaser.State {
  create() {
    console.log('main state!!');
    const txt = this.add.text(this.world.centerX, this.world.centerY, "OH HI FIDGET SPINNER", {
      font: '24px Arial',
      fill: '#00ff00',
    });
    txt.anchor.set(0.5);
  }
}

export default class extends Phaser.State {
  create() {
    console.log('main state!!');
    const txt = this.add.text(this.world.centerX, this.world.centerY, "OH HI GAME 2", {
      font: '24px Arial',
      fill: '#ffff00',
    });
    txt.anchor.set(0.5);
  }
}

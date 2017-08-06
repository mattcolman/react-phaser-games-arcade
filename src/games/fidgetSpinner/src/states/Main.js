import sample from 'lodash/sample';
import without from 'lodash/without';

const JUMP_HEIGHT = 200;
const ENEMIES = [
  'fire',
  'monkey',
  'sunnies',
];

export default class extends Phaser.State {
  create() {
    console.log('main state!!');
    this.game.physics.startSystem(Phaser.Physics.P2JS);
    this.floorY = this.world.height - 100;
    this.addBackground();
    this.addPlatform();
    this.terrain = this.addTerrain();
    this.player = this.addPlayer();
    this.input.keyboard.createCursorKeys();
    this.enemies = [];
    this.spawnEnemy();


    // const pivot = this.game.add.sprite(100, 100, 'circle');
    // this.game.physics.p2.enable(pivot, false);
    // pivot.body.static = true;
    // pivot.body.clearCollision(true, true);
  }

  jump() {
    this.isJumping = true;
    new TimelineMax({ onComplete: () => this.isJumping = false })
      .to(this.player, 0.5, { y: this.floorY - JUMP_HEIGHT, ease: Quad.easeOut })
      .to(this.player, 0.5, { y: this.floorY, ease: Quad.easeIn });
  }

  spawnEnemy() {
    setTimeout(() => {
      this.spawnEnemy();
    }, 3000 + Math.random() * 3000);
    this.enemies.push(this.addEnemy());
  }

  addBackground() {
    const rect = this.add.graphics(0, 0);
    rect.beginFill(0x999999);
    rect.drawRect(0, 0, this.world.width, this.world.height);
  }

  addPlatform() {
    const rect = this.add.graphics(0, this.floorY);
    rect.beginFill(0x333333);
    rect.drawRect(0, 0, this.world.width, 100);
  }

  makeTerrainBmd() {
    const w = 200;
    const bmd = this.make.bitmapData(w, w);
    const c = bmd.ctx;
    c.fillStyle = '#666666';
    c.moveTo(0, w);
    c.lineTo(w / 2, 0);
    c.lineTo(w, w);
    c.lineTo(0, w);
    c.fill();
    return bmd;
  }

  addTerrain() {
    return this.add.tileSprite(0, this.world.height - 300, this.world.width, 200, this.makeTerrainBmd());
  }

  addPlayer() {
    const player = this.add.sprite(200, this.floorY, 'poo')
    player.anchor.set(0, 1);
    return player;
  }

  addEnemy() {
    const w = 100;
    const enemy = this.add.sprite(this.world.width, this.floorY, sample(ENEMIES));
    enemy.width = w;
    enemy.height = w;
    enemy.anchor.set(0, 1);
    return enemy;
  }

  removeEnemy(enemy) {
    this.enemies = without(this.enemies, enemy);
    enemy.destroy();
  }

  update() {
    this.terrain.tilePosition.x += 1;
    this.enemies.forEach((enemy) => {
      enemy.x -= 3;
      if (enemy.x < -enemy.width) {
        this.removeEnemy(enemy);
      }
    });
    if (this.input.keyboard.isDown(Phaser.KeyCode.UP)) {
      if (!this.isJumping) this.jump();
    }
    if (this.input.keyboard.isDown(Phaser.KeyCode.DOWN)) {
      this.player.scale.y = 0.5;
    } else {
      this.player.scale.y = 1;
    }
    if (this.input.keyboard.isDown(Phaser.KeyCode.LEFT)) {
      this.player.x -= 10;
    }
    if (this.input.keyboard.isDown(Phaser.KeyCode.RIGHT)) {
      this.player.x += 10;
    }
  }
}

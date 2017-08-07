import sample from 'lodash/sample';
import without from 'lodash/without';
import times from 'lodash/times';
import random from 'lodash/random';

const JUMP_HEIGHT = 200;
const ENEMIES = [
  'fire',
  'monkey',
  'sunnies',
];

export default class extends Phaser.State {
  create() {
    console.log('main state!!');
    this.velocity = 0.8;
    this.game.physics.startSystem(Phaser.Physics.P2JS);
    this.floorY = this.world.height - 100;
    this.addBackground();
    this.addPlatform();
    this.terrain = this.addTerrain();
    this.enemyGrp = this.add.group();
    this.player = this.addPlayer();
    this.input.keyboard.createCursorKeys();
    this.enemies = [];
    this.spawnEnemy();

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.emitter = this.add.emitter(0, 0, 100);
    this.emitter.makeParticles('poo_particle');
    this.emitter.gravity = 900;
    this.emitter.setAlpha(0.8, 1);
    this.emitter.minParticleScale = 0.2;
    this.emitter.maxParticleScale = 0.8;
    const SPEED = 400;
    this.emitter.maxParticleSpeed = {x: SPEED, y: SPEED};
    this.emitter.minParticleSpeed = {x: -SPEED, y: -SPEED};


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
    }, 2000 + Math.random() * 3000);
    this.enemies.push(this.addEnemy());
  }

  splat(bounds) {
    //  Position the emitter where the mouse/touch event was
    this.emitter.x = bounds.x;
    this.emitter.y = bounds.y;

    //  The first parameter sets the effect to "explode" which means all particles are emitted at once
    //  The second gives each particle a 2000ms lifespan
    //  The third is ignored when using burst/explode mode
    //  The final parameter (10) is how many particles will be emitted in this single burst
    this.emitter.start(true, 2000, null, 30);
  }

  addSinglePooParticle(pt) {
    const p = this.game.add.image(pt.x, pt.y, 'poo_particle');
    p.scale.set(random(0.3, 0.7));
    p.alpha = random(0.2, 1);
  }

  addBackground() {
    const rect = this.add.graphics(0, 0);
    rect.beginFill(0x999999);
    rect.drawRect(0, 0, this.world.width, this.world.height);
  }

  addPlatform() {
    const rect = this.add.graphics(0, this.floorY);
    rect.beginFill(0x333333);
    rect.drawRect(0, 0, this.world.width, 50);
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
    const terrain = this.add.tileSprite(0, this.world.height - 300, this.world.width, 200, 'poo_back');
    terrain.alpha = 0.5;
    return terrain;
  }

  addPlayer() {
    const player = this.add.sprite(200, this.floorY, 'poo')
    player.anchor.set(0, 1);
    return player;
  }

  addEnemy() {
    const w = 100;
    const enemyType = sample(ENEMIES);
    const enemy = this.add.sprite(this.world.width, enemyType === 'fire' ? this.floorY - 100 : this.floorY, enemyType, null, this.enemyGrp);
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
    this.terrain.tilePosition.x -= this.velocity;
    this.enemies.forEach((enemy) => {
      enemy.x -= this.velocity * 1.5;
      if (this.player.overlap(enemy) && !enemy.isHit) {
        enemy.isHit = true;
        this.splat(enemy.getBounds());
      }
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
    this.velocity += 0.01;
  }
}

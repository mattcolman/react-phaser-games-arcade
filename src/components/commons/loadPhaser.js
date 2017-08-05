import scriptjs from 'scriptjs';

export default function loadPhaser() {
  return new Promise((resolve) => {
    scriptjs(['./phaser.min.js'], 'phaser');
    scriptjs.ready('phaser', () => {
      resolve();
    });
  });
}

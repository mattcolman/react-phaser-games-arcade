const fs = require('fs');
const handlebars = require('handlebars');
var ncp = require('ncp').ncp;

ncp.limit = 16;

const name = 'newGame';
const dir = `src/games/${name}`;

ncp('src/games/example', `src/games/${name}`, function (err) {
  if (err) {
    return console.error(err);
  }
  console.log('done!');
});

// const source = fs.readFileSync('template/Boot.hbs', 'utf-8');
// const template = handlebars.compile(source);
//
// const bootContents = template({ title: 'Wohooo!' });
//
// if (!fs.existsSync(dir)) {
//   fs.mkdirSync(dir);
//   fs.mkdirSync(`${dir}/src`);
// }
//
// fs.writeFile('Boot.js', bootContents, err => {
//   if (err) {
//     return console.error(`Autsch! Failed to store template: ${err.message}.`);
//   }
//   console.log('Saved template!');
// });

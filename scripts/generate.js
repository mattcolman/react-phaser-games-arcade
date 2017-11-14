const fs = require('fs');
const handlebars = require('handlebars');
const ncp = require('ncp').ncp;

ncp.limit = 16;

const name = process.argv[2];

if (!name) {
  console.error('generate what??');
}

ncp('src/games/example', `src/games/${name}`, err => {
  if (err) {
    return console.error(err);
  }
  console.log(`Success! ${name} generated`);
});

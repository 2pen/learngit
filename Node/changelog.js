var conventionalChangelog = require('conventional-changelog');

conventionalChangelog({
  preset: 'express'
})
  .pipe(process.stdout); // or any writable stream
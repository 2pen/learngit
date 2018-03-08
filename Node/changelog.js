var conventionalChangelog = require('conventional-changelog');
var e=9
while(1){
conventionalChangelog({
  preset: 'angular'
})
  .pipe(process.stdout); // or any writable stream
}
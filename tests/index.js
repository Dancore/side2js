var path = require('path');
var fs = require('fs');
var cd = path.normalize(__dirname); // current dir
// console.log('cd: ' + cd);
const tests = [];
// var test = {};

fs.readdirSync(cd).forEach(function(file) {
  if(file == 'index.js') return;    // skip index, this file.
  if(!file.endsWith('.js')) return; // only *.js files.
  var tf = path.join(cd, file);
  console.log('req: ' + tf);
  tests.push(require(tf));  
});

// console.log(Object.entries(tests));
// tests.forEach( obj => { Object.entries(obj).forEach(( [key, fnk]) => { 
//     console.log(`test name: ${key}`); // + '\ntest function:\n' + fnk );
//   });
// });

module.exports = tests;

const fs = require('fs');

fs.readFile('input.txt', 'utf8', function(err, contents) {
    let fuel = 0;
    console.log(fuel = contents.split("\n").map(v => Math.floor(v/3) - 2).reduce((a,b)=>a+b));
});
 
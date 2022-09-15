const fs = require('fs');

fs.readFile('input.txt', 'utf8', function(err, contents) {
    let sum = 0;
    let input = contents.split("\n");
    for(let i=0; i<input.length; i++){
        let fuel = Math.floor(input[i]/3)-2;
        let plus = Math.floor(fuel/3)-2;
        while(plus > 0){
            fuel += plus;
            plus = Math.floor(plus/3)-2;
        }
        
        sum += fuel;
    }
    console.log(sum);
});
 
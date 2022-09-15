const fs = require('fs');
let input;
fs.readFile(__dirname+'\\input.txt', 'utf8', function(err, contents) {
    input = contents;
    let w = 25;
    let h = 6;
    let min = Infinity;
    let out = 0;
    let sums = [];
    for(let i=0; i<input.length; i++){
        if(sums[Number(input[i])] == undefined)sums[input[i]] = 1;
        else sums[input[i]]++;

        if((i+1)%(w*h) == 0){
            if(sums[0] < min){
                min = sums[0];
                out = sums[1] * sums[2];
            }
            sums = [];
        }
    }
    console.log(out);
});

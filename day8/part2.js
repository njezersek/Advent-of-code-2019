const fs = require('fs');
let input;
fs.readFile(__dirname+'\\input.txt', 'utf8', function(err, contents) {
    input = contents;
    let w = 25;
    let h = 6;
    let image = new Array(w*h).fill(2);
    for(let i=0; i<input.length; i++){
        if(input[i] == 0 && image[i%(w*h)] == 2)image[i%(w*h)] = 0;
        if(input[i] == 1 && image[i%(w*h)] == 2)image[i%(w*h)] = 1;
    }

    let out = "";
    for(let x = 0; x<w*h; x++){
        out += image[x] == 1 ? "#" : ".";
        if((x+1) % w == 0)out += "\n";
    }
    console.log(out);
});

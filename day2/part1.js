const fs = require('fs');

fs.readFile('input.txt', 'utf8', function(err, contents) {
    let mem = contents.split(",").map(a=>Number(a));
    let i = 0;
    mem[1] = 12;
    mem[2] = 2;
    while(true){
        let a = mem[i+1];
        let b = mem[i+2];
        let d = mem[i+3];
        if(mem[i] == 1){
            mem[d] = mem[a]+mem[b];
        }
        else if(mem[i] == 2){
            mem[d] = mem[a]*mem[b];
        }
        else if(mem[i] == 99){
            break;
        }
        i+=4;
    }

    console.log(mem[0]);
});
 
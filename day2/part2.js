const fs = require('fs');

fs.readFile('input.txt', 'utf8', function(err, contents) {
    for(let noun=0; noun<100; noun++){
        for(let verb=0; verb<100; verb++){
            let mem = contents.split(",").map(a=>Number(a));
            let i = 0;
            mem[1] = noun;
            mem[2] = verb;
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
            

            if(mem[0] == 19690720)console.log(100*noun+verb);

        }
    }
});
 
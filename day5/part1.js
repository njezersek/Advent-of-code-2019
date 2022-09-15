const fs = require('fs');

fs.readFile(__dirname+'\\input.txt', 'utf8', function(err, contents) {
    let mem = contents.split(",").map(a=>Number(a));
    let i = 0;
    while(true){
        let op = Number(("0000"+mem[i]).substr(-2,2));
        let amode = ("0000"+mem[i]).substr(-3,1);
        let bmode = ("0000"+mem[i]).substr(-4,1);
        let dmode = ("0000"+mem[i]).substr(-5,1);
        let a = mem[i+1];
        let b = mem[i+2];
        let d = mem[i+3];

        //console.log(i, op, amode, bmode, dmode, a, b, d);

        if(op == 1){
            a = amode == "1" ? a : mem[a];
            b = bmode == "1" ? b : mem[b];
            mem[d] = a+b;
            i+=4;
        }
        else if(op == 2){
            a = amode == "1" ? a : mem[a];
            b = bmode == "1" ? b : mem[b];
            mem[d] = a*b;
            i+=4;
        }
        else if(op == 3){
            mem[a] = 1;
            i+=2;
        }
        else if(op == 4){
            a = amode == "1" ? a : mem[a];
            console.log(a)
            i+=2;
        }
        else if(op == 99){
            break;
        }
    }

    console.log(mem[0]);
});
 
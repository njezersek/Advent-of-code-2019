const fs = require('fs');
let input;
fs.readFile(__dirname+'\\input.txt', 'utf8', function(err, contents) {
    input = contents;
    let max = 0;
    for(let a=0; a<5; a++){
    for(let b=0; b<5; b++){
    for(let c=0; c<5; c++){
    for(let d=0; d<5; d++){
    for(let e=0; e<5; e++){
        let params = [a,b,c,d,e];
        let ok = true;
        for(let i=0; i<params.length; i++){
        for(let j=0; j<params.length; j++){
            if(i!=j && params[i] == params[j])ok = false;
        }}
        if(ok){
            let thrust = thrusters(params);

            if(thrust > max)max = thrust;
        }
        //console.log(thrust);
    }}}}}
    console.log(max);
});

//24496

function thrusters(values){
    let sum = 0;
    let prev = 0;
    for(v of values){
        prev = intcomp(v, prev);
    }
    return prev;
}

function intcomp(phase, inputValue){
    let mem = input.split(",").map(a=>Number(a));
    let i = 0;
    let phaseinst = true;
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
            if(phaseinst){
                mem[a] = phase;
                phaseinst = false;
            }
            else mem[a] = inputValue;
            i+=2;
        }
        else if(op == 4){
            a = amode == "1" ? a : mem[a];
            //console.log(a);
            return a;
            i+=2;
        }
        else if(op == 5){
            a = amode == "1" ? a : mem[a];
            b = bmode == "1" ? b : mem[b];
            if(a != 0){
                i = b;
            }
            else{
                i+=3;
            }
        }
        else if(op == 6){
            a = amode == "1" ? a : mem[a];
            b = bmode == "1" ? b : mem[b];
            if(a == 0){
                i = b;
            }
            else{
                i+=3;
            }
        }
        else if(op == 7){
            a = amode == "1" ? a : mem[a];
            b = bmode == "1" ? b : mem[b];
            if(a < b){
                mem[d] = 1;
            }
            else{
                mem[d] = 0;
            }
            i+=4;
        }
        else if(op == 8){
            a = amode == "1" ? a : mem[a];
            b = bmode == "1" ? b : mem[b];
            if(a == b){
                mem[d] = 1;
            }
            else{
                mem[d] = 0;
            }
            i+=4;
        }
        else if(op == 99){
            break;
        }
    }
}
 
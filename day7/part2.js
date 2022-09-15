const fs = require('fs');
let input;
fs.readFile(__dirname+'\\input.txt', 'utf8', function(err, contents) {
    input = contents;
    let max = 0;
    for(let a=5; a<10; a++){
    for(let b=5; b<10; b++){
    for(let c=5; c<10; c++){
    for(let d=5; d<10; d++){
    for(let e=5; e<10; e++){
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
    //thrusters([9,7,8,5,6]);
    console.log(max);
});

//24496

function thrusters(values){
    let amps = [];
    let prev = 0;
    let prevprev = 0;
    for(v of values){
        amps.push(new Intcomp(v));
    }
    let a = 0;
    while(true){
        prevprev = prev;
        prev = amps[a].start(prev);
        if(prev == "end"){
            break;
        }
        a = (a+1)%amps.length;
    }
    return prevprev;
}

class Intcomp{
    constructor(phase){
        this.mem = input.split(",").map(a=>Number(a));
        this.i = 0;
        this.phaseinst = true;
        this.phase = phase;
    }

    start(inputValue){
        let mem = this.mem;
        while(true){
            
            let op = Number(("0000"+mem[this.i]).substr(-2,2));
            let amode = ("0000"+mem[this.i]).substr(-3,1);
            let bmode = ("0000"+mem[this.i]).substr(-4,1);
            let dmode = ("0000"+mem[this.i]).substr(-5,1);
            let a = mem[this.i+1];
            let b = mem[this.i+2];
            let d = mem[this.i+3];
            
            //console.log(i, op, amode, bmode, dmode, a, b, d);
            
            if(op == 1){
                a = amode == "1" ? a : mem[a];
                b = bmode == "1" ? b : mem[b];
                mem[d] = a+b;
                this.i+=4;
            }
            else if(op == 2){
                a = amode == "1" ? a : mem[a];
                b = bmode == "1" ? b : mem[b];
                mem[d] = a*b;
                this.i+=4;
            }
            else if(op == 3){
                if(this.phaseinst){
                    mem[a] = this.phase;
                    this.phaseinst = false;
                }
                else mem[a] = inputValue;
                this.i+=2;
            }
            else if(op == 4){
                a = amode == "1" ? a : mem[a];
                //console.log(a);
                this.i+=2;
                return a;
            }
            else if(op == 5){
                a = amode == "1" ? a : mem[a];
                b = bmode == "1" ? b : mem[b];
                if(a != 0){
                    this.i = b;
                }
                else{
                    this.i+=3;
                }
            }
            else if(op == 6){
                a = amode == "1" ? a : mem[a];
                b = bmode == "1" ? b : mem[b];
                if(a == 0){
                    this.i = b;
                }
                else{
                    this.i+=3;
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
                this.i+=4;
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
                this.i+=4;
            }
            else if(op == 99){
                return "end";
                break;
            }
        }
    }

}
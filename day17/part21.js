const fs = require('fs');
let input;

let program = "A,A\nR,12,L,10\nR,10\nR,10\ny\n"
fs.readFile(__dirname+'\\input.txt', 'utf8', function(err, contents) {
    input = contents;
    let intcomp = new Intcomp();
    intcomp.start(0);

    //console.log(intcomp.out);

    // find intersections
    let map = intcomp.out.split("\n").map(a => a.split(""));
    let dmap = [];
    for(let y = 0; y < map.length; y++){
        for(let x = 0; x < map[y].length; x++){
            dmap[[x,y]] = map[y][x];
        }
    }

    let sum = 0;
    let out = [];
    let path = [];
    let running = true;
    let botX = 0;
    let botY = 0;
    let botD = 0; // 0 - gor, 1 - desno, 2 - dol, 3 - levo

    for(let y = 0; y < map.length; y++){
        for(let x = 0; x < map[y].length; x++){
            if(dmap[[x,y]] == "^"){
                botX = x;
                botY = y;
            }
        }
    }
    while(running){
        let fwd = false;
        let dir = 0;
        if(botD == 0){
            if(dmap[[botX, botY-1]] == "#") fwd = true;
            else if(dmap[[botX-1, botY]] == "#")dir = "L";
            else if(dmap[[botX+1, botY]] == "#")dir = "R";
            else running = false;
        }
        else if(botD == 1){
            if(dmap[[botX+1, botY]] == "#") fwd = true;
            else if(dmap[[botX, botY-1]] == "#")dir = "L";
            else if(dmap[[botX, botY+1]] == "#")dir = "R";
            else running = false;
        }
        else if(botD == 2){
            if(dmap[[botX, botY+1]] == "#") fwd = true;
            else if(dmap[[botX+1, botY]] == "#")dir = "L";
            else if(dmap[[botX-1, botY]] == "#")dir = "R";
            else running = false;
        }
        else if(botD == 3){
            if(dmap[[botX-1, botY]] == "#") fwd = true;
            else if(dmap[[botX, botY+1]] == "#")dir = "L";
            else if(dmap[[botX, botY-1]] == "#")dir = "R";
            else running = false;
        }

        if(fwd){
            if(path[path.length-1] == "L" || path[path.length-1] == "R"){
                path.push(1);
            }
            else{
                path[path.length-1]++;
            }
            if(botD == 0)botY--;
            if(botD == 1)botX++;
            if(botD == 2)botY++;
            if(botD == 3)botX--;
        }
        else if(dir){
            path.push(dir);
            if(dir == "R") botD = (botD + 1)%4;
            if(dir == "L") botD = (4+botD - 1)%4;
        }
    
    }


    console.log(path.join(","));


    // th 14639


});

class Intcomp{
    constructor(){
        this.mem = input.split(",").map(a=>Number(a));
        //this.mem[0] = 2;
        this.i = 0;
        this.base = 0;

        this.out = "";

        this.programReader = 0;
    }

    m(a){
        return this.mem[a] ? this.mem[a] : 0;
    }

    start(inputValue){
        let mem = this.mem;
        while(true){
            let op = Number(("0000"+mem[this.i]).substr(-2,2));
            let amode = ("0000"+mem[this.i]).substr(-3,1);
            let bmode = ("0000"+mem[this.i]).substr(-4,1);
            let cmode = ("0000"+mem[this.i]).substr(-5,1);

            // 0 positoin mode ... vzami stevilo na naslovu paraametra
            // 1 immediate mode ... vzami stevilo parametra
            // 2 relative mode ... vzemi stevilo na naslovu parametra + base
            
            let A = this.i + 1;
            let B = this.i + 2;
            let C = this.i + 3;
            if(amode == "0")A = mem[A] ? mem[A] : 0;
            if(bmode == "0")B = mem[B] ? mem[B] : 0;
            if(cmode == "0")C = mem[C] ? mem[C] : 0;
            if(amode == "2")A = (mem[A] ? mem[A] : 0) +this.base;
            if(bmode == "2")B = (mem[B] ? mem[B] : 0) +this.base;
            if(cmode == "2")C = (mem[C] ? mem[C] : 0) +this.base;
            
            //console.log(i, op, amode, bmode, dmode, a, b, d);
            
            if(op == 1){
                mem[C] = this.m(A) + this.m(B);
                this.i+=4;
            }
            else if(op == 2){
                mem[C] = this.m(A) * this.m(B);
                this.i+=4;
            }
            else if(op == 3){
                mem[A] = program[this.programReader++];
                this.i+=2;
            }
            else if(op == 4){
                //console.log(this.m(A));
                this.out += String.fromCharCode(this.m(A));
                this.i+=2;
                //return a;
            }
            else if(op == 5){
                if(this.m(A) != 0){
                    this.i = this.m(B);
                }
                else{
                    this.i+=3;
                }
            }
            else if(op == 6){
                if(this.m(A) == 0){
                    this.i = this.m(B);
                }
                else{
                    this.i+=3;
                }
            }
            else if(op == 7){
                if(this.m(A) < this.m(B)){
                    mem[C] = 1;
                }
                else{
                    mem[C] = 0;
                }
                this.i+=4;
            }
            else if(op == 8){
                if(this.m(A) == this.m(B)){
                    mem[C] = 1;
                }
                else{
                    mem[C] = 0;
                }
                this.i+=4;
            }
            else if(op == 9){
                this.base += this.m(A);
                this.i+=2;
            }
            else if(op == 99){
                return "end";
                break;
            }
        }
    }

}
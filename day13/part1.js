const fs = require('fs');
let input;
fs.readFile(__dirname+'\\input.txt', 'utf8', function(err, contents) {
    input = contents;
    let intcomp = new Intcomp();
    intcomp.start(0);
    let sum = 0;
    let out = "";
    for(let y=intcomp.minY-1; y<=intcomp.maxY+1; y++){
        out += "\n";
        for(let x=intcomp.minX-1; x<=intcomp.maxX+1; x++){
            if(intcomp.blocks[[x, y]] != undefined){
                out += intcomp.blocks[[x, y]] == 2 ? "#" : "";
                out += intcomp.blocks[[x, y]] == 1 ? "+" : "";
                out += intcomp.blocks[[x, y]] == 3 ? "_" : "";
                out += intcomp.blocks[[x, y]] == 4 ? "*" : "";
                out += intcomp.blocks[[x, y]] == 0 ? "." : "";
                if(intcomp.blocks[[x, y]] == 2)sum ++;
            }
            else{
                out += "-";
            }
        }
    }
    console.log(out);
    console.log(sum)
});

//1080?
class Intcomp{
    constructor(){
        this.mem = input.split(",").map(a=>Number(a));
        this.i = 0;
        this.base = 0;

        this.x = 0;
        this.y = 0;
        this.direction = 0;
        this.colorCmd = true;

        this.sum = 0;
        this.blocks = [];

        this.dispCmd = 0;
        this.tmpX;
        this.tmpY;
        this.tmpID;

        this.minX = Infinity;
        this.maxX = -Infinity;
        this.minY = Infinity;
        this.maxY = -Infinity;
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
                let input = inputValue;
                mem[A] = input;
                this.i+=2;
            }
            else if(op == 4){
                //console.log(this.m(A));
                this.i+=2;

                if(this.dispCmd == 0){
                    this.tmpX = this.m(A);
                }
                else if(this.dispCmd == 1){
                    this.tmpY = this.m(A);
                }
                else if(this.dispCmd == 2){
                    this.tmpID = this.m(A);
                    // draw tile
                    this.blocks[[this.tmpX, this.tmpY]] = this.tmpID;

                    if(this.tmpX > this.maxX)this.maxX = this.tmpX;
                    if(this.tmpY > this.maxY)this.maxY = this.tmpY;
                    if(this.tmpX < this.minX)this.minX = this.tmpX;
                    if(this.tmpY < this.minY)this.minY = this.tmpY;
                }


                this.dispCmd = (this.dispCmd + 1)%3

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
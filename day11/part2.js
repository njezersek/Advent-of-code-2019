const fs = require('fs');
let input;
fs.readFile(__dirname+'\\input.txt', 'utf8', function(err, contents) {
    input = contents;
    let intcomp = new Intcomp();
    intcomp.start(1);

    console.log(intcomp.sum);

    let sum = 0;

    let out = "";
    for(let y=-50; y<1500; y++){
        out += "\n";
        for(let x=-50; x<50; x++){
            if(intcomp.blocks[[x, y]] != undefined){
                out += intcomp.blocks[[x, y]] ? "#" : ".";
                sum ++;
            }
            else{
                out += "-";
            }
        }
    }
    console.log(out);
    console.log(sum);
});

//5286 th


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
    }

    m(a){
        return this.mem[a] ? this.mem[a] : 0;
    }

    start(inputValue){
        this.blocks[[0,0]] = 1;
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
                let input = 0;
                if(this.blocks[[this.x, this.y]] != undefined)input = this.blocks[[this.x, this.y]];
                mem[A] = input;
                this.i+=2;
            }
            else if(op == 4){
                //console.log(this.m(A));
                this.i+=2;

                if(this.colorCmd){
                    this.colorCmd = false;
                    this.color = this.m(A);

                    if(this.blocks[[this.x, this.y]] == undefined){
                        this.sum++;
                    }
                    this.blocks[[this.x, this.y]] = this.color;
                }
                else{
                    this.colorCmd = true;
                    this.direction = (4 + this.direction + (this.m(A) ? 1 : -1)) % 4;
                    if(this.direction == 0)this.y--;
                    if(this.direction == 2)this.y++;
                    if(this.direction == 1)this.x++;
                    if(this.direction == 3)this.x--;
                }

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
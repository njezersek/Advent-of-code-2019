const fs = require('fs');
let input;

fs.readFile(__dirname+'\\input.txt', 'utf8', function(err, contents) {
    input = contents;
    let sum = 0;
    let out = "";
    for(let i=0; i<50; i++){
        for(let j=0; j<50; j++){
            let intcomp = new Intcomp();
            let response = intcomp.start([i,j]);
            if(response)sum++;
            out += response;
        }
        out += "\n";
    }
    console.log(out, sum);
});

class Intcomp{
    constructor(){
        this.mem = input.split(",").map(a=>Number(a));
        this.i = 0;
        this.base = 0;

        this.out = "";

        this.inputReader = 0;
    }

    m(a){
        return this.mem[a] ? this.mem[a] : 0;
    }

    start(inputValue){
        this.inputReader = 0;
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
                mem[A] = inputValue[this.inputReader++];
                if(this.inputReader >= inputValue.length)this.inputReader = 0;
                this.i+=2;
            }
            else if(op == 4){
                //console.log(this.m(A));
                //this.out += String.fromCharCode(this.m(A));
                this.i+=2;
                return this.m(A);
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
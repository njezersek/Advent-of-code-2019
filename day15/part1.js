const fs = require('fs');
let input;
fs.readFile(__dirname+'\\input.txt', 'utf8', function(err, contents) {
    input = contents;
    let bot = new Bot(input);
    bot.explore();

    let out = "";
    for(let y=bot.minY-2; y<bot.maxY+2; y++){
        out += "\n";
        for(let x=bot.minX-2; x<bot.maxX+2; x++){
            if(x == 0 && y == 0){
                out += "X";
            }
            else{
                if(bot.map[[x,y]] == undefined)out += "-";
                else out += bot.map[[x,y]];
            }
        }
    }
    console.log(out);

    // find the shortest path
    pathfinder(bot.map);

    console.log("end");

});

function pathfinder(map){
    let x = 0;
    let y = 0;
    let i = 0;
    let que = [{x: x, y: y, i: i}];
    let visited = [];
    while(que.length > 0){
        let cell = que[0];
        if(map[[cell.x, cell.y]] == "%"){
            console.log(cell.i)
        }
        //console.log(cell.x + ", " + cell.y);
        if(map[[cell.x,cell.y-1]] != "+" && map[[cell.x,cell.y-1]] != undefined && visited[[cell.x,cell.y-1]] != 1)que.push({x: cell.x, y: cell.y-1, i: cell.i+1});
        if(map[[cell.x,cell.y+1]] != "+" && map[[cell.x,cell.y+1]] != undefined && visited[[cell.x,cell.y+1]] != 1)que.push({x: cell.x, y: cell.y+1, i: cell.i+1});
        if(map[[cell.x-1,cell.y]] != "+" && map[[cell.x-1,cell.y]] != undefined && visited[[cell.x-1,cell.y]] != 1)que.push({x: cell.x-1, y: cell.y, i: cell.i+1});
        if(map[[cell.x+1,cell.y]] != "+" && map[[cell.x+1,cell.y]] != undefined && visited[[cell.x+1,cell.y]] != 1)que.push({x: cell.x+1, y: cell.y, i: cell.i+1});

        let v = que.shift();
        visited[[v.x, v.y]] = 1;
    }
}


class Bot{
    constructor(program){
        this.x = 0;
        this.y = 0;
        
        this.map = [];
        this.paths = [];
        this.path = [];
        this.maxX = 0;
        this.maxY = 0;
        this.minX = 0;
        this.minY = 0;
        this.i = 0;

        this.intcomp = new Intcomp(program);
    }

    explore(){
        //if(this.i++ > 10000) return;
        // north
        if(this.map[[this.x, this.y-1]] == undefined)
        if(this.move(1) != 0){
            this.explore();
            this.move(2);
        }
        // south
        if(this.map[[this.x, this.y+1]] == undefined)
        if(this.move(2) != 0){
            this.explore();
            this.move(1);
        }
        // west
        if(this.map[[this.x-1, this.y]] == undefined)
        if(this.move(3) != 0){
            this.explore();
            this.move(4);
        }
        // east
        if(this.map[[this.x+1, this.y]] == undefined)
        if(this.move(4) != 0){
            this.explore();
            this.move(3);
        }
    }
    
    move(dir){
        let status = this.intcomp.start(dir);
        let vect = {x: 0, y: 0};
        if(dir == 1)vect = {x: 0, y: -1};
        if(dir == 2)vect = {x: 0, y: 1};
        if(dir == 3)vect = {x: -1, y: 0};
        if(dir == 4)vect = {x: 1, y: 0};
        
        let marker = "$";
        if(status == 0){// wall
            marker = "+";
        }
        else if(status == 1){
            marker = ".";
        }
        else if(status == 2){
            marker = "%";
        }
        this.map[[vect.x+this.x, vect.y+this.y]] = marker;
        
        if(status != 0){
            this.x += vect.x;
            this.y += vect.y;
            if(this.x < this.minX)this.minX = this.x;
            if(this.x > this.maxX)this.maxX = this.x;
            if(this.y < this.minY)this.minY = this.y;
            if(this.y > this.maxY)this.maxY = this.y;
        }

        return status;

    }
}

class Intcomp{
    constructor(program){
        this.mem = program.split(",").map(a=>Number(a));
        this.i = 0;
        this.base = 0;
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
                mem[A] = inputValue;
                this.i+=2;
            }
            else if(op == 4){
                //console.log(this.m(A));
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
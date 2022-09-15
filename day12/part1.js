const fs = require('fs');
let input;
let moons = [];
let history = [];
fs.readFile(__dirname+'\\input.txt', 'utf8', function(err, contents) {
    input = contents.split("\n");
    for(let i=0; i<input.length; i++){
        moons.push(new Moon(input[i]));
    }
    let step = 0;
    for(let i=0; i<1000; i++){
        //if(i%10 == 0)console.log("------- "+ i);
        for(let j=0; j<moons.length; j++){
            //if(i%10 == 0)console.log(moons[j].px + ", " + moons[j].py + ", " + moons[j].pz);
            moons[j].updateV(moons);
        }
        for(let j=0; j<moons.length; j++){
            moons[j].updateP(moons);
        }
        step++;
    }
    let e = 0;
    for(let j=0; j<moons.length; j++){
        e += moons[j].energy();
    }
    console.log(e);

    
});

class Moon{
    constructor(info){
        info = info.replace("<", "").replace(">", "").split(", ").map(a => Number(a.substr(2)));
        console.log(info);
        this.vx = 0;
        this.vy = 0;
        this.vz = 0;
        this.px = info[0];
        this.py = info[1];
        this.pz = info[2];
    }

    updateV(moons){
        for(let i=0; i<moons.length; i++){
            if(moons[i] == this)continue;
            this.vx += normal(moons[i].px - this.px);
            this.vy += normal(moons[i].py - this.py);
            this.vz += normal(moons[i].pz - this.pz);
        }
    }

    updateP(){
        this.px += this.vx;
        this.py += this.vy;
        this.pz += this.vz;
    }

    kinetic(){
        return Math.abs(this.vx) + Math.abs(this.vy) + Math.abs(this.vz);
    }

    potential(){
        return Math.abs(this.px) + Math.abs(this.py) + Math.abs(this.pz);
    }

    energy(){
        return this.kinetic() * this.potential();
    }
}

function normal(x){
    if(x == 0)return 0;
    if(x > 0)return 1;
    if(x < 0)return -1;
}
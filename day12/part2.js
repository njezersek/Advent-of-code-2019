const fs = require('fs');
let input;
let moons = [];
let historyX = [];
let historyY = [];
let historyZ = [];
let periodX;
let periodY;
let periodZ;
fs.readFile(__dirname+'\\input.txt', 'utf8', function(err, contents) {
    input = contents.split("\n");
    for(let i=0; i<input.length; i++){
        moons.push(new Moon(input[i]));
    }
    let step = 0;
    while(!periodX || !periodY || !periodZ){
        let stateX = [];
        let stateY = [];
        let stateZ = [];
        for(let j=0; j<moons.length; j++){
            stateX.push(moons[j].px);
            stateY.push(moons[j].py);
            stateZ.push(moons[j].pz);
            stateX.push(moons[j].vx);
            stateY.push(moons[j].vy);
            stateZ.push(moons[j].vz);
        }
        stateX = stateX.join(",");
        stateY = stateY.join(",");
        stateZ = stateZ.join(",");
        //if(i%10 == 0)console.log("------- "+ i);
        if(historyX[0] == stateX && periodX == undefined)periodX = step;
        if(historyY[0] == stateY && periodY == undefined)periodY = step;
        if(historyZ[0] == stateZ && periodZ == undefined)periodZ = step;
        historyX.push(stateX);
        historyY.push(stateY);
        historyZ.push(stateZ);

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
    console.log(periodX, periodY, periodZ);

    console.log(lcm(lcm(periodX, periodY), periodZ));
});

class Moon{
    constructor(info){
        info = info.replace("<", "").replace(">", "").split(", ").map(a => Number(a.substr(2)));
        //console.log(info);
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

function lcm_more_than_two_numbers(input_array) {
    if (toString.call(input_array) !== "[object Array]")  
        return  false;  
 var r1 = 0, r2 = 0;
    var l = input_array.length;
    for(i=0;i<l;i++) {
        r1 = input_array[i] % input_array[i + 1];
        if(r1 === 0) {
            input_array[i + 1] = (input_array[i] * input_array[i+1]) / input_array[i + 1];
        }
        else {
            r2 = input_array[i + 1] % r1;
            if(r2 === 0) {
                input_array[i + 1] = (input_array[i] * input_array[i + 1]) / r1;
            }
            else {
                input_array[i+1] = (input_array[i] * input_array[i + 1]) / r2;
            }
        }
    }
    return input_array[l - 1];
}

function gcd(a,b) {
    a = Math.abs(a);
    b = Math.abs(b);
    if (b > a) {var temp = a; a = b; b = temp;}
    while (true) {
        if (b == 0) return a;
        a %= b;
        if (a == 0) return b;
        b %= a;
    }
}

function lcm(a,b){
    return(a*b)/gcd(a,b);
}
const fs = require('fs');
let list;

fs.readFile(__dirname+'\\input.txt', 'utf8', function(err, contents) {
    list = contents.split("\r\n").map(a=>a.split(" => ").map(a=>a.split(", ")));
    //console.log(howMuchOre("AB", 2));
    //console.log(howMuchOre("A", 6));
    //console.log(howMuchOre("A", 4));
    //console.log(howMuchOre("B", 24));
    let fuel = 4000000;
    let ore41fuel = howMuchOre("FUEL", 3445249)
    console.log(ore41fuel, ore41fuel < 1000000000000);

});

let remains = [];

function howMuchOre(element, n){
    // find element
    for(let i=0; i<list.length; i++){
        if(element == "ORE"){
            return n;
        }
        let iskan = list[i][1][0].split(" ");
        if(iskan[1] == element){
            if(remains[element] === undefined)remains[element] = 0;
            remains[element] += n%Number(iskan[0]) == 0 ? 0 : Number(iskan[0])-n%Number(iskan[0]);
            let sum = 0;
            for(let j=0; j<list[i][0].length; j++){
                let e = list[i][0][j].split(" ");
                if(remains[e[1]] === undefined)remains[e[1]] = 0;
                let remainsE = remains[e[1]];
                let nE = Number(e[0])*Math.ceil(n/Number(iskan[0]));
                if(remainsE > nE){
                    remains[e[1]] -= nE;
                    nE = 0;
                }
                else{
                    nE -= remainsE;
                    remains[e[1]] = 0;
                }
                let s = howMuchOre(e[1], nE); // koliko 
                sum += s;
            }
            //console.log("Kolko za " + n + " "+ element + "? "+ sum);
            return sum;
        }
    }
    
}

// 2210736 ex
 

// 265166 tl
// 378929 ok
// 395432 th
// 404129 th
    
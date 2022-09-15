const fs = require('fs');
let list;

fs.readFile(__dirname+'\\test.txt', 'utf8', function(err, contents) {
    list = contents.split("\r\n").map(a=>a.split(" => ").map(a=>a.split(", ")));
    //console.log(howMuchOre("AB", 2));
    //console.log(howMuchOre("A", 6));
    //console.log(howMuchOre("A", 4));
    //console.log(howMuchOre("B", 24));
    console.log(howMuchOre("FUEL", 1));
});

function howMuchOre(element, n){
    // find element
    for(let i=0; i<list.length; i++){
        if(element == "ORE"){
            return n;
        }
        let iskan = list[i][1][0].split(" ");
        if(iskan[1] == element){
            let sum = 0;
            for(let j=0; j<list[i][0].length; j++){
                let e = list[i][0][j].split(" ");
                let s = Math.ceil(howMuchOre(e[1], Number(e[0])*(n/Number(iskan[0])))); // koliko 
                sum += s;
            }
            console.log("Kolko za " + n + " "+ element + "? "+ sum);
            return sum;
        }
    }
    
}
 
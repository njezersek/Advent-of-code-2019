const fs = require('fs');

let you = ["YOU"];
let san = ["SAN"];
fs.readFile(__dirname+'\\input.txt', 'utf8', function(err, contents) {
    let mem = contents.split("\r\n").map(a=>a.split(")"));
    let n = 0;
    let connections = [];
    connections["COM"] = 0;
    for(let c of mem){
        for(let i = 0; i<mem.length; i++){
            let d = mem[i];
            if(d[1] == you[you.length-1]){
                if(san.indexOf(d[0]) != -1)console.log(san.indexOf(d[0]) + you.length -2);
                you.push(d[0]);
            }
            if(d[1] == san[san.length-1]){
                if(you.indexOf(d[0]) != -1)console.log(you.indexOf(d[0]) + san.length -2);
                san.push(d[0]);
            }
        }
    }
    console.log(n);
});

//462
 
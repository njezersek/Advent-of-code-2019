const fs = require('fs');

fs.readFile(__dirname+'\\input.txt', 'utf8', function(err, contents) {
    let mem = contents.split("\r\n").map(a=>a.split(")"));
    let n = 0;
    let connections = [];
    connections["COM"] = 0;
    for(let c of mem){
        for(let i = 0; i<mem.length; i++){
            let d = mem[i];
            if(connections[d[0]] != undefined){
                connections[d[1]] = connections[d[0]]+1;
                n += connections[d[1]];
                mem[i] = [];
            }   
        }
    }
    console.log(n);
});
 
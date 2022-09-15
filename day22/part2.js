const fs = require('fs');
let input;

fs.readFile(__dirname+'\\input.txt', 'utf8', function(err, contents) {
    input = contents;

    input = input.split("\r\n").map(a => a.split(""));
    let queue = [];
    
    // naredi map
    let map = [];
    let h = input.length;
    let w = input[0].length;
    for(let y=0; y<input.length; y++){
        for(let x=0; x<input[y].length; x++){
            if(input[y][x] == "." || input[y][x] == "#"){
                map[[x,y]] = input[y][x];
            }
        }
    }
    for(let y=0; y<input.length; y++){
        for(let x=0; x<input[y].length; x++){
            if(input[y][x] == "." || input[y][x] == "#"){
                
            }
            else if(input[y][x] != " "){
                if(input[y+1] && input[y+1][x] && input[y+1][x] != "#"  && input[y+1][x] != "."  && input[y+1][x] != " "){
                    if(input[y+2] && input[y+2][x] == ".")map[[x,y+2]] = input[y][x]+input[y+1][x];
                    if(input[y-1] && input[y-1][x] == ".")map[[x,y-1]] = input[y][x]+input[y+1][x];
                }
                if(input[y][x+1] && input[y][x+1] != "#"  && input[y][x+1] != "."  && input[y][x+1] != " "){
                    if(input[y][x+2] == ".")map[[x+2,y]] = input[y][x]+input[y][x+1];
                    if(input[y][x-1] == ".")map[[x-1,y]] = input[y][x]+input[y][x+1];
                }
            }
            
        }
    }

    // polinkaj portale
    for(let y=0; y<h; y++){
        for(let x=0; x<w; x++){

            if(map[[x,y]] && map[[x,y]] != "." && map[[x,y]] != "#"){

                for(let yy=0; yy<h; yy++){
                    for(let xx=0; xx<w; xx++){

                        if(map[[x,y]] == map[[xx,yy]] && (x!=xx && y!=yy)){
                            map[[x,y]] = {x: xx, y: yy};
                            map[[xx,yy]] = {x: x, y: y};
                        }
                    }
                }
            }
        }
    }

    // poisci zacetek in konec
    let zacetek, konec;
    let out = "";
    for(let y=0; y<h; y++){
        for(let x=0; x<w; x++){
            out += ((map[[x,y]] ? map[[x,y]] : " ")+" ").substring(0,2);
            if(map[[x,y]] == "AA")zacetek = {x: x, y: y};
            if(map[[x,y]] == "ZZ")konec = {x: x, y: y};
        }
        out += "\n";
    }
    console.log(out);

    zacetek.i = 0;

    queue.push(zacetek);

    map[[konec.x, konec.y]] = ".";

    let steps = 0;
    let visited = [];
    while(queue.length > 0){
        let current = queue.shift();
        //console.log(current);
        let directions = [{x:1, y:0},{x:-1, y:0},{x:0, y:1},{x:0, y:-1}];
        visited[[current.x, current.y]] = true;
        if(current.x == konec.x && current.y == konec.y){
            console.log("konec", current.i);
            break;
        }
        steps++;

        for(d of directions){
            if(!visited[[current.x+d.x, current.y+d.y]] && map[[current.x+d.x, current.y+d.y]] == ".")
                queue.push({x: current.x+d.x, y: current.y+d.y, i: current.i+1});
            if(!visited[[current.x+d.x, current.y+d.y]] && typeof map[[current.x+d.x, current.y+d.y]] == "object")
                queue.push({x: map[[current.x+d.x, current.y+d.y]].x, y: map[[current.x+d.x, current.y+d.y]].y, i: current.i+2});
        }
    }
});

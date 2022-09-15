const fs = require('fs');
let input;
fs.readFile(__dirname+'\\input.txt', 'utf8', function(err, contents) {
    input = contents;
    let grid = input.split("\r\n").map(a => a.split(""));
    let ast = list(grid);

    // najdi asteroid iz katerega se vidi največ drugih asteroidov
    let max = 0;
    let base;
    for(let i=0; i<ast.length; i++){
        let astAngle = listAngle(ast[i].x,ast[i].y,ast);
        astAngle.sort((a,b)=>a.angle-b.angle);
        let n = 0;
        let a;
        for(let j=0; j<astAngle.length; j++){
            if(a != astAngle[j].angle){
                n++;
                a = astAngle[j].angle;
            }
        }
        if(n > max){
            max = n;
            base = {x: ast[i].x, y: ast[i].y};
        }
    }
    console.log(max, base);

    // začni streljati asteroide
    let astAngle = listAngle(base.x,base.y,ast);
    astAngle.sort((a,b)=>(a.angle-b.angle == 0 ? a.distance - b.distance : a.angle-b.angle ));

    let a = -1;
    for(let i=0; i<200; i++){
        let index = 0;
        for(let j=0; j<astAngle.length; j++){
            if(astAngle[j].angle > a){
                index = j;
                break;
            }
        }
        
        if(i==199)console.log(astAngle[index]);
        a = astAngle[index].angle;
        astAngle.splice(index, 1);
    }

});

// vrni seznam vseh asteroidov
function list(grid){
    let ast = [];
    for(let y = 0; y < grid.length; y++){
        for(let x = 0; x < grid[y].length; x++){
            if(grid[y] && grid[y][x] == "#") ast.push({x: x, y: y});
        }
    }
    return ast;
}

function listAngle(x, y, ast){
    let angles = [];
    for(let i=0; i<ast.length; i++){
        if(ast[i].x == x && ast[i].y == y){}
        else{
            angles.push({x: ast[i].x, y: ast[i].y, angle: (360+Math.atan2(y-ast[i].y, x-ast[i].x) * 180/Math.PI - 90)%360, distance: (ast[i].x-x)**2 + (ast[i].y-y)**2});
        }
    }
    return angles;
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

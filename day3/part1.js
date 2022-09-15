const fs = require('fs');

fs.readFile(__dirname + '\\input.txt', 'utf8', function(err, contents) {
    let poti = contents.split("\n").map(a=>a.split(","));
    let zasedena = [];
    let presecisca = [];
    for(let i=0; i<poti.length; i++){
        let x=0;
        let y=0;
        for(let j=0; j<poti[i].length; j++){
            let r = poti[i][j].substr(0,1);
            let d = Number(poti[i][j].substr(1));
            for(let k=0; k<d; k++){
                if(r == "D")y--;
                if(r == "U")y++;
                if(r == "R")x++;
                if(r == "L")x--;
                if(zasedena[[x, y]] != undefined && zasedena[[x, y]] != i)presecisca.push( {x: x, y: y} );
                zasedena[[x, y]] = i;
            }
        }
    }
    let mind = Infinity;
    let mini = 0;
    for(let i=0; i<presecisca.length; i++){
        let d = Math.abs(presecisca[i].x) + Math.abs(presecisca[i].y);
        if(mind > d){
            mind = d;
            mini = i;
        }
    }

    /*let out = "";
    for(let x=-200; x<200; x++){
        let vrstica = "";
        for(let y=-200; y<200; y++){
            if(presecisca[mini].x == x && presecisca[mini].y == y)vrstica += "P";
            else if(zasedena[[x,y]])vrstica += "#";
            else if(x == 0 && y == 0)vrstica += "@";
            else vrstica += ".";
        }
        out += vrstica + "\n";
    }*/

    //console.log(out);

    console.log(mind);
});

console.log("end");
 
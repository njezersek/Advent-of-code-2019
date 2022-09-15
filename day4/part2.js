n = 0;
for(let i=128392; i<=643281; i++){
    if((i+"").split("").sort().join("") == i+""){
        let m = (i+"").match(/(\d)\1+/gm)
        if(m){
            m = m.map(a=>a.length);
            if(m.indexOf(2) != -1)n++;
        }
    }
}
console.log(n);

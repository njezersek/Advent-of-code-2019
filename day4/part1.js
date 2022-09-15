n = 0;
for(let i=128392; i<=643281; i++){
    if((i+"").split("").sort().join("") == i+"")
    if((i+"").match(/(\d)\1+/gm))n++;
}
console.log(n);

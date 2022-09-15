const fs = require('fs');
let input;

fs.readFile(__dirname+'\\input.txt', 'utf8', function(err, contents) {
    input = contents;

    let d = new Deck(10);
    d.deal(3);
    d.print();

});

class Deck{
    constructor(n){
        this.cards = new Array(n);
        for(let i=0; i<n; i++){
            this.cards[i] = n-i-1;
            this.cards[i] = i;
        }
    }

    cut(n){
        this.cards = this.cards.slice(n).concat(this.cards.slice(0,n));
    }

    deal(n){
        let deck = new Array(this.cards.length);
        let index = new Array(this.cards.length);
        for(let i=0; i<index.length; i++)index[i] = i;
        let j=0;
        for(let  i=0; i<this.cards.length; i++){
            j = (j+n)
            let k = index.splice((i*n)%index.length, 1); //
            deck[k] = this.cards[i];
        }

        this.cards = deck;
    }

    print(){
        console.log(this.cards.join(", "));
    }
}
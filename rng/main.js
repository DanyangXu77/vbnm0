let cards = Array.apply(null, Array(54)).map(function (x, i) { return i; });
let oneDeck = Array.apply(null, Array(54)).map(function (x, i) { return i; });
let shownCards = [];
let cardDeck = document.getElementById("cardDeck");

function roll() {
    let d = document.getElementById("dice");
    let t = document.getElementById("dtxt");
    let x = Math.floor(Math.random() * 6 + 1);
    let s = "/images/dice/" + x + ".png";
    d.src = s;
    t.innerHTML = x;
    return x;
}

function reset() {
    cards = Array.apply(null, Array(54)).map(function (x, i) { return i; });
    oneDeck = Array.apply(null, Array(54)).map(function (x, i) { return i; });
    shownCards = [];
    cardDeck.height = 9;
}

function shuffle() {
    var m = cards.length, t, i;
  
    while (m) {
        i = Math.floor(Math.random() * m--);
      
        t = cards[m];
        cards[m] = cards[i];
        cards[i] = t;
    }
}

function addDeck() {
    cards = cards.concat(oneDeck);
    cardDeck.height = cards.length / 6;
}

function draw() {
    shownCards.push(cards.pop());
    cardDeck.height = cards.length / 6;
}
let cards = Array.apply(null, Array(54)).map(function (x, i) { return i; });
let oneDeck = Array.apply(null, Array(54)).map(function (x, i) { return i; });
let shownCards = [];
let cardDeck = document.getElementById("cardDeck");
let topCard = document.getElementById("cardDisp");

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
    cardDeck.height = 54;
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
    cardDeck.height = cards.length;
}

function draw() {
    card = cards.pop();
    shownCards.push(card);
    topCard.innerHTML = cardName(card);
    cardDeck.height = cards.length;
}

function cardName(num) {
    if (num == 52) {
        return "Small Joker";
    }
    if (num == 53) {
        return "Big Joker";
    }
    let ret = "";
    let num = num % 13;
    let suit = Math.floor(num / 13);
    if (num == 0) {
        ret += "Ace of ";
    }
    if (num < 10 && num > 0) {
        ret += num + 1 + "of ";
    }
    if (num == 10) {
        ret += "Jack of "
    }
    if (num == 11) {
        ret += "Queen of "
    }
    if (num == 12) {
        ret += "King of "
    }

    if (suit == 0) {
        ret += "Spades";
    }
    if (suit == 1) {
        ret += "Hearts";
    }
    if (suit == 2) {
        ret += "Clubs";
    }
    if (suit == 3) {
        ret += "Diamonds";
    }
}
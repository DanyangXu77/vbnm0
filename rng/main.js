keyd = false;
document.addEventListener("keydown", keyd = true);
document.addEventListener("keyup", keyd = false);

let cards = Array.apply(null, Array(54)).map(function (x, i) {return 53 - i;});
let oneDeck = Array.apply(null, Array(54)).map(function (x, i) {return 53 - i;});
console.log(oneDeck);
let shownCards = [];
let cardDeck = document.getElementsByClassName("cardDeck");
let topCard = document.getElementById("cardDisp");

function roll() {
    let d = document.getElementById("dice");
    let x = Math.floor(Math.random() * 6 + 1);
    let s = "/images/dice/" + x + ".png";
    d.src = s;
    console.log("Rolled");
}

function reset() {
    cards = Array.apply(null, Array(54)).map(function (x, i) { return i; });
    oneDeck = Array.apply(null, Array(54)).map(function (x, i) { return i; });
    shownCards = [];
    topCard.innerHTML = "Unknown<br>54 Remaining";
    updateDeck();
    console.log("Reset");
}

function shuffle() {
    let m = cards.length, t, i;
  
    while (m) {
        i = Math.floor(Math.random() * m--);
      
        t = cards[m];
        cards[m] = cards[i];
        cards[i] = t;
    }
    console.log("Shuffled");
}

function addDeck() {
    cards = cards.concat(oneDeck);
    updateDeck();
    console.log("Deck Added");
}

function draw() {
    if (cards.length == 0) {
        console.log("Cannot Draw");
        return;
    }
    card = cards.pop();
    shownCards.push(card);
    topCard.innerHTML = cardName(card);
    updateDeck();
    console.log("Drawn");
}

function cardName(cardNum) {
    if (cardNum == 52) {
        return "Small Joker<br>" + cards.length + " Remaining";
    }
    if (cardNum == 53) {
        return "Big Joker<br>" + cards.length + " Remaining";
    }
    let ret = "";
    let num = cardNum % 13;
    let suit = Math.floor(cardNum / 13);
    if (num == 0) {
        ret += "Ace of ";
    }
    if (num < 10 && num > 0) {
        ret += num + 1 + " of ";
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
    ret += "<br>" + cards.length + " Remaining";
    console.log("Card Calculated");
    return ret;
}

function removeDeck() {
    if (keyd) {
        console.log("Removing Deck");
        for (let i = 0; i < 54; i++) {
            draw();
            wait(50);
        }
        console.log("Deck Removed");
    } else {
        console.log("Removing Deck");
        for (let i = 0; i < 54; i++) {
            draw();
        }
        console.log("Deck Removed");
    }
}

function updateDeck() {
    for (let i = 0; i < cardDeck.length; i++) {
        cardDeck[i].setAttribute("height", cards.length);
    }
}
let cards = Array.apply(null, Array(54)).map(function (x, i) {return 53 - i;});
let oneDeck = Array.apply(null, Array(54)).map(function (x, i) {return 53 - i;});
console.log(oneDeck);
let shownCards = [];
let cardDeck = document.getElementsByClassName("cardDeck");
let topCard = document.getElementById("cardDisp");
let remCards = document.getElementById("remDisp");

function roll() {
    let d = document.getElementById("dice");
    let x = Math.floor(Math.random() * 6 + 1);
    let s = "/images/dice/" + x + ".png";
    d.src = s;
    console.log("Rolled");
}

function clear() {
    topCard.innerHTML = "";
}

function reset() {
    cards = Array.apply(null, Array(54)).map(function (x, i) {return 53 - i;});
    oneDeck = Array.apply(null, Array(54)).map(function (x, i) {return 53 - i;});
    shownCards = [];
    topCard.innerHTML = "";
    updateDeck();
    updateScroll();
    remCards.innerHTML = "54 Remaining";
    console.log("Reset");
    console.log(cards);
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
    console.log(cards);
}

function addDeck() {
    cards = cards.concat(oneDeck);
    updateDeck();
    remCards.innerHTML = cards.length + " Remaining";
    console.log("Deck Added");
    console.log(cards);
}

function draw() {
    if (cards.length == 0) {
        console.log("Cannot Draw");
        return 0;
    }
    card = cards.pop();
    shownCards.push(card);
    topCard.innerHTML += "<br>" + cardName(card);
    updateScroll();
    remCards.innerHTML = cards.length + " Remaining";
    updateDeck();
    console.log("Drawn");
    console.log(cards);
    return 1;
}

function cardName(cardNum) {
    if (cardNum == 52) {
        return "Small Joker";
    }
    if (cardNum == 53) {
        return "Big Joker";
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
    console.log("Card Calculated");
    return ret;
}

function removeDeck() {
    console.log("Removing Deck");
    for (let i = 0; i < 54; i++) {
        if (draw() == 0) {
            return;
        }
    }
    remCards.innerHTML = cards.length + " Remaining";
    console.log("Deck Removed");
}

function updateDeck() {
    for (let i = 0; i < cardDeck.length; i++) {
        cardDeck[i].setAttribute("height", cards.length);
    }
}

function updateScroll() {
    topCard.scrollTop = topCard.scrollHeight;
}
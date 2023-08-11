let debug = false;

function debug_log() {
    if (debug) {
        console.log.apply(this, arguments);
    }
}

let showclr = false;
let showdck = true;
let printLog = document.getElementById("printLog");
let cards = Array.apply(null, Array(54)).map(function (x, i) {return 53 - i;});
let oneDeck = Array.apply(null, Array(54)).map(function (x, i) {return 53 - i;});
debug_log(oneDeck);
let shownCards = [];
let cardDeck = document.getElementById("cardDeck");
let topCard = document.getElementById("cardDisp");
let remCards = document.getElementById("remDisp");
let showDeck = document.getElementById("showDeck");
let rolls = [0, 0, 0, 0, 0, 0];

function loadCookies() {
    debug = Boolean(document.cookie.charAt(5));
    showdck = Boolean(document.cookie.charAt(6));
    showclr = Boolean(document.cookie.charAt(7));
    displayDeck();
    printLog.innerHTML = debug;
    showDeck.innerHTML = showdck;
    showColor.innerHTML = showclr;
    console.log("Attempted to load cookies");
}

function chngPrintLog() {
    debug = !debug;
    printLog.innerHTML = debug;
    updateSettingsCookies();
}

function chngShowDeck() {
    showdck = !showdck;
    showColor.disabled = !showdck;
    showDeck.innerHTML = showdck;
    updateSettingsCookies();
}

function displayDeck() {
    if (showdck) {
        cardDeck.hidden = false;
        updateDeck();
        return 1;
    } else {
        cardDeck.hidden = true;
        return 0;
    }
}

function chngShowColor() {
    showclr = !showclr;
    showColor.innerHTML = showclr;
    displayDeck();
    updateSettingsCookies();
}

function roll() {
    let d = document.getElementById("dice");
    let x = Math.floor(Math.random() * 6 + 1);
    let f = Math.round(Math.random());
    rolls[x - 1]++;
    let s = "/images/dice/" + x + f + ".png";
    d.src = s;
    debug_log("Rolled");
    debug_log(x);
    debug_log(rolls);
}

function clearDisp() {
    topCard.innerHTML = "";
}

function openSettings() {
    settings.hidden = false;
}

function closeSettings() {
    settings.hidden = true;
}

settings.onscroll = function() {return;};

function reset() {
    cards = Array.apply(null, Array(54)).map(function (x, i) {return 53 - i;});
    oneDeck = Array.apply(null, Array(54)).map(function (x, i) {return 53 - i;});
    shownCards = [];
    topCard.innerHTML = "";
    updateScroll();
    remCards.innerHTML = "54 Remaining";
    displayDeck();
    debug_log("Reset");
    debug_log(cards);
}

function shuffle() {
    let m = cards.length, t, i;

    while (m) {
        i = Math.floor(Math.random() * m--);
      
        t = cards[m];
        cards[m] = cards[i];
        cards[i] = t;
    }
    displayDeck();
    debug_log("Shuffled");
    debug_log(cards);
}

function addDeck() {
    cards = cards.concat(oneDeck);
    if (cards.length > 702) {
        while (cards.length > 702) {
            cards.pop();
        }
    }
    remCards.innerHTML = cards.length + " Remaining";
    displayDeck();
    debug_log("Deck Added");
    debug_log(cards);
}

function draw() {
    if (cards.length == 0) {
        debug_log("Cannot Draw");
        return 0;
    }
    card = cards.pop();
    shownCards.push(card);
    if (topCard.innerHTML == "") {
        topCard.innerHTML = cardName(card);
        remCards.innerHTML = cards.length + " Remaining";
        displayDeck();
        debug_log("Drawn");
        debug_log(card);
        debug_log(cards);
        return 1;
    }
    topCard.innerHTML += "<br>" + cardName(card);
    updateScroll();
    remCards.innerHTML = cards.length + " Remaining";
    displayDeck();
    debug_log("Drawn");
    debug_log(card);
    debug_log(cards);
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
    debug_log("Card Calculated");
    return ret;
}

function removeDeck() {
    debug_log("Removing Deck");
    for (let i = 0; i < 54; i++) {
        if (cards.length == 0) {
            displayDeck();
            remCards.innerHTML = "0 Remaining";
            return;
        }
        cards.pop();
    }
    remCards.innerHTML = cards.length + " Remaining";
    displayDeck();
    debug_log("Deck Removed");
}

function removePaths() {
    while (cardDeck.firstChild) {
        cardDeck.removeChild(cardDeck.lastChild);
    }
}

function updateDeck() {
    removePaths();
    cardDeck.setAttribute("height", cards.length);
    for (let i = 0; i < cards.length; i++) {
        let newElement = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        newElement.setAttribute("d","M 1 " + (cards.length - i + 1) + " L 147 " + (cards.length - i + 1));
        if (showclr) {
            let z1 = "";
            let z2 = "";
            if (Math.round(255 / 53 * cards[i]) < 16) {
                z1 += "0";
            }
            if (Math.round(255 - 255 / 53 * cards[i]) < 16) {
                z2 += "0";
            }
            newElement.style.stroke = "#" + z1 + (Math.round(255 / 53 * cards[i])).toString(16) + z2 + (Math.round(255 - 255 / 53 * cards[i])).toString(16) + "00";
        } else {
            newElement.style.stroke = "#000000";
        }
        newElement.style.strokeWidth = "1px"; //Set stroke width
        cardDeck.appendChild(newElement);
    }
}

function updateScroll() {
    topCard.scrollTop = topCard.scrollHeight;
}

displayDeck();

function updateSettingsCookies() {
    document.cookie = "x=" + (debug ? 1 : 0) + "" + (showdck ? 1 : 0) + "" + (showclr ? 1 : 0);
    debug_log("Updated cookies");
}
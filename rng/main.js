function roll() {
    let d = document.getElementById("dice");
    let t = document.getElementById("dtxt");
    let x = Math.floor(Math.random() * 6 + 1);
    let s = "https://www.vbnm.dev/images/dice/" + x + ".png";
    d.src = s;
    t.innerHTML = x;
    return x;
}

function rollc() {
    for (i = 0; i < 5; i++) {
        roll();
    }
}
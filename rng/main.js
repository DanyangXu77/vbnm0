function roll() {
    let d = document.getElementById("dice");
    let x = Math.floor(Math.random() * 6 + 1);
    let s = "https://www.vbnm.dev/images/dice/" + x + ".png";
    d.src = s;
}
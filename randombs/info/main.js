document.getElementById("pageblock").hidden = true;
document.getElementById("dispAgent").innerHTML = navigator.userAgent;
let x = setInterval(updateBattery, 10000);
let updates = 0;

async function updateBattery() {
    updates++;
    console.log("Battery Update #" + updates);
    if (!navigator.getBattery) {
        document.getElementById("batteryInfo").innerHTML = "Battery Info <br>unknown due to either a permissions policy or a being called from an insecure context.";
        clearInterval(x);
    }
    let battery = await navigator.getBattery();
    document.getElementById("batteryLvl").innerHTML = "Level: " + Math.round((battery.level * 100)) + "%";
    document.getElementById("batteryCharging").innerHTML = "Charging: " + (battery.charging ? "Yes" : "No");
    document.getElementById("timeUntil").innerHTML = (battery.charging ? "Until Full: " + toFormat(battery.chargingTime) : "Until Empty: " + toFormat(battery.dischargingTime));
}

function toFormat(s) {
    let h = s / 60;
    s = s % 3600;
    let m = s / 60;
    s = s % 60;
    return h + " Hours, " + m + " Minutes, " + s + " Seconds"
}

updateBattery();
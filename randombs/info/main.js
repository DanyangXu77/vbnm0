document.getElementById("pageblock").hidden = true;
document.getElementById("dispAgent").innerHTML = navigator.userAgent;
updateBattery();
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
    document.getElementById("timeUntil").innerHTML = (battery.charging ? "Until Full: " + battery.chargingTime : "Until Empty: " + battery.dischargingTime) + " seconds";
}
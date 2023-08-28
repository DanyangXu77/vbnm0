document.getElementById("pageblock").hidden = true;
document.getElementById("dispAgent").innerHTML = navigator.userAgent;
updateBattery();
let x = setTimeout(updateBattery, 1000);
let updates = 0;


async function updateBattery() {
    updates++;
    console.log(updates);
    if (!navigator.getBattery) {
        document.getElementById("batteryInfo").innerHTML = "Battery Info <br>unknown due to either a permissions policy or a being called from an insecure context.";
        clearTimeout(x);
    }
    let battery = await navigator.getBattery();
    document.getElementById("batteryLvl").innerHTML = "Level: " + Math.round((battery.level * 100)) + "%";
    document.getElementById("batteryCharging").innerHTML = "Charging: " + (battery.charging ? "Yes" : "No");
    document.getElementById("timeUntil").innerHTML = (battery.charging ? "Until Full: " + battery.chargingTime : "Until Empty: " + battery.dischargingTime) + " seconds";
}
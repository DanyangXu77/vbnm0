document.getElementById("pageblock").hidden = true;
document.getElementById("dispAgent").innerHTML = navigator.userAgent;
let x = setInterval(updateBattery, 10000);

function toFormat(s) {
    let h = Math.floor(s / 3600);
    s = s % 3600;
    let m = Math.floor(s / 60);
    s = s % 60;
    return h + " Hours, " + m + " Minutes, " + s + " Seconds"
}

navigator.getBattery().then((battery) => {
    battery.addEventListener("chargingchange", () => {
        document.getElementById("batteryCharging").innerHTML = "Charging: " + (battery.charging ? "Yes" : "No");
    });
    battery.addEventListener("levelchange", () => {
        document.getElementById("batteryLvl").innerHTML = "Level: " + Math.round((battery.level * 100)) + "%";
    });
    battery.addEventListener("chargingtimechange", () => {
        document.getElementById("timeUntil").innerHTML = (battery.charging ? "Until Full: " + toFormat(battery.chargingTime) : "Until Empty: " + toFormat(battery.dischargingTime));
    });
    battery.addEventListener("dischargingtimechange", () => {
        document.getElementById("timeUntil").innerHTML = (battery.charging ? "Until Full: " + toFormat(battery.chargingTime) : "Until Empty: " + toFormat(battery.dischargingTime));
    });
});

navigator.connection.addEventListener('change', function(network) {
    document.getElementById("bandwidth") = "Bandwidth: " + network.downlink + " Kbps";
    document.getElementById("maxBandwidth") = "Max Bandwidth: " + network.downlinkMax + " Mbps";
    document.getElementById("effectiveType") = "Effective Type: " + network.effectiveType;
    document.getElementById("roundTripTime") = "Round Trip Time:" + network.rtt + " Milliseconds";
    document.getElementById("connectionType") = "Connection Type: " + network.type.charAt(0).toUpperCase() + network.type.splice(1);
});
document.getElementById("pageblock").hidden = true;
document.getElementById("dispAgent").innerHTML = navigator.userAgent;

function toFormat(s) {
    let h = Math.floor(s / 3600);
    s = s % 3600;
    let m = Math.floor(s / 60);
    s = s % 60;
    return h + " Hours, " + m + " Minutes, " + s + " Seconds"
}

let network = navigator.connection;
document.getElementById("bandwidth").innerHTML = "Bandwidth: " + network.downlink == undefined ? "Unknown" : network.downlink + " Mbps";
document.getElementById("maxBandwidth").innerHTML = "Max Bandwidth: " + network.downlinkMax == undefined ? "Unknown" : network.downlinkMax + " Mbps";
document.getElementById("effectiveType").innerHTML = "Effective Type: " + network.effectiveType == undefined ? "Unknown" : network.effectiveType;
document.getElementById("roundTripTime").innerHTML = "Round Trip Time: " + network.rtt == undefined ? "Unknown" : network.rtt + " Milliseconds";
document.getElementById("connectionType").innerHTML = "Connection Type: " + network.type == undefined ? "Unknown" : network.type.charAt(0).toUpperCase() + network.type.splice(1);

navigator.getBattery().then((battery) => {
    console.log("Battery Obtained");
    document.getElementById("batteryCharging").innerHTML = "Charging: " + (battery.charging ? "Yes" : "No");
    document.getElementById("batteryLvl").innerHTML = "Level: " + Math.round((battery.level * 100)) + "%";
    document.getElementById("timeUntil").innerHTML = (battery.charging ? "Until Full: " + toFormat(battery.chargingTime) : "Until Empty: " + toFormat(battery.dischargingTime));
    document.getElementById("timeUntil").innerHTML = (battery.charging ? "Until Full: " + toFormat(battery.chargingTime) : "Until Empty: " + toFormat(battery.dischargingTime));

    battery.addEventListener("chargingchange", () => {
        document.getElementById("batteryCharging").innerHTML = "Charging: " + battery.charging == undefined ? "Unknown" : (battery.charging ? "Yes" : "No");
    });
    battery.addEventListener("levelchange", () => {
        document.getElementById("batteryLvl").innerHTML = "Level: " + battery.level == undefined ? "Unknown" : Math.round((battery.level * 100)) + "%";
    });
    battery.addEventListener("chargingtimechange", () => {
        document.getElementById("timeUntil").innerHTML = "Until Full: " + battery.chargingTime == undefined ? "Unknown" : toFormat(battery.chargingTime);
    });
    battery.addEventListener("dischargingtimechange", () => {
        document.getElementById("timeUntil").innerHTML = "Until Empty: " + battery.dischargingTime == undefined ? "Unknown" : toFormat(battery.dischargingTime);
    });
});

navigator.connection.addEventListener('change', function(network) {
    document.getElementById("bandwidth").innerHTML = "Bandwidth: " + network.downlink == undefined ? "Unknown" : network.downlink + " Mbps";
    document.getElementById("maxBandwidth").innerHTML = "Max Bandwidth: " + network.downlinkMax == undefined ? "Unknown" : network.downlinkMax + " Mbps";
    document.getElementById("effectiveType").innerHTML = "Effective Type: " + network.effectiveType == undefined ? "Unknown" : network.effectiveType;
    document.getElementById("roundTripTime").innerHTML = "Round Trip Time: " + network.rtt == undefined ? "Unknown" : network.rtt + " Milliseconds";
    document.getElementById("connectionType").innerHTML = "Connection Type: " + network.type == undefined ? "Unknown" : network.type.charAt(0).toUpperCase() + network.type.splice(1);
});
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
    function updateBattery() {
        console.log("Battery Update");
        if (!battery) {
            clearInterval(x);
            document.getElementById("batteryCharging").hidden = true;
            document.getElementById("timeUntil").hidden = true;
            document.getElementById("batteryInfo").innerHTML = "(unknown due to either a permissions policy or being called from an insecure context)";
        }
        document.getElementById("batteryLvl").innerHTML = "Level: " + Math.round((battery.level * 100)) + "%";
        document.getElementById("batteryCharging").innerHTML = "Charging: " + (battery.charging ? "Yes" : "No");
        document.getElementById("timeUntil").innerHTML = (battery.charging ? "Until Full: " + toFormat(battery.chargingTime) : "Until Empty: " + toFormat(battery.dischargingTime));
    }
    battery.addEventListener("chargingchange", () => {
        updateBattery();
    });
    battery.addEventListener("levelchange", () => {
        updateBattery();
    });
    battery.addEventListener("levelchange", () => {
        updateBattery();
    });
    battery.addEventListener("levelchange", () => {
        updateBattery();
    });

    updateBattery();
});

navigator.connection.addEventListener('change', function(network) {
    document.getElementById("bandwidth") = "Bandwidth: " + network.downlink + " Kbps";
    document.getElementById("maxBandwidth") = "Max Bandwidth: " + network.downlinkMax + " Mbps";
    document.getElementById("effectiveType") = "Effective Type: " + network.effectiveType;
    document.getElementById("roundTripTime") = "Round Trip Time:" + network.rtt + " Milliseconds";
    document.getElementById("connectionType") = "Connection Type: " + network.type.charAt(0).toUpperCase() + network.type.splice(1);
});
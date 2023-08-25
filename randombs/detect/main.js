document.getElementById("pageblock").hidden = true;
document.getElementById("dispAgent").innerHTML = navigator.userAgent;
let x = setTimeout(updateBattery, 10000);

function updateBattery() {
    if (!navigator.getBattery) {
        document.getElementById("batteryInfo").innerHTML = "Unknown due to either a permissions policy or a being called from an insecure context.";
        clearTimeout(x);
    }
    document.getElementById("batteryInfo").innerHTML = "Battery: " + (await (navigator.getBattery()).level) * 100 + "%";
}
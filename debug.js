const api = "https://antischwitzomat.glitch.me/measurements";
const tempRequest = new XMLHttpRequest();
tempRequest.onload = onDataReceived;
tempRequest.open('get', api);
tempRequest.send();

const log = document.getElementById("output");

function onDataReceived(data) {
    var response = JSON.parse(this.responseText);
    for (var i = 0; i < response.length; i++) {
        log.innerHTML += (new Date(response[i].time)).toLocaleString() + " " + response[i].temperature + "°C " + response[i].humidity + "% " + response[i].pressure + "mbar" + '<br />';
    }
    console.log(response)
}


const temp = document.getElementById("temp");
const hum = document.getElementById("hum");
const pres = document.getElementById("pres");

const sendButton = document.getElementById("send");
const deleteButton = document.getElementById("delete");

sendButton.onclick = function () {
    var data = JSON.stringify({
        i: "debug",
        t: temp.value,
        h: hum.value,
        p: pres.value
    });
    console.log("sending " + data)
    const tempSubmit = new XMLHttpRequest();
    tempSubmit.open('post', api);
    tempSubmit.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    tempSubmit.onload = refresh;
    tempSubmit.send(data);
}

deleteButton.onclick = function () {
    console.log("deleting")
    const tempDelete = new XMLHttpRequest();
    tempDelete.open('delete', api);
    tempDelete.onload = refresh;
    tempDelete.send();
}

function refresh() {
    window.location.replace(window.location.pathname + window.location.search + window.location.hash);
}
let api = "https://antischwitzomat.glitch.me/measurements";
api = "http://127.0.0.1:1337/measurements";
const tempRequest = new XMLHttpRequest();
tempRequest.onload = onDataReceived;
tempRequest.open('get', api);
tempRequest.send();

const log = document.getElementById("output");

function onDataReceived(data) {
    var response = JSON.parse(this.responseText);
    var data = document.createElement("div");
    for (var i = response.length - 1; i >= 0; i--) {
        var dataLine = document.createElement("div");
        // data.innerHTML += (new Date(response[i].time)).toLocaleString() + " " + response[i].temperature + "°C " + response[i].humidity + "% " + response[i].pressure + "mbar" + " " + response[i].id + '<br />';
        dataLine.innerText = (new Date(response[i].time)).toLocaleString() + " " + response[i].temperature + "°C " + response[i].humidity + "% " + response[i].pressure + "mbar" + " " + response[i].sensor_id;
        data.appendChild(dataLine);
    }
    log.appendChild(data)
    console.log(response)
}


const temp = document.getElementById("temp");
const hum = document.getElementById("hum");
const pres = document.getElementById("pres");

const sendButton = document.getElementById("send");
const deleteButton = document.getElementById("delete");

sendButton.onclick = function () {
    var data = JSON.stringify({
        i: "0",
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
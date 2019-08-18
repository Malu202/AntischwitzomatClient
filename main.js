
const api = "https://antischwitzomat.glitch.me/temperatures";
const tempRequest = new XMLHttpRequest();
tempRequest.onload = onDataReceived;
tempRequest.open('get', api);
tempRequest.send();

const body = document.getElementById("test");

function onDataReceived(data) {
    var response = JSON.parse(this.responseText);
    for (var i = 0; i < response.length; i++) {
        body.innerHTML += response[i].time + " " + response[i].temperature + "°C" /*.dream*/ + '<br />';
    }
    console.log(response)
}

const time = document.getElementById("time");
const temp = document.getElementById("temp");
const sendButton = document.getElementById("send");
const deleteButton = document.getElementById("delete");

sendButton.onclick = function () {
    var data = JSON.stringify({
        time: time.value,
        temperature: temp.value
    });
    console.log("sending " + data)
    const tempSubmit = new XMLHttpRequest();
    tempSubmit.open('post', api);
    tempSubmit.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    tempSubmit.onload = refresh;
    tempSubmit.send(data);
}

deleteButton.onclick = function () {
    console.log("ddeleting")
    const tempDelete = new XMLHttpRequest();
    tempDelete.open('delete', api);
    tempDelete.onload = refresh;
    tempDelete.send();
}


function refresh() {
    window.location.replace(window.location.pathname + window.location.search + window.location.hash);
}
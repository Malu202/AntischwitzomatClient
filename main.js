const api = "https://antischwitzomat.glitch.me/measurements";
// const api = "https://antischwitzomat.glitch.me/mockup2";

// var ids = ["esp", "debug"];
var ids = ["esp"];


const log = document.getElementById("output");
const tempCanvas = document.getElementById("tempPlot");
const dashboardDiv = document.getElementById("dashboard");

const weatherStations = {};

var gaugePanels = [];
addPanels(ids.length);

const tempRequest = new XMLHttpRequest();
tempRequest.onload = onDataReceived;
tempRequest.open('get', api);
tempRequest.send();

var plottedValue = 0;
function onDataReceived(data) {

    var response = JSON.parse(this.responseText);

    for (var i = 0; i < ids.length; i++) {
        weatherStations[ids[i]] = new WeatherStation();
    }
    for (var i = 0; i < response.length; i++) {
        const station = weatherStations[response[i].id];
        if (station == undefined) continue;
        const date = (new Date(response[i].time));
        station.times.push((date.getTime() / 1000));
        station.temps.push(response[i].temperature);
        station.hums.push(response[i].humidity);
        station.press.push(response[i].pressure);
    }
    for (var i = ids.length - 1; i >= 0; i--) {
        weatherStations[ids[i]].addGaugePanel(i);
    }

    // if (false) return false;

    for (var i = 0; i < response.length; i += (response.length - 1) || 1) {
        const date = (new Date(response[i].time));
        const time = date.getHours() + ":" + date.getMinutes();
        weatherStations[ids[0]].timeLabels.push(time);
    }

    const timeLabelCount = 4;
    const plottedTime = (weatherStations[ids[0]].times[weatherStations[ids[0]].times.length - 1] - weatherStations[ids[0]].times[0]) * 1000;
    const stepSize = plottedTime / (timeLabelCount - 1);
    for (var i = 1; i < timeLabelCount - 1; i++) {
        const labelDate = new Date((weatherStations[ids[0]].times[0] * 1000 + stepSize * i));
        weatherStations[ids[0]].timeLabels.splice(i, 0, labelDate.getHours() + ":" + labelDate.getMinutes());
    }

    var plottableValues = [weatherStations[ids[0]].temps, weatherStations[ids[0]].hums, weatherStations[ids[0]].press];
    var suffixes = ['° ', '% ', '']
    createPlot(weatherStations[ids[0]].times, plottableValues[plottedValue], suffixes[plottedValue])
    tempCanvas.onclick = function () {
        plottedValue++;
        if (plottedValue > plottableValues.length - 1) plottedValue = 0;
        createPlot(weatherStations[ids[0]].times, plottableValues[plottedValue], suffixes[plottedValue])
    }
}

var plot;
function createPlot(x, y, sf) {
    plot = new Plot(tempCanvas, {
        xAxisSize: 0.08,
        yAxisSize: 0.08,
        // topMargin: 0.05,
        // rightMargin: 0.05,
        yAxisLabelMaxDecimals: 0,
        yAxisMaxLabels: 15,
        yAxisLabelSuffix: sf,
        drawGridLineX: false,
        drawGridLineY: false,
        preferredLabelStepsY: [1, 2, 5],
        xLabelNames: weatherStations[ids[0]].timeLabels,

        graphs: [
            {
                type: "shadow",
                x: x,
                y: y,
                xHighlight: x,
                yHighlight: y
            }
        ]
    });
}


function WeatherStation() {
    this.timeLabels = [];
    this.times = [];
    this.temps = [];
    this.hums = [];
    this.press = [];
}

WeatherStation.prototype.addGaugePanel = function (position) {
    const tempDiv = gaugePanels[position][0];
    const humDiv = gaugePanels[position][1];
    const pressDiv = gaugePanels[position][2];

    //Just for mockup:
    if (this.temps[this.temps.length - 1] == undefined) {
        this.temps[this.temps.length - 1] = Math.round(Math.random() * 35 + 5);
        this.hums[this.hums.length - 1] = Math.round(Math.random() * 70 + 30);
        this.press[this.press.length - 1] = Math.round(Math.random() * 15 + 1000);
    }

    var temp = Math.round(this.temps[this.temps.length - 1]);
    var hum = Math.round(this.hums[this.hums.length - 1]);
    var press = Math.round(this.press[this.press.length - 1]);

    const tempGauge = new Gauge(tempDiv, "", temp, "°", 5, 40, "#fff", "#000");
    tempGauge.animateValue(temp, 800)
    const humGauge = new Gauge(humDiv, "", hum, "%", 30, 99, "#fff", "#000");
    humGauge.animateValue(hum, 800)
    const pressGauge = new Gauge(pressDiv, "", press, " mbar", 950, 9999, "#fff", "#000");
    pressGauge.animateValue(press, 800);
}

function addPanels(amount) {
    const gaugesBlueprint = document.getElementById("gauges");
    const tempGaugeBlueprint = document.getElementById("tempGauge");
    const humGaugeBlueprint = document.getElementById("humGauge");
    const presGaugeBlueprint = document.getElementById("presGauge");

    for (var i = 0; i < amount; i++) {
        const parent = document.createElement("div");
        parent.classList = gaugesBlueprint.classList;

        const tempDiv = document.createElement("div");
        tempDiv.classList = tempGaugeBlueprint.classList;
        const humDiv = document.createElement("div");
        humDiv.classList = humGaugeBlueprint.classList;
        const pressDiv = document.createElement("div");
        pressDiv.classList = presGaugeBlueprint.classList;

        parent.appendChild(tempDiv);
        parent.appendChild(humDiv);
        parent.appendChild(pressDiv);
        dashboardDiv.insertBefore(parent, dashboardDiv.firstChild);

        const gaugePanel = [tempDiv, humDiv, pressDiv];
        gaugePanels.push(gaugePanel);
    }
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('worker.js').then(function (registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
            setupPushNotifications(registration);
        }, function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

function setupPushNotifications(serviceWorkerRegistration) {
    // serviceWorkerRegistration.pushManager.subscribe({
    //     userVisibleOnly: true,
    //     applicationServerKey: "BPpC0dcJVJWCBwjKNWPJW4o75bZpfiqUtGAU3Du18npgjqtCDqfWLMbHjIkMQAbDvcuPbP5eLfL9ZDSxilOFq0I"
    // }).then(function (subscription) {
    //     isSubscribed = !(subscription === null);

    //     if (isSubscribed) {
    //         console.log('User IS subscribed.');
    //     } else {
    //         console.log('User is NOT subscribed.');
    //     }
    // });

    serviceWorkerRegistration.pushManager.subscribe().then(
        function (pushSubscription) {
            console.log(pushSubscription.subscriptionId);
            console.log(pushSubscription.endpoint);
        }, function (error) {
            console.log(error);
        });
}
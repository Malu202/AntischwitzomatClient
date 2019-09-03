const api = "https://antischwitzomat.glitch.me/measurements";
var ids = [undefined, 123];

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

    for (var i = 0; i < response.length; i += response.length - 1) {
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
    (new Plot(tempCanvas, {
        xAxisSize: 0.08,
        yAxisSize: 0.08,
        // topMargin: 0.05,
        // rightMargin: 0.05,
        // yAxisLabelMaxDecimals: 3,
        yAxisMaxLabels: 15,
        yAxisLabelSuffix: "° ",
        drawGridLineX: false,
        drawGridLineY: false,
        // preferredLabelStepsY: [1, 2, 2.5, 5],
        xLabelNames: weatherStations[ids[0]].timeLabels,

        graphs: [
            {
                type: "shadow",
                x: weatherStations[ids[0]].times,
                y: weatherStations[ids[0]].temps,
                xHighlight: weatherStations[ids[0]].times,
                yHighlight: weatherStations[ids[0]].temps
            }
        ]
    })).draw();
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

    const temp = this.temps[this.temps.length - 1];
    const hum = this.hums[this.hums.length - 1];
    const press = this.press[this.press.length - 1];

    const tempGauge = new Gauge(tempDiv, 5, temp + "°", 5, 40, "#fff", "#000");
    tempGauge.animateValue(temp, temp + "°", 800)
    const humGauge = new Gauge(humDiv, 5, hum + "%", 30, 100, "#fff", "#000");
    humGauge.animateValue(hum, hum + "%", 800)
    const pressGauge = new Gauge(pressDiv, 5, press + " mbar", 1000, 100000, "#fff", "#000");
    pressGauge.animateValue(press, press + " mbar", 800);
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
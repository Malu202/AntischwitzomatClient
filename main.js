const api = "https://antischwitzomat.glitch.me/measurements";
const tempRequest = new XMLHttpRequest();
tempRequest.onload = onDataReceived;
tempRequest.open('get', api);
tempRequest.send();

const log = document.getElementById("output");
const tempCanvas = document.getElementById("tempPlot");
const dashboardDiv = document.getElementById("dashboard");


const timeLabels = [];
const times = [];
const temps = [];
const hums = [];
const press = [];

function onDataReceived(data) {
    var response = JSON.parse(this.responseText);
    
    for (var i = 0; i < response.length; i++) {
        const date = (new Date(response[i].time));
        
        times.push((date.getTime() / 1000));
        temps.push(response[i].temperature);
        hums.push(response[i].humidity);
        press.push(response[i].pressure);
    }
    addGaugePanel(temps[temps.length - 1], hums[hums.length - 1], press[press.length - 1]);
    
    for (var i = 0; i < response.length; i += response.length - 1) {
        const date = (new Date(response[i].time));
        const time = date.getHours() + ":" + date.getMinutes();
        timeLabels.push(time);
    }
    
    const timeLabelCount = 4;
    const plottedTime = (times[times.length - 1] - times[0]) * 1000;
    const stepSize = plottedTime / (timeLabelCount - 1);
    for (var i = 1; i < timeLabelCount - 1; i++) {
        const labelDate = new Date((times[0] * 1000 + stepSize * i));
        timeLabels.splice(i, 0, labelDate.getHours() + ":" + labelDate.getMinutes());
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
        xLabelNames: timeLabels,
        
        graphs: [
            {
                x: times,
                y: temps,
                xHighlight: times,
                yHighlight: temps
            }
        ]
    })).draw();
}

const gaugesBlueprint = document.getElementById("gauges");
const tempGaugeBlueprint = document.getElementById("tempGauge");
const humGaugeBlueprint = document.getElementById("humGauge")
const presGaugeBlueprint = document.getElementById("presGauge")


function addGaugePanel(temp, hum, press) {
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

    const tempGauge = new Gauge(tempDiv, 5, temp + "°", 5, 40, "#fff", "#000");
    tempGauge.animateValue(temp, temp + "°", 800)
    const humGauge = new Gauge(humDiv, 5, hum + "%", 30, 100, "#fff", "#000");
    humGauge.animateValue(hum, hum + "%", 800)
    const pressGauge = new Gauge(pressDiv, 5, press + " mbar", 1000, 100000, "#fff", "#000");
    pressGauge.animateValue(press, press + " mbar", 800);
}



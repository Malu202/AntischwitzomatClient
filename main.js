const api = "https://antischwitzomat.glitch.me/measurements";
const tempRequest = new XMLHttpRequest();
tempRequest.onload = onDataReceived;
tempRequest.open('get', api);
tempRequest.send();

const log = document.getElementById("output");
const tempCanvas = document.getElementById("tempPlot");
// const tempGauge = document.getElementById("tempGauge");
// const humGauge = document.getElementById("humGauge");
// const presGauge = document.getElementById("presGauge");
const body = document.getElementsByTagName("body")[0];


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

    

    // const currentTemp = temps[temps.length - 1];
    // const gauge1 = new Gauge(tempGauge, 5, currentTemp + "°", 5, 40, "#fff", "#000");
    // gauge1.animateValue(currentTemp, currentTemp + "°", 800)

    // const currentHum = hums[hums.length - 1];
    // const gauge2 = new Gauge(humGauge, 5, currentHum + "%", 30, 100, "#fff", "#000");
    // gauge2.animateValue(currentHum, currentHum + "%", 800)

    // const currentPres = press[press.length - 1];
    // const gauge3 = new Gauge(presGauge, 5, currentPres + " mbar", 1000, 100000, "#fff", "#000");
    // gauge3.animateValue(currentPres, currentPres + " mbar", 800)


}

function addGaugePanel(temp, hum, press) {
    const parent = document.createElement("div");
    parent.classList = "gauges"

    const tempDiv = document.createElement("div");
    const humDiv = document.createElement("div");
    const pressDiv = document.createElement("div");

    parent.appendChild(tempDiv);
    parent.appendChild(humDiv);
    parent.appendChild(pressDiv);
    body.insertBefore(parent, body.firstChild);

    const tempGauge = new Gauge(tempDiv, 5, temp + "°", 5, 40, "#fff", "#000");
    tempGauge.animateValue(temp, temp + "°", 800)
    const humGauge = new Gauge(humDiv, 5, hum + "%", 30, 100, "#fff", "#000");
    humGauge.animateValue(hum, hum + "%", 800)
    const pressGauge = new Gauge(pressDiv, 5, press + " mbar", 1000, 100000, "#fff", "#000");
    pressGauge.animateValue(press, press + " mbar", 800);
}



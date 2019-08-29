const api = "https://antischwitzomat.glitch.me/measurements";
const tempRequest = new XMLHttpRequest();
tempRequest.onload = onDataReceived;
tempRequest.open('get', api);
tempRequest.send();

const log = document.getElementById("output");
const tempCanvas = document.getElementById("tempCanvas");

var plot;

const timeLabels = [];
const times = [];
const temps = [];
const hums = [];
const press = [];
const win = this.window;
function onDataReceived(data) {
    var response = JSON.parse(this.responseText);

    for (var i = 0; i < response.length; i++) {
        const date = (new Date(response[i].time));

        times.push((date.getTime() / 1000));
        temps.push(response[i].temperature);
        hums.push(response[i].humidity);
        press.push(response[i].pressure);
    }

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
    plot = new Plot(tempCanvas, {
        xAxisSize: 0.08,
        yAxisSize: 0.08,
        // topMargin: 0.05,
        // rightMargin: 0.05,
        // xAxisLabelMaxDecimals: 1,
        // yAxisLabelMaxDecimals: 3,
        yAxisLabelSuffix: "° ",
        // yAxisLabelPrefix: "",
        // xAxisLabelSuffix: "",
        // xAxisLabelPrefix: "",
        // xAxisMaxLabels: 11,
        // yAxisMaxLabels: 15,
        // drawGridLineX: true,
        // drawGridLineY: true,
        // preferredLabelStepsX: [1, 2, 2.5, 5],
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
    });
    plot.draw();
}


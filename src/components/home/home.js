import * as template from "./home.html";
import { environment } from "../../environment";
import { getRoomMeasurements } from "../../api/api";


export function createHomeComponent() {
    let div = document.createElement("div");
    div.id = "dashboard";
    div.innerHTML = template;

    // var ids = ["esp"];
    // ids = [0];

    const log = div.querySelector("#output");
    const tempCanvas = div.querySelector("#tempPlot");

    const weatherStations = {};

    var gaugePanels = [];
    addPanels(2);

    let roomIds = [];
    var plottedValue = 0;

    getRoomMeasurements().then(rooms => {

        var response = rooms;
        console.log("rooms: " + JSON.stringify(rooms));


        let roomcount = Object.keys(rooms).length;
        roomIds = Object.keys(rooms);

        for (var i = 0; i < roomcount; i++) {
            weatherStations[roomIds[i]] = new WeatherStation();
        }
        for (var j = 0; j < roomcount; j++) {
            const station = weatherStations[roomIds[j]];
            // const station = weatherStations[response[i].sensor_id];
            if (station == undefined) continue;

            let measurements = rooms[roomIds[j]];
            for (var i = 0; i < measurements.length; i++) {
                const date = (new Date(measurements[i].time));
                station.times.push((date.getTime() / 1000));
                station.temps.push(measurements[i].temperature);
                station.hums.push(measurements[i].humidity);
                station.press.push(measurements[i].pressure);
            }
        }
        for (var i = roomcount - 1; i >= 0; i--) {
            weatherStations[roomIds[i]].addGaugePanel(i);
        }

        // if (false) return false;

        for (var i = 0; i < response.length; i += (response.length - 1) || 1) {
            const date = (new Date(response[i].time));
            const time = date.getHours() + ":" + date.getMinutes();
            weatherStations[ids[0]].timeLabels.push(time);
        }

        const timeLabelCount = 4;
        const plottedTime = (weatherStations[roomIds[0]].times[weatherStations[roomIds[0]].times.length - 1] - weatherStations[roomIds[0]].times[0]) * 1000;
        const stepSize = plottedTime / (timeLabelCount - 1);
        for (var i = 1; i < timeLabelCount - 1; i++) {
            const labelDate = new Date((weatherStations[roomIds[0]].times[0] * 1000 + stepSize * i));
            weatherStations[roomIds[0]].timeLabels.splice(i, 0, labelDate.getHours() + ":" + labelDate.getMinutes());
        }

        var plottableValues = [weatherStations[roomIds[0]].temps, weatherStations[roomIds[0]].hums, weatherStations[roomIds[0]].press];
        var suffixes = ['° ', '% ', '']
        createPlot(weatherStations[roomIds[0]].times, plottableValues[plottedValue], suffixes[plottedValue])
        tempCanvas.onclick = function () {
            plottedValue++;
            if (plottedValue > plottableValues.length - 1) plottedValue = 0;
            createPlot(weatherStations[roomIds[0]].times, plottableValues[plottedValue], suffixes[plottedValue])
        }
    });
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
            xLabelNames: weatherStations[roomIds[0]].timeLabels,

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
        const pressGauge = new Gauge(pressDiv, "", press, " mbar", 950, 1050, "#fff", "#000");
        pressGauge.animateValue(press, 800);
    }

    function addPanels(amount) {
        const gaugesBlueprint = div.querySelector("#gauges");
        const tempGaugeBlueprint = div.querySelector("#tempGauge");
        const humGaugeBlueprint = div.querySelector("#humGauge");
        const presGaugeBlueprint = div.querySelector("#presGauge");

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
            div.insertBefore(parent, div.firstChild);

            const gaugePanel = [tempDiv, humDiv, pressDiv];
            gaugePanels.push(gaugePanel);
        }
    }

    return div;
}
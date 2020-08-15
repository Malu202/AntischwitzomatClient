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

    let roomIds = [];
    var plottedValue = 0;

    getRoomMeasurements().then(rooms => {

        let roomcount = Object.keys(rooms).length;
        roomIds = Object.keys(rooms);
        if (roomcount == 0) return;

        addPanels(roomcount);

        for (var i = 0; i < roomcount; i++) {
            weatherStations[roomIds[i]] = new WeatherStation();
        }
        for (var j = 0; j < roomcount; j++) {
            const station = weatherStations[roomIds[j]];
            // const station = weatherStations[response[i].sensor_id];
            if (station == undefined) continue;

            station.name = rooms[roomIds[j]].name;
            let measurements = rooms[roomIds[j]].measurements;
            for (var i = 0; i < measurements.length; i++) {
                const date = (new Date(measurements[i].time));
                station.times.push((date.getTime() / 1000));
                station.temps.push(measurements[i].temperature);
                station.hums.push(measurements[i].humidity);
                station.press.push(measurements[i].pressure);

                // const time = date.getHours() + ":" + date.getMinutes();
                // station.timeLabels.push(time);
            }
        }
        for (var i = roomcount - 1; i >= 0; i--) {
            weatherStations[roomIds[i]].addGaugePanel(i);
        }

        // for (var i = 0; i < response.length; i += (response.length - 1) || 1) {
        //     const date = (new Date(response[i].time));
        //     const time = date.getHours() + ":" + date.getMinutes();
        //     weatherStations[ids[0]].timeLabels.push(time);
        // }

        const timeLabelCount = 4;
        let earliestMeasurement = Infinity;
        let latestMeasurement = 0;
        for (let i = 0; i < roomcount; i++) {
            let stationsEarliestMeasurement = weatherStations[roomIds[i]].times[0];
            let stationsLatestMeasurement = weatherStations[roomIds[i]].times[weatherStations[roomIds[i]].times.length - 1];
            if (stationsEarliestMeasurement < earliestMeasurement) earliestMeasurement = stationsEarliestMeasurement;
            if (stationsLatestMeasurement > latestMeasurement) latestMeasurement = stationsLatestMeasurement;
        }
        let plottedTime = (latestMeasurement - earliestMeasurement) * 1000;

        const stepSize = plottedTime / (timeLabelCount - 1);
        let timeLabels = [];
        for (var i = 0; i < timeLabelCount; i++) {
            const labelDate = new Date(earliestMeasurement * 1000 + stepSize * i);
            timeLabels.push(labelDate.getHours() + ":" + labelDate.getMinutes());
        }

        // var plottableValues = [weatherStations[roomIds[0]].temps, weatherStations[roomIds[0]].hums, weatherStations[roomIds[0]].press];
        let plottableValues = ["temps", "hums", "press"];


        var suffixes = ['° ', '% ', ''];
        tempCanvas.onclick = function () {
            plottedValue++;
            if (plottedValue > plottableValues.length - 1) plottedValue = 0;
            createPlot(weatherStations, plottableValues[plottedValue], timeLabels, suffixes[plottedValue])
        }
        plottedValue = plottableValues.length - 1;
        tempCanvas.click();
    });
    var plot;
    function createPlot(weatherstations, value, timeLabels, sf) {
        let graphsToPlot = [];
        for (let i = 0; i < roomIds.length; i++) {
            let station = weatherStations[roomIds[i]];
            let newGraph = {
                type: "line",
                x: station.times,
                y: station[value],
                xHighlight: station.times,
                yHighlight: station[value]
            };
            if (i == 0) newGraph.type = "shadow";
            graphsToPlot.push(newGraph);
        }

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
            xLabelNames: timeLabels,

            graphs: graphsToPlot
        });
    }


    function WeatherStation() {
        this.timeLabels = [];
        this.times = [];
        this.temps = [];
        this.hums = [];
        this.press = [];
        this.name = "";
    }

    WeatherStation.prototype.addGaugePanel = function (position) {
        const tempDiv = gaugePanels[position][0];
        const humDiv = gaugePanels[position][1];
        const pressDiv = gaugePanels[position][2];
        const heading = gaugePanels[position][3];

        heading.innerText = this.name;

        //Just for mockup:
        // if (this.temps[this.temps.length - 1] == undefined) {
        //     this.temps[this.temps.length - 1] = Math.round(Math.random() * 35 + 5);
        //     this.hums[this.hums.length - 1] = Math.round(Math.random() * 70 + 30);
        //     this.press[this.press.length - 1] = Math.round(Math.random() * 15 + 1000);
        // }

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
        const cardBlueprint = div.querySelector('#gaugeCard');
        const headingBlueprint = div.querySelector("#heading");
        const gaugesBlueprint = div.querySelector("#gauges");
        const tempGaugeBlueprint = div.querySelector("#tempGauge");
        const humGaugeBlueprint = div.querySelector("#humGauge");
        const presGaugeBlueprint = div.querySelector("#presGauge");

        for (var i = 0; i < amount; i++) {
            const parent = document.createElement("div");
            parent.classList = cardBlueprint.classList;


            const gaugesDiv = document.createElement("div");
            gaugesDiv.classList = gaugesBlueprint.classList;

            const heading = document.createElement("h5");
            heading.classList = headingBlueprint.classList;
            heading.innerText = "test"

            const tempDiv = document.createElement("div");
            tempDiv.classList = tempGaugeBlueprint.classList;
            const humDiv = document.createElement("div");
            humDiv.classList = humGaugeBlueprint.classList;
            const pressDiv = document.createElement("div");
            pressDiv.classList = presGaugeBlueprint.classList;

            gaugesDiv.appendChild(tempDiv);
            gaugesDiv.appendChild(humDiv);
            gaugesDiv.appendChild(pressDiv);

            parent.appendChild(heading);
            parent.appendChild(gaugesDiv);
            div.insertBefore(parent, div.firstChild);

            const gaugePanel = [tempDiv, humDiv, pressDiv, heading];
            gaugePanels.push(gaugePanel);
        }
    }

    return div;
}
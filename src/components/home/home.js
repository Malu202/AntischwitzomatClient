import * as template from "./home.html";

import {
    environment
}

    from "../../environment";

import {
    getRoomMeasurements
}

    from "../../api/api";
import { startOfToday, addHours } from "date-fns";

export function createHomeComponent() {
    let div = document.createElement("div");
    div.id = "dashboard";
    div.innerHTML = template;

    // var ids = ["esp"];
    // ids = [0];

    const log = div.querySelector("#output");
    const tempCanvas = div.querySelector("#tempPlot");
    const tempCard = div.querySelector("#tempCard");


    const weatherStations = {};

    var gaugePanels = [];

    let roomIds = [];
    var plottedValue = 0;

    getRoomMeasurements(addHours(startOfToday(), 4)).then(rooms => {

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

            let voltageMin = 2;
            let voltageMax = 3.2;
            let voltageMinDigital = (1024 / voltageMax) * voltageMin;
            for (var i = 0; i < measurements.length; i++) {
                const date = (new Date(measurements[i].time));
                station.times.push((date.getTime() / 1000));
                station.temps.push(measurements[i].temperature);
                station.hums.push(measurements[i].humidity);
                station.press.push(measurements[i].pressure);

                let voltageDigital = measurements[i].voltage;
                if (voltageDigital == 0) station.vol.push(0)
                else if (voltageDigital != null) station.vol.push(((voltageDigital - voltageMinDigital) / (1024 - voltageMinDigital)) * 100);
                else station.vol.push(null);
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
        let plottableValues = ["temps", "hums", "press", "vol"];
        let headlines = ["Temperature", "Humidity", "Pressure", "Voltage"];
        let colors = ["#4caf50", "#0077c2", "#9c64a6", "#018786"];
        let shadowColors = ["#80e27e", "#42a5f5", "#ce93d8", "#03DAC6"];



        var suffixes = ['° ', '% ', '', '% '];

        tempCard.onclick = function () {
            plottedValue++;
            if (plottedValue > plottableValues.length - 1) plottedValue = 0;
            createPlot(weatherStations, plottableValues[plottedValue], timeLabels, suffixes[plottedValue], colors[plottedValue], shadowColors[plottedValue], headlines[plottedValue])
        }

        plottedValue = plottableValues.length - 1;
        tempCard.click();
    }

    );
    var plot;

    function createPlot(weatherStations, value, timeLabels, sf, color, shadowColor, headline) {
        let graphsToPlot = [];

        for (let i = 0; i < roomIds.length; i++) {
            let station = weatherStations[roomIds[i]];

            if (station[value][0] == null) continue;

            let newGraph = {
                type: "line",
                x: station.times,
                y: station[value],
                xHighlight: station.times,
                yHighlight: station[value],
                shadowColor: shadowColor
            }

                ;
            if (i == 0) newGraph.type = "shadow";
            graphsToPlot.push(newGraph);
        }

        tempCanvas.parentElement.style.background = color;
        tempCanvas.parentElement.firstElementChild.innerText = headline;

        plot = new Plot(tempCanvas, {
            backgroundColor: color,
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
        }

        );
    }


    function WeatherStation() {
        this.timeLabels = [];
        this.times = [];
        this.temps = [];
        this.hums = [];
        this.press = [];
        this.vol = [];
        this.name = "";
    }

    WeatherStation.prototype.addGaugePanel = function (position) {
        const tempDiv = gaugePanels[position][0];
        const humDiv = gaugePanels[position][1];
        const pressDiv = gaugePanels[position][2];
        const heading = gaugePanels[position][3];


        let battery = this.vol[this.vol.length - 1];
        if (battery != null) Math.round(battery);
        var temp = this.temps[this.temps.length - 1];
        var hum = this.hums[this.hums.length - 1];
        var press = this.press[this.press.length - 1];

        if (battery == 0 && temp == null && hum == null && press == null) battery = battery = ", <i class='material-icons'>battery_alert</i>" + "Battery empty"; //sensor timeout
        else if (battery != null) battery = ", <i class='material-icons'>battery_std</i>" + battery + "%";
        else battery = ""; //external sensor
        let time = new Date(this.times[this.times.length - 1] * 1000).toLocaleTimeString().slice(0, -3);
        heading.innerHTML = this.name + " <span class='mdc-typography--subtitle2 subsensortext'>(" + time + battery + ")</span";

        //Just for mockup:
        // if (this.temps[this.temps.length - 1] == undefined) {
        //     this.temps[this.temps.length - 1] = Math.round(Math.random() * 35 + 5);
        //     this.hums[this.hums.length - 1] = Math.round(Math.random() * 70 + 30);
        //     this.press[this.press.length - 1] = Math.round(Math.random() * 15 + 1000);
        // }



        if (temp == null) temp = "- ";
        else temp = Math.round(temp);
        if (hum == null) hum = "- ";
        else hum = Math.round(hum);
        if (press == null) press = "- ";
        else press = Math.round(press);

        const tempGauge = new Gauge(tempDiv, "", temp, "°", 5, 40, "#fff", "#000");
        tempGauge.animateValue(temp, 800);
        const humGauge = new Gauge(humDiv, "", hum, "%", 30, 99, "#fff", "#000");
        humGauge.animateValue(hum, 800);
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
            heading.innerText = "Room"

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

            const gaugePanel = [tempDiv,
                humDiv,
                pressDiv,
                heading];
            gaugePanels.push(gaugePanel);
        }
    }

    return div;
}
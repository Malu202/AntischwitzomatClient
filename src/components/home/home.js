import * as template from "./home.html";

import {
    environment
}

    from "../../environment";

import {
    getCurrentRoomMeasurements,
    getRoomMeasurements
}

    from "../../api/api";

function startOfToday() {
    let date = new Date();
    date.setHours(0, 0, 0);
    return date;
}
function sameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();
}

const timeFormat = new Intl.DateTimeFormat(["de-AT"], { hour: "2-digit", minute: "2-digit" });

function formatTimeForGauge(time) {
    return time.toLocaleTimeString().slice(0, -3);
}

const voltageMin = 2;
const voltageMax = 3.2;
const voltageMinDigital = (1024 / voltageMax) * voltageMin;

function convertVoltage(v) {
    if (v == 0) {
        return 0;
    }
    if (v != null) {
        return ((v - voltageMinDigital) / (1024 - voltageMinDigital)) * 100;
    }
    return null;
}

export function createHomeComponent() {
    let dashboard = document.createElement("div");
    dashboard.id = "dashboard";
    dashboard.innerHTML = template;

    // var ids = ["esp"];
    // ids = [0];

    const log = dashboard.querySelector("#output");
    const tempCanvas = dashboard.querySelector("#tempPlot");
    const tempCard = dashboard.querySelector("#tempCard");
    const plottedValueLabel = dashboard.querySelector("#plottedValueLabel");
    const previousDay = dashboard.querySelector("#previousDay");
    const nextDay = dashboard.querySelector("#nextDay");
    const currentDayLabel = dashboard.querySelector("#currentDayLabel");



    const weatherStations = {};

    var gaugePanels = [];

    let roomIds = [];
    var plottedValue = 0;

    let plottedDate = startOfToday();
    loadAndDrawPlots(plottedDate);

    nextDay.addEventListener("click", (e) => {
        plottedDate = offsetByNDays(plottedDate, 1);
        if (offsetByNDays(plottedDate, 1) > new Date()) nextDay.style.visibility = "hidden";

        drawSelectedDay();
        e.stopPropagation();
    });
    previousDay.addEventListener("click", (e) => {
        nextDay.style.visibility = "visible";
        plottedDate = offsetByNDays(plottedDate, -1);

        drawSelectedDay();
        e.stopPropagation();
    });
    function drawSelectedDay() {
        if (!sameDay(plottedDate, startOfToday())) currentDayLabel.innerText = plottedDate.toLocaleDateString();
        else currentDayLabel.innerText = "Today";
        loadAndDrawPlots(plottedDate, offsetByNDays(plottedDate, 1));
    }

    function offsetByNDays(date, N) {
        let newDate = new Date(date);
        return new Date(newDate.setDate(date.getDate() + N));
    };

    function loadAndDrawPlots(start, end) {
        getRoomMeasurements(start, end).then(rooms => {
            let roomcount = Object.keys(rooms).length;
            roomIds = Object.keys(rooms);
            if (roomcount == 0) return;

            addEmptyPanels(roomcount);

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
                    station.vol.push(convertVoltage(measurements[i].voltage));
                }
            }

            getCurrentRoomMeasurements().then(currentRoomMeasurements => {
                for (var i = roomcount - 1; i >= 0; i--) {
                    weatherStations[roomIds[i]].addGaugePanel(i, currentRoomMeasurements[roomIds[i]].measurements);
                }
            });

            const timeLabelCount = 4;
            let earliestMeasurement = Infinity;
            let latestMeasurement = 0;

            for (let i = 0; i < roomcount; i++) {
                let stationsEarliestMeasurement = weatherStations[roomIds[i]].times[0];
                let stationsLatestMeasurement = weatherStations[roomIds[i]].times[weatherStations[roomIds[i]].times.length - 1];
                if (stationsEarliestMeasurement < earliestMeasurement) earliestMeasurement = stationsEarliestMeasurement;
                if (stationsLatestMeasurement > latestMeasurement) latestMeasurement = stationsLatestMeasurement;
            }
            if (earliestMeasurement == Infinity || latestMeasurement == 0) { return; }
            let plottedTime = (latestMeasurement - earliestMeasurement) * 1000;

            const stepSize = plottedTime / (timeLabelCount - 1);
            let timeLabels = [];

            for (var i = 0; i < timeLabelCount; i++) {
                const labelDate = new Date(earliestMeasurement * 1000 + stepSize * i);
                let text = timeFormat.format(new Date(labelDate));
                timeLabels.push(text);
            }

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
        });
    };

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
        plottedValueLabel.innerText = headline;

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

    WeatherStation.prototype.addGaugePanel = function (position, currentRoomMeasurements) {
        const tempDiv = gaugePanels[position][0];
        const humDiv = gaugePanels[position][1];
        const pressDiv = gaugePanels[position][2];
        const heading = gaugePanels[position][3];


        let battery = currentRoomMeasurements.voltage;
        if (battery != null) battery = Math.round(convertVoltage(battery));
        var temp = currentRoomMeasurements.temperature;
        var hum = currentRoomMeasurements.humidity;
        var press = currentRoomMeasurements.pressure;

        let batteryEmpty = battery == 0 && temp == null && hum == null && press == null;
        if (batteryEmpty) battery = battery = ", <i class='material-icons'>battery_alert</i>" + "Battery empty"; //sensor timeout
        else if (battery != null) battery = ", <i class='material-icons'>battery_std</i>" + battery + "%";
        else battery = ""; //external sensor

        let time = formatTimeForGauge(new Date(currentRoomMeasurements.time));
        if (batteryEmpty) time = (new Date(currentRoomMeasurements.time)).toLocaleDateString();
        heading.innerHTML = this.name + " <span class='mdc-typography--subtitle2 subsensortext'>(" + time + battery + ")</span";

        //Just for mockup:
        // if (this.temps[this.temps.length - 1] == undefined) {
        //     this.temps[this.temps.length - 1] = Math.round(Math.random() * 35 + 5);
        //     this.hums[this.hums.length - 1] = Math.round(Math.random() * 70 + 30);
        //     this.press[this.press.length - 1] = Math.round(Math.random() * 15 + 1000);
        // }



        if (temp == null) temp = "- ";
        else temp = Math.round(temp * 10) / 10;
        if (hum == null) hum = "- ";
        else hum = Math.round(hum);
        if (press == null) press = "- ";
        else press = Math.round(press);

        let tempPrefix = "";
        if (temp < 10 && temp >= 0) tempPrefix = " "

        const tempGauge = new Gauge(tempDiv, tempPrefix, temp, "°", -10, 40, "#fff", "#000");
        tempGauge.animateValue(temp, 800);
        const humGauge = new Gauge(humDiv, " ", hum, "% ", 30, 99, "#fff", "#000");
        humGauge.animateValue(hum, 800);
        const pressGauge = new Gauge(pressDiv, "", press, " mb", 950, 1050, "#fff", "#000");
        pressGauge.animateValue(press, 800);
    }

    function addEmptyPanels(amount) {
        if (gaugePanels.length > 0) return dashboard;
        const cardBlueprint = dashboard.querySelector('#gaugeCard');
        const headingBlueprint = dashboard.querySelector("#heading");
        const gaugesBlueprint = dashboard.querySelector("#gauges");
        const tempGaugeBlueprint = dashboard.querySelector("#tempGauge");
        const humGaugeBlueprint = dashboard.querySelector("#humGauge");
        const presGaugeBlueprint = dashboard.querySelector("#presGauge");

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
            dashboard.insertBefore(parent, dashboard.firstChild);

            const gaugePanel = [tempDiv,
                humDiv,
                pressDiv,
                heading];
            gaugePanels.push(gaugePanel);
        }
    }

    return dashboard;
}
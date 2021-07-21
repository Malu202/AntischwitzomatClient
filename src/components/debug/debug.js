import * as template from "./debug.html";
import { environment } from "../../environment";
import {
    getMeasurements,
    sendMeasurement,
    deleteDatabase
} from "../../api/api";

let measurementLogLength = 5000;

export class DebugComponent extends HTMLElement {

    constructor() {
        super();
        this.innerHTML = template;
    }

    connectedCallback() {
        this.log = this.querySelector("#output");
        this.temp = this.querySelector("#temp");
        this.hum = this.querySelector("#hum");
        this.pres = this.querySelector("#pres");
        this.sendButton = this.querySelector("#send");
        this.deleteButton = this.querySelector("#delete");
        this.sensor_id = this.querySelector("#sensor_id");
        this.loadAllLogsButton = this.querySelector("#loadAllLogsButton");
        this.refresh();

        // this.deleteButton.addEventListener("click", () =>
        //     deleteDatabase().then(() => {
        //         this.refresh();
        //     }));
        this.sendButton.addEventListener("click", () => {
            let id;
            if (this.sensor_id.value == "") id = "0";
            else id = this.sensor_id.value;
            sendMeasurement(id, this.temp.value,
                this.hum.value,
                this.pres.value).then(() =>
                    this.refresh());
        });
        this.loadAllLogsButton.addEventListener("click", () => {
            measurementLogLength = Infinity;
            this.loadAllLogsButton.parentNode.removeChild(this.loadAllLogsButton);
            this.refresh();
        })
    }

    refresh() {
        getMeasurements().then(response => {
            this.log.innerHTML = "";
            var table = document.createElement("table");

            table.className = "debug-table";
            var thead = document.createElement("thead");
            var hr = document.createElement("tr");
            let createHead = (value) => {
                let td = document.createElement("td");
                td.innerText = value;
                hr.appendChild(td);
            };
            createHead("Time");
            createHead("Sensor ID");
            createHead("Temperature");
            createHead("Humidity");
            createHead("Pressure");
            createHead("On time");
            createHead("Battery");
            thead.appendChild(hr);
            var tbody = document.createElement("tbody");
            table.appendChild(thead);
            table.appendChild(tbody);
            let oldestMsgToShow = response.length - measurementLogLength;
            if (oldestMsgToShow < 0) oldestMsgToShow = 0;
            for (var i = response.length - 1; i >= oldestMsgToShow; i--) {
                let row = document.createElement("tr");
                tbody.appendChild(row);
                let createCell = (value) => {
                    let td = document.createElement("td");
                    td.innerText = value;
                    row.appendChild(td);
                };
                createCell(new Date(response[i].time).toLocaleString());
                createCell(response[i].sensor_id);
                createCell(response[i].temperature + "°C");
                createCell(response[i].humidity + "%");
                createCell(response[i].pressure + "mbar");

                let ontime = "-";
                if (response[i].ontime != null) ontime = response[i].ontime + "ms";
                createCell(ontime);

                let voltage = "-";
                if (response[i].voltage != null) voltage = response[i].voltage;
                createCell(voltage);
            }
            this.log.appendChild(table);
        });
    }

}
customElements.define('app-debug-component', DebugComponent);
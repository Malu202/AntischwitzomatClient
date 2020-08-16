import * as template from "./debug.html";
import { environment } from "../../environment";
import {
    getMeasurements,
    sendMeasurement,
    deleteDatabase
} from "../../api/api";

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
        this.refresh();

        this.deleteButton.addEventListener("click", () =>
            deleteDatabase().then(() => {
                this.refresh();
            }));
        this.sendButton.addEventListener("click", () => {
            let id;
            if (this.sensor_id.value == "") id = "0";
            else id = this.sensor_id.value;
            sendMeasurement(id, this.temp.value,
                this.hum.value,
                this.pres.value).then(() =>
                    this.refresh());
        });
    }

    refresh() {
        getMeasurements().then(response => {
            this.log.innerHTML = "";
            var data = document.createElement("div");
            for (var i = response.length - 1; i >= 0; i--) {
                var dataLine = document.createElement("div");
                // data.innerHTML += (new Date(response[i].time)).toLocaleString() + " " + response[i].temperature + "°C " + response[i].humidity + "% " + response[i].pressure + "mbar" + " " + response[i].id + '<br />';
                dataLine.innerText = (new Date(response[i].time)).toLocaleString() + " " + response[i].temperature + "°C " + response[i].humidity + "% " + response[i].pressure + "mbar" + " " + response[i].sensor_id;
                data.appendChild(dataLine);
            }
            this.log.appendChild(data);
        });
    }

}
customElements.define('app-debug-component', DebugComponent);
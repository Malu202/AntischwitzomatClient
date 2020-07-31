import * as template from "./room-editor.html";
import { createRoom, deleteRoom } from "../../api/api";

export const RoomEditorTagName = "app-room-editor";

export class RoomEditor extends HTMLElement {

    constructor() {
        super();
        this.innerHTML = template;
    }

    connectedCallback() {
        this.sensor1Select = this.querySelector("#sensor1");
        this.sensor2Select = this.querySelector("#sensor2");
        this.typeSelect = this.querySelector("#type");
        this.removeButton = this.querySelector("#remove");

        this.removeButton.addEventListener("click", this.delete.bind(this));
        this.saveButton = this.querySelector("#save");
        this.saveButton.addEventListener("click", this.save.bind(this));
        this.nameInvalid = this.querySelector("#name-invalid");
        this.roomname = this.querySelector("#roomname");
    }

    save() {
        let name = this.roomname.value;
        this.nameInvalid.style.display = !name ? "block" : "none";
        if (name) {
            if (!this.id) {
                createRoom(name,
                    this.typeSelect.value,
                    parseInt(this.sensor1Select.value),
                    this.sensor2Select.value ? parseInt(this.sensor2Select.value) : null).
                    then(res => {
                        this.id = res.room_id;
                    });
            }
            else {
                // TODO update
            }
        }
    }

    delete() {
        if (this.id) {
            deleteRoom(this.id).then(() => {
                this.dispatchEvent(new CustomEvent("onremove"));
            })
        }
        else {
            this.dispatchEvent(new CustomEvent("onremove"));
        }
    }

    setData(id, name, sensor1, sensor2, type) {
        this.id = id;
        this.roomname.value = name;
        this.sensor1Select.value = sensor1;
        this.sensor2Select.value = sensor2;
        this.typeSelect.value = type;
    }

    setSensors(sensors) {
        for (let sensorSelect of [
            { select: this.sensor1Select, required: true },
            { select: this.sensor2Select, required: false }]) {
            sensorSelect.select.innerHTML = "";
            if (!sensorSelect.required) {
                let option = document.createElement("option");
                sensorSelect.select.appendChild(option);
            }
            for (let sensor of sensors) {
                let option = document.createElement("option");
                option.innerText = `Sensor ${sensor.sensor_id}`;
                option.value = sensor.sensor_id;
                sensorSelect.select.appendChild(option);
            }
        }
    }
}
customElements.define(RoomEditorTagName, RoomEditor);
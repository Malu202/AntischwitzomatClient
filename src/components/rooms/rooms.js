import * as template from "./rooms.html";
import { RoomEditor, RoomEditorTagName } from "../room/room-editor";
import { getRooms } from "../../api/api";

export class RoomsComponent extends HTMLElement {

    constructor() {
        super();
        this.innerHTML = template;
        this.sensors = [];
    }

    connectedCallback() {
        this.roomsContainer = this.querySelector("#rooms");
        this.addRoomButton = this.querySelector("#add-room");
        this.addRoomButton.addEventListener("click", () => this.addRoom());

        // fetch me configured room

        this.updateSensors([0, 1, 2]);

        this.refreshRooms();
    }

    refreshRooms() {
        getRooms().then(rooms => {
            this.roomsContainer.innerHTML = "";
            for (let room of rooms) {
                this.addRoom(room);
            }
        })
    }

    addRoom(data) {
        let editor = new RoomEditor();
        this.roomsContainer.appendChild(editor);
        editor.setSensors(this.sensors);
        if (data) {
            editor.setData(data.room_id,
                data.name,
                data.sensor_id1,
                data.sensor_id2,
                data.type);
        }
        editor.addEventListener("onremove", () => {
            this.roomsContainer.removeChild(editor);
        })
    }

    updateSensors(sensors) {
        this.sensors = sensors;
        this.roomsContainer.querySelectorAll(RoomEditorTagName).forEach(r => {
            r.setSensors(sensors);
        })
    }

    onload() {

    }
}
customElements.define('app-rooms-component', RoomsComponent);
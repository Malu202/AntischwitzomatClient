import template from "./notification-editor.html";
import { createNotification, deleteNotification } from "../../api/api";

export const NotificationEditorTagName = "app-notification-editor";

export class NotificationEditor extends HTMLElement {

    constructor() {
        super();
        this.innerHTML = template;
    }

    connectedCallback() {
        this.messagetext = this.querySelector("#messageText");
        this.room1Select = this.querySelector("#room1");
        this.room2Select = this.querySelector("#room2");
        this.typeSelect = this.querySelector("#type");
        this.value = this.querySelector("#value");
        this.amount = this.querySelector("#amount");



        this.removeButton = this.querySelector("#remove");
        this.removeButton.addEventListener("click", this.delete.bind(this));
        this.saveButton = this.querySelector("#save");
        this.saveButton.addEventListener("click", this.save.bind(this));
        this.nameInvalid = this.querySelector("#name-invalid");
    }


    delete() {
        if (this.id) {
            deleteNotification(this.id).then(() => {
                this.dispatchEvent(new CustomEvent("onremove"));
            })
        }
        else {
            this.dispatchEvent(new CustomEvent("onremove"));
        }
    }


    save() {

        let messagetext = this.messagetext.value;
        this.nameInvalid.style.display = !messagetext ? "block" : "none";
        if (messagetext) {
            if (!this.id) {
                createNotification(
                    messagetext,
                    parseInt(this.room1Select.value),
                    this.room2Select.value != "Fixed Value" ? parseInt(this.room2Select.value) : null,
                    this.typeSelect.value,
                    parseFloat(this.amount.value),
                    this.value.value).
                    then(res => {
                        this.id = res.notification_id;
                    });
            }
            else {
                // TODO update
            }
        }
    }
    delete() {
        if (this.id) {
            deleteNotification(this.id).then(() => {
                this.dispatchEvent(new CustomEvent("onremove"));
            })
        }
        else {
            this.dispatchEvent(new CustomEvent("onremove"));
        }
    }

    setData(id, text, room1, room2, amount, type, value) {
        this.id = id;
        this.messagetext.value = text;
        this.room1Select.value = room1;
        this.room2Select.value = room2;
        this.typeSelect.value = type;
        this.value.value = value;
        this.amount.value = amount;

    }
    setRooms(rooms) {
        for (let roomSelect of [
            { room: this.room1Select, required: true },
            { room: this.room2Select, required: false }]) {
            roomSelect.room.innerHTML = "";
            if (!roomSelect.required) {
                let option = document.createElement("option");
                option.innerText = `Fixed Value`;
                option.value = null;
                roomSelect.room.appendChild(option);
            }
            for (let room of rooms) {
                let option = document.createElement("option");
                option.innerText = `${room.name}`;
                option.value = room.room_id;
                roomSelect.room.appendChild(option);
            }
        }
    }

}
customElements.define(NotificationEditorTagName, NotificationEditor);
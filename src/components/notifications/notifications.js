import * as template from "./notifications.html";
import { NotificationEditor, NotificationEditorTagName } from "../notification/notification-editor";
import { getNotifications, getRooms } from "../../api/api";

// import { getRooms } from "../../api/api";

// endpoint TEXT NOT NULL,
//             key_p256dh TEXT NOT NULL,
//             key_auth TEXT NOT NULL,


export class NotificationsComponent extends HTMLElement {

    constructor() {
        super();
        this.innerHTML = template;

        this.rooms = [];

    }

    connectedCallback() {
        this.notificationsContainer = this.querySelector("#notifications");
        this.addNotificationButton = this.querySelector("#add-notification");
        this.addNotificationButton.addEventListener("click", () => this.addNotification());

        this.updateRooms();
        this.refreshNotifications();
    }
    refreshNotifications() {
        getNotifications().then(notifications => {
            this.notificationsContainer.innerHTML = "";
            for (let notification of notifications) {
                this.addNotification(notification);
            }
        })
    }
    addNotification(data) {
        let editor = new NotificationEditor();
        this.notificationsContainer.appendChild(editor);
        editor.setRooms(this.rooms);
        if (data) {
            editor.setData(
                data.notification_id,
                data.message,
                data.room_id1,
                data.room_id2,
                data.amount,
                data.type,
                data.value);
        }
        editor.addEventListener("onremove", () => {
            this.notificationsContainer.removeChild(editor);
        })
    }
    updateRooms() {
        getRooms().then(rooms => {
            this.rooms = rooms;
            this.notificationsContainer.querySelectorAll(NotificationEditorTagName).forEach(r => {
                r.setRooms(rooms);
            })
        });
    }
}
customElements.define('app-notifications-component', NotificationsComponent);
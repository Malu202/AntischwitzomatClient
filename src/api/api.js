import { environment } from "../environment";
import { setupNotifications, getPushSubscription } from "../components/pushNotifications"

function getUserId() {
    return window.localStorage.getItem("user_id");
}

function setUserId(res) {
    window.localStorage.setItem("user_id", res.user_id);
    return res;
}

export function getMeasurements() {
    return fetch(`${environment.API_URL}measurements`, {
        headers: { 'Accept': 'application/json' }
    }).then(res => res.json());
}

export function sendMeasurement(id, temp, hum, pres) {
    return fetch(`${environment.API_URL}measurements`, {
        body: JSON.stringify({
            i: id,
            t: temp * 100,
            h: hum * 100,
            p: pres * 10000
        }),
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(res => res.text());
}

export function deleteDatabase() {
    return fetch(`${environment.API_URL}measurements`, {
        method: "DELETE"
    }).then(res => res.text());
}

export function getSensors() {
    return fetch(`${environment.API_URL}sensors`, {
        headers: {
            'Accept': 'application/json'
        }
    }).then(res => res.json());
}

export function getRooms() {
    let userId = getUserId();
    if (null == userId) {
        return Promise.resolve([]);
    }
    return fetch(`${environment.API_URL}rooms?user_id=${getUserId()}`, {
        headers: {
            'Accept': 'application/json'
        }
    }).then(res => res.json());
}

export function deleteRoom(roomId) {
    return fetch(`${environment.API_URL}rooms?room_id=${roomId}`, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json'
        }
    }).then(res => res.text());
}

export function createRoom(name, type, sensorId1, sensorId2) {
    return fetch(`${environment.API_URL}rooms`, {
        body: JSON.stringify({
            user_id: getUserId(),
            name: name,
            type: type,
            sensor_id1: sensorId1,
            sensor_id2: sensorId2
        }),
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(setUserId);
}

export function getNotifications() {
    let userId = getUserId();
    if (null == userId) {
        return Promise.resolve([]);
    }
    return fetch(`${environment.API_URL}notifications?user_id=${getUserId()}`, {
        headers: {
            'Accept': 'application/json'
        }
    }).then(res => res.json());
}

export function deleteNotification(notification_id) {
    return fetch(`${environment.API_URL}notifications?notification_id=${notification_id}`, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json'
        }
    }).then(res => res.text());
}

export function createNotification(text, room1, room2, type, amount, value) {
    return getPushSubscription().then(keys => {
        let pushNotificationKeys = JSON.parse(JSON.stringify(keys));
        console.log(pushNotificationKeys);
        if (value == "voltage") {
            let voltageMin = 2;
            let voltageMax = 3.2;
            let voltageMinDigital = (1024 / voltageMax) * voltageMin;
            let voltageDigital = voltageMinDigital + amount * 0.01 * (1024 - voltageMinDigital);

            amount = voltageDigital;
        }

        return fetch(`${environment.API_URL}notifications`, {
            body: JSON.stringify({
                user_id: getUserId(),
                type: type,
                value: value,
                room_id1: room1,
                room_id2: room2,
                amount: amount,
                message: text,
                endpoint: pushNotificationKeys.endpoint,
                keys: pushNotificationKeys.keys
                // key_p256dh: pushNotificationKeys.keys.p256dh,
                // key_auth: pushNotificationKeys.keys.auth
            }),
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(setUserId);
    });
}



export function getRoomMeasurements(after) {
    let userId = getUserId();
    if (null == userId) {
        return Promise.resolve([]);
    }
    return fetch(`${environment.API_URL}roomMeasurements?user_id=${getUserId()}&after=${after.toISOString()}`, {
        headers: {
            'Accept': 'application/json'
        }
    }).then(res => res.json());
}

export function getCurrentRoomMeasurements() {
    let userId = getUserId();
    if (null == userId) {
        return Promise.resolve([]);
    }
    return fetch(`${environment.API_URL}currentroommeasurements?user_id=${getUserId()}`, {
        headers: {
            'Accept': 'application/json'
        }
    }).then(res => res.json());
}

let latestPushSubscriptionUpdate = null;
export async function updatePushSubscriptionEndpoint() {
    if (Notification.permission !== "granted") Promise.resolve();

    let userId = getUserId();
    if (null == userId) {
        return Promise.resolve();
    }
    await navigator.serviceWorker.ready;
    return getPushSubscription()
        .then(keys => {
            let pushNotificationKeys = JSON.parse(JSON.stringify(keys));
            if (JSON.stringify(pushNotificationKeys) == JSON.stringify(latestPushSubscriptionUpdate)) {
                console.log("Push Notification Subscription did not change since App start. Not updating again.")
                return;
            }
            fetch(`${environment.API_URL}pushSubscriptionUpdate`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: userId,
                    update: pushNotificationKeys
                })
            }).then(res => res.json())
                .then(res => {
                    if (res.error == null) latestPushSubscriptionUpdate = pushNotificationKeys;
                });
        });
}
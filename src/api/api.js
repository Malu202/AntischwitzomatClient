import { environment } from "../environment";

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
            i: "0",
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
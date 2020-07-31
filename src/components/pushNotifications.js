import { environment } from "../environment";

let isNotificationSetup = false;

function setupNotifications() {
    if (isNotificationSetup) return;
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistration().then((serviceWorkerRegistration) => {

            serviceWorkerRegistration.pushManager.subscribe(
                {
                    userVisibleOnly: true,
                    applicationServerKey: environment.NOTIFICATION_PUBLIC_KEY
                }
            ).then(
                function (pushSubscription) {
                    // console.log(pushSubscription.subscriptionId);
                    // console.log(pushSubscription.endpoint);
                    console.log(JSON.stringify(pushSubscription));
                    // sendNotificationDetails(pushSubscription);
                    isNotificationSetup = true;
                    return;
                }, function (error) {
                    console.log(error);
                    return;
                });
        });
    }
}

// export async function getPushSubscription() {
//     if (!isNotificationSetup) await setupNotifications();
//     navigator.serviceWorker.ready
//         .then(
//             serviceWorkerRegistration.pushManager.getSubscription()
//             .then((subscription) => {
//             return subscription
//         ));
// }

export async function getPushSubscription() {
    if (!isNotificationSetup) await setupNotifications();
    return navigator.serviceWorker.ready
        .then((serviceWorkerRegistration) => {
            return serviceWorkerRegistration.pushManager.getSubscription();
        })
        .then((subscription) => {
            return JSON.parse(JSON.stringify(subscription))
        });
}

function sendNotificationDetails(subscription) {
    // var xhr = new XMLHttpRequest();
    // xhr.open("POST", environment.NOTIFICATIONS_URL, true);
    // xhr.setRequestHeader('Content-Type', 'application/json');
    // xhr.send(JSON.stringify(subscription));
}

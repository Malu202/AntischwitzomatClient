import "./lib/gauge.min.js"
import "./lib/plot.min.js"
import { Router, ContainerRouteRenderer } from "route-it"
import { RouteResolver } from "./route-resolver";
import "./style.scss";
import { environment } from "./environment";
import { convertLinks } from "./components/convert-links";
import runtime from 'serviceworker-webpack-plugin/lib/runtime';

let router = new Router(new RouteResolver(), new ContainerRouteRenderer(document.getElementById("content")));
router.run();
convertLinks(document.querySelectorAll("a"), router);
document.querySelector("#home-button").addEventListener("click", () => router.navigate(""));


if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        runtime.register().then(function (registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
            // setupPushNotifications(registration);
        }, function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

function setupPushNotifications(serviceWorkerRegistration) {
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
            sendNotificationDetails(pushSubscription);
        }, function (error) {
            console.log(error);
        });
}

function sendNotificationDetails(subscription) {
    // var xhr = new XMLHttpRequest();
    // xhr.open("POST", environment.NOTIFICATIONS_URL, true);
    // xhr.setRequestHeader('Content-Type', 'application/json');
    // xhr.send(JSON.stringify(subscription));
}
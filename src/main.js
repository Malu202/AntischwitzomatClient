import "./lib/gauge.min.js"
import "./lib/plot.min.js"
import { Router, ContainerRouteRenderer } from "route-it"
import { RouteResolver } from "./route-resolver";
import "./style.scss";
import "./favicons.js";
import "../site.webmanifest";
import { environment } from "./environment";
import { convertLinks } from "./components/convert-links";
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import { updatePushSubscriptionEndpoint } from "./api/api";

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

updatePushSubscriptionEndpoint();
let lastFocusTime;
function focus() {
    if (!lastFocusTime || ((new Date()).getTime() - lastFocusTime) > 5000) {
        lastFocusTime = (new Date()).getTime();
        router.navigate("", "Antischwitzomat", true);
    }
    updatePushSubscriptionEndpoint();
}
window.addEventListener("focus", focus);
document.addEventListener("focus", focus);
import "./lib/gauge.min.js"
import "./lib/plot.min.js"
import { Router, ContainerRouteRenderer } from "route-it"
import { RouteResolver } from "./route-resolver";
import "./style.scss";
import { convertLinks } from "./components/convert-links";
import { updatePushSubscriptionEndpoint } from "./api/api";

let router = new Router(new RouteResolver(), new ContainerRouteRenderer(document.getElementById("content")));
router.run();
convertLinks(document.querySelectorAll("a"), router);
document.querySelector("#home-button").addEventListener("click", () => router.navigate(""));

if ("serviceWorker" in navigator) {
    window.addEventListener("load", async () => {
        navigator.serviceWorker.register("./worker.js").then(registration => {
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}

let lastFocusTime;
updatePushSubscriptionEndpoint();
function focus() {
    if (!lastFocusTime || ((new Date()).getTime() - lastFocusTime) > 5000 && window.location.pathname == "/") {
        lastFocusTime = (new Date()).getTime();
        router.navigate("", "Antischwitzomat", true);
    }
    updatePushSubscriptionEndpoint();
}
window.addEventListener("focus", focus);
document.addEventListener("focus", focus);
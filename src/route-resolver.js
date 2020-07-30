import { createHomeComponent } from "./components/home/home";
import { RoomsComponent } from "./components/rooms/rooms";

export class RouteResolver {
    resolve(lastRoute, currentRoute, router) {
        switch (currentRoute) {
            // case "page1-div": // route /simple/page1-div
            //     let div = document.createElement("div");
            //     ...
            //     return div;
            // case "page2-webcomponent": // route /page2-webcomponent
            //     let component = new SomeFancyComponent();
            //     return component;
            case "rooms":
                return new RoomsComponent();
            case "":
                return createHomeComponent();
            default:
                return false;
        }
    }
}
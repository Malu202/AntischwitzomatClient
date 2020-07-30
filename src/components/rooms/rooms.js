import * as template from "./rooms.html";

export class RoomsComponent extends HTMLElement {

    constructor() {
        super();
        this.innerHTML = template;
    }

    connectedCallback() {
        this.querySelector("h1");

        // fetch me configured rooms
    }
}

customElements.define('app-rooms-component', RoomsComponent);
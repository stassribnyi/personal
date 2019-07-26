import { Application } from "./app.js";

let app = null;

document.addEventListener("DOMContentLoaded", () => (app = new Application()));

window.onunload = () => app && app.destroy();

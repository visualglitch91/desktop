import { h, render } from "preact";
import "@mdi/font/css/materialdesignicons.min.css";
import wallpaper from "./wallpaper.jpg";
import App from "./App";
import "./index.css";

window.isDesktop = window !== window.parent;

document.body.style.backgroundImage = `url(${wallpaper})`;
document.body.style.backgroundSize = "cover";

render(<App />, document.getElementById("root") as HTMLElement); // this should never be null

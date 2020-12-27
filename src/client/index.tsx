import { h, render } from "preact";
import "@mdi/font/css/materialdesignicons.min.css";
import wallpaper from "./wallpaper.jpg";
import App from "./App";
import "./index.css";

window.isDesktop = window !== window.parent;

const root = document.getElementById("root") as HTMLElement; // this should never be null
const bg = document.getElementById("bg") as HTMLElement; // this should never be null

const bgImg = document.createElement("img");

bgImg.src = wallpaper;
bg.appendChild(bgImg);

bgImg.onload = () => {
  document.body.classList.add("loaded");
};

render(<App />, root);

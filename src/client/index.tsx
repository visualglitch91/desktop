import { h, render } from "preact";
import "@mdi/font/css/materialdesignicons.min.css";
import App from "./App";
import "./index.css";

window.isDesktop = window !== window.parent;

const root = document.getElementById("root") as HTMLElement; // this should never be null
const bg = document.getElementById("bg") as HTMLElement; // this should never be null

const bgImg = document.createElement("img");

bgImg.src = "/wallpaper";
bg.appendChild(bgImg);

function onResize() {
  const width = 2010;
  const height = (window.innerHeight / window.innerWidth) * width;
  const scale = window.innerWidth / width;

  root.style.width = `${width}px`;
  root.style.height = `${height}px`;
  root.style.transform = `scale(${scale})`;
}

window.addEventListener("resize", () => {
  onResize();
});

bgImg.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

onResize();
render(<App />, root);

import { h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import FadeIn from "../base/FadeIn";
import Element from "../base/Element";
import Panel from "../base/Panel";
import links from "./links";
import "./styles.css";

function whenLoaded(img: HTMLImageElement) {
  return new Promise<void>((resolve) => {
    if (img.complete && img.naturalHeight !== 0) {
      resolve();
    } else {
      img.onload = () => resolve();
    }
  });
}

function Bookmarks() {
  const ulRef = useRef<HTMLUListElement>();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    Promise.all(
      Array.from(ulRef.current.querySelectorAll("img")).map(whenLoaded)
    ).then(() => {
      setVisible(true);
    });
  }, []);

  function open(url: string) {
    if (window.isDesktop) {
      fetch("/chrome-launcher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
    } else {
      window.location.href = url;
    }
  }

  return (
    <FadeIn visible={visible}>
      <Panel style={{ paddingLeft: 24 }}>
        <ul ref={ulRef} className="bookmarks">
          {links.map((link, index) => (
            <Element
              hoverable
              key={index}
              component="li"
              onClick={() => open(link.url)}
            >
              <div>
                {link.name}
                <img src={link.icon} />
              </div>
            </Element>
          ))}
        </ul>
      </Panel>
    </FadeIn>
  );
}

export default Bookmarks;

import { h } from "preact";
import cx from "classnames";
import { useEffect, useRef, useState } from "preact/hooks";
import { post } from "../utils/api";
import zenity from "../utils/zenity";
import AutoFadeIn from "../base/AutoFadeIn";
import Icon from "../base/Icon";
import "./styles.css";

function Tweet() {
  const inputRef = useRef<HTMLSpanElement>();
  const [focused, setFocused] = useState(false);

  function tweet(text: string) {
    return post("/ifttt/tweet", { value1: text });
  }

  useEffect(() => {
    if (focused) {
      if (window.isDesktop) {
        setFocused(false);

        zenity(
          "--text-info",
          "--editable",
          "--width=450",
          "--height=150",
          "--title=Novo tweet"
        ).then((result) => {
          if (result) {
            tweet(result);
          }
        });
      } else {
        inputRef.current.contentEditable = "true";
        inputRef.current.focus();
      }
    } else {
      inputRef.current.contentEditable = "false";
      inputRef.current.innerHTML = "";
    }
  }, [focused]);

  return (
    <AutoFadeIn
      className={cx("tweet", focused && "tweet--focused")}
      onClick={() => setFocused(true)}
    >
      <Icon name="twitter" size="sm" className="tweet__icon" />
      <span
        className="tweet__input"
        ref={inputRef}
        onBlur={() => setFocused(false)}
        onKeyUp={(e) => {
          if (e.keyCode === 13 && e.ctrlKey && e.currentTarget.textContent) {
            tweet(e.currentTarget.textContent);
            e.currentTarget.blur();
          }
        }}
      />
    </AutoFadeIn>
  );
}

export default Tweet;

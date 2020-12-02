import { h, ComponentChildren } from "preact";
import { useMemo } from "preact/hooks";
import usePooling from "../utils/usePooling";
import ProgressBar from "../base/ProgressBar";
import Checkbox from "../base/Checkbox";
import ListItem from "../base/ListItem";
import Text from "../base/Text";
import Icon from "../base/Icon";
import Spacer from "../base/Spacer";
import Button from "../base/Button";
import { DAY, timeAgo } from "../utils/date";

function FadeIn({
  visible,
  style,
  ...props
}: {
  visible: boolean;
  style?: h.JSX.CSSProperties;
} & Omit<h.JSX.HTMLAttributes<HTMLDivElement>, "style" | "visible">) {
  return (
    <div
      {...props}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transition: "opacity 200ms cubic-bezier(0.17, 0.67, 0.83, 0.67)",
      }}
    />
  );
}

export default FadeIn;

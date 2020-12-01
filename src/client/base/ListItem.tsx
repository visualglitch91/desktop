import { h, ComponentProps } from "preact";
import cx from "classnames";
import Element from "./Element";
import "./ListItem.css";

function ListItem({
  className,
  extraMargin,
  ...props
}: { extraMargin?: boolean } & ComponentProps<typeof Element>) {
  return (
    <Element
      {...props}
      className={cx(
        className,
        "list-item",
        extraMargin && "list-item--extra-margin"
      )}
    />
  );
}

export default ListItem;

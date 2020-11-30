import { h } from "preact";

function Icon({ name, className, ...props }) {
  return <span {...props} class={`mdi mdi-${name} ${className || ""}`} />;
}

export default Icon;

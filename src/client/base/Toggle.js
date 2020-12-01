import { h } from "preact";
import Icon from "./Icon";

function Toggle({ checked, onChange, ...props }) {
  return (
    <Icon
      {...props}
      name={checked ? "toggle-switch" : "toggle-switch-off-outline"}
      onClick={() => onChange(!checked)}
    />
  );
}

export default Toggle;

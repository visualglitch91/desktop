import { h } from "preact";
import Icon from "./Icon";

function Checkbox({ checked, onChange, ...props }) {
  return (
    <Icon
      {...props}
      name={checked ? "checkbox-marked-outline" : "checkbox-blank-outline"}
      onClick={() => onChange(!checked)}
    />
  );
}

export default Checkbox;

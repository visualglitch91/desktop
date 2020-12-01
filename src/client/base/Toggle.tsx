import { h, ComponentProps } from "preact";
import Icon from "./Icon";

function Toggle({
  checked,
  onChange,
  ...props
}: {
  checked: boolean;
  onChange?: (checked: boolean) => void;
} & ComponentProps<typeof Icon>) {
  return (
    <Icon
      {...props}
      name={checked ? "toggle-switch" : "toggle-switch-off-outline"}
      onClick={onChange && (() => onChange(!checked))}
    />
  );
}

export default Toggle;

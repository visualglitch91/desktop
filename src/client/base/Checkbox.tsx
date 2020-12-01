import { h, ComponentProps } from "preact";
import Icon from "./Icon";

function Checkbox({
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
      name={checked ? "checkbox-marked-outline" : "checkbox-blank-outline"}
      onClick={onChange && (() => onChange(!checked))}
    />
  );
}

export default Checkbox;

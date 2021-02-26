import { ComponentProps, h } from "preact";
import { useEffect, useState } from "preact/hooks";
import FadeIn from "../base/FadeIn";

function AutoFadeIn(props: Omit<ComponentProps<typeof FadeIn>, "visible">) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return <FadeIn {...props} visible={visible} />;
}

export default AutoFadeIn;

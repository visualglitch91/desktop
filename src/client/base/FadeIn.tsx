import { h } from "preact";

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

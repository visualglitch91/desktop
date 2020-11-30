import { h } from "preact";

const SIZE = 30;

function ReloadButton() {
  return (
    <div
      style={{ width: SIZE, height: SIZE }}
      onClick={() => {
        window.location.reload();
      }}
    />
  );
}

export default ReloadButton;

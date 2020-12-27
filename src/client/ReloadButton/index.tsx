import { h } from "preact";

const SIZE = 30;

const style = {
  postion: "absolute",
  top: 0,
  left: 0,
  width: SIZE,
  height: SIZE,
};

const refresh = () => {
  window.location.reload();
};

function ReloadButton() {
  return <div style={style} onClick={refresh} />;
}

export default ReloadButton;

import { post } from "./api";

function zenity(...args: string[]): Promise<string> {
  return post("/zenity", args).then((json) => {
    return json?.result || "";
  });
}

export default zenity;

import { useRef, useState, useEffect, useCallback } from "preact/hooks";
import { get } from "./api";

function usePooling<T>(
  api: string,
  interval: number,
  parser: (json: any) => T = (f) => f
): [T | undefined, typeof refresh, typeof setData] {
  const propsRef = useRef({ api, interval, parser });
  const refreshTimeout = useRef<number>();
  const [data, setData] = useState<T | undefined>(undefined);

  const refresh = useCallback(function refresh() {
    window.clearTimeout(refreshTimeout.current);

    get(propsRef.current.api)
      .then((json: any) => propsRef.current.parser(json))
      .then((data) => {
        setData(data);

        refreshTimeout.current = window.setTimeout(
          refresh,
          propsRef.current.interval
        );
      });
  }, []);

  useEffect(() => {
    propsRef.current = { api, interval, parser };
  }, [api, interval, parser]);

  useEffect(() => {
    refresh();

    return () => {
      window.clearTimeout(refreshTimeout.current);
    };
  }, [refresh]);

  return [data, refresh, setData];
}

export default usePooling;

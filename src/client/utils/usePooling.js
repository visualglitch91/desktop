import { useRef, useState, useEffect, useCallback } from "preact/hooks";

function usePooling(api, interval, parser = (f) => f) {
  const propsRef = useRef({ api, interval, parser });
  const refreshTimeout = useRef();
  const [data, setData] = useState();

  const refresh = useCallback(function refresh() {
    clearTimeout(refreshTimeout.current);

    fetch(propsRef.current.api)
      .then((res) => res.json())
      .then((json) => propsRef.current.parser(json))
      .then((data) => {
        setData(data);
        refreshTimeout.current = setTimeout(refresh, propsRef.current.interval);
      });
  }, []);

  useEffect(() => {
    propsRef.current = { api, interval, parser };
  }, [api, interval, parser]);

  useEffect(() => {
    refresh();

    return () => {
      clearTimeout(refreshTimeout.current);
    };
  }, [refresh]);

  return [data, refresh, setData];
}

export default usePooling;

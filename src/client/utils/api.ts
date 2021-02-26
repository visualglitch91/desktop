function request(path: string, method: "GET" | "POST", body?: any) {
  return fetch(path, {
    method,
    headers: { "content-type": "application/json" },
    body: body && JSON.stringify(body),
  }).then((res) => res.json());
}

export function get(path: string) {
  return request(path, "GET");
}

export function post(path: string, body?: any) {
  return request(path, "POST", body);
}

function request(path: string, method: "GET" | "POST", body?: any) {
  return fetch(path, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: body && JSON.stringify(body),
  }).then((res) => res.json());
}

export function get(path: string) {
  return request(path, "GET");
}

export function post(path: string, body?: any) {
  return request(path, "POST", body);
}

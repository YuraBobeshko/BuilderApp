export function get<Type>(url: string): Type | null {
  return JSON.parse(localStorage.getItem(url) as string);
}

export function post<Type>(url: string, data: Type) {
  return localStorage.setItem(url, JSON.stringify(data));
}

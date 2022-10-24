import {ID} from "../types";

export async function get<Type>(url: string): Promise<Type> {
  return JSON.parse(localStorage.getItem(url) as string);
}

export async function post<Type>(url: string, data: Type): Promise<Type> {
  await localStorage.setItem(url, JSON.stringify(data));
  return data;
}

export async function put<Type>(url: string, data: Type): Promise<Type[]> {
  // fix it
 const res = await JSON.parse(localStorage.getItem(url) || '[]')
  // @ts-ignore
  const arr = [...res.filter((item: Type) => data?.id !== item?.id), data]
  await localStorage.setItem(url, JSON.stringify(arr));
  return arr;
}

export async function deleteApi<Type>(url: string, id: ID): Promise<Type[]> {
    const res = await JSON.parse(localStorage.getItem(url) || '')
    // @ts-ignore
    const arr = [...res.filter((item: Type) => id !== item?.id)]
    await localStorage.setItem(url, JSON.stringify(arr));
    return arr;
}


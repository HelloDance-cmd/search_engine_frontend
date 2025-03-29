import { BASE_URL } from "./enhanceFetch";

export function loginValidate(userName: string, password: string): Promise<{ message: string }> {
  return fetch(new URL('/user/login/', BASE_URL), {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: userName,
      password
    })
  }).then(response => response.json())
    .catch(console.log)
}

export function isExpire(): boolean {
  return true;
}
export function registerValidate(userName: string, password: string, email: string | undefined): Promise<{ message: string }> {
  return fetch(new URL('/user/register/', BASE_URL), {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: userName,
      password,
      email: email
    }),
  }).then(response => response.json())
    .catch(console.log)
}
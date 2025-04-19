import { LocalStorageHelper } from "../storage/localStorageHelper";
import { requestInstance } from "./Request";
import type { ResponseType } from "./Request";


export function loginValidate(username: string, password: string): ResponseType<{ message: string }> {
  return requestInstance.post("/user/login/", {
    username, password
  });
}

export function isExpire(): boolean {
  return true;
}

export function registerValidate(username: string, password: string, email: string | undefined): ResponseType<{ message: string }> {
  return requestInstance.post("/user/register/", {
    username, password, email
  });
}

export type UserProfile = {
  name: string,
  email: string,
  avatar: string
}

export function getUserProfile(): ResponseType<UserProfile> {
  return requestInstance.get("/user/userProfile/?username=" + LocalStorageHelper.getFromLocalStorage("username"));
}

export function changeUserName(userName: string): ResponseType<unknown> {
  const urlParams = new URLSearchParams();
  urlParams.append("username", localStorage.getItem("username") ?? "");
  urlParams.append("willChangeUsername", userName);
  return requestInstance.get("/user/changeUserName/?" + urlParams.toString());
}

export function changeUserPassword(userName: string, password: string): ResponseType<boolean> {
  return requestInstance.post('/user/changePassword/', {
    userName, password
  })
}
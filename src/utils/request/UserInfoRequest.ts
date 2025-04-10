import { requestInstance, type ResponseType } from "./Request";

export function loginValidate(username: string, password: string): ResponseType<{ message: string }> {
    return requestInstance.post('/user/login/', {
        username, password
    })
}

export function isExpire(): boolean {
    return true;
}

export function registerValidate(username: string, password: string, email: string | undefined): ResponseType<{ message: string }> {
    return requestInstance.post('/user/register/', {
        username, password, email
    })
}
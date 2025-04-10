
import axios, { AxiosResponse } from 'axios'

const requestInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    headers: {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "*"
    }
})

type ResponseType<T> = Promise<AxiosResponse<T>>

export {
    requestInstance,
    type ResponseType
}
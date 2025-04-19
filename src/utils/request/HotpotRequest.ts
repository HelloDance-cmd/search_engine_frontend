import { requestInstance, type ResponseType } from "./Request";


export type Hotpot =  {
    address: string,
    title: string,
    category: string
}

export function fetchHotspot(): ResponseType<Hotpot[]> {
    return requestInstance.get('/search/hotpots_view/')
}
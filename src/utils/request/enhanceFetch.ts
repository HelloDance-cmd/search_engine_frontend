export const BASE_URL: string = "http://127.0.0.1:8000";

/**
 * 强化fetch函数使所有的返回值统一为json格式，不需要进行两次 then
 * @param address 接口访问路径
 * @returns
 */
function enhancedFetch<T = any>(address: string, username?: string): Promise<T> {
  return fetch(BASE_URL.concat(address), {
    // @ts-ignore
    headers: {
      "username": username || ""
    }
  })
    .then((response) => response.json())
    .catch(console.log);
}

export default enhancedFetch;

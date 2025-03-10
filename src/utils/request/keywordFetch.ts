import { SearchResult } from "../../types/SearchResult";
import enhancedFetch, { BASE_URL } from "./enhanceFetch";
import axios, { AxiosResponse } from "axios";

/**
 * 返回出现过这个关键词的相关词
 * @param keyword
 * @returns 相关词
 */
export function fetchRelateKeyword(keyword: string): Promise<string[]> {
  return enhancedFetch<string[]>("/search/relate_keywords?words=".concat(keyword));
}

/**
 * 获取所有分类
 * @returns 所有的分类
 */
export function fetchCategories(): Promise<string[]> {
  return enhancedFetch<string[]>("/search/search_tags/");
}

/**
 * 通过关键词查找相关的数据
 * @param keyword 关键词
 * @returns 所有和这个关键词相关的数据
 */
export function fetchResultsByKeyword(keyword: string, username: string): Promise<AxiosResponse<SearchResult[]>> {
  // if (!navigator.onLine) {
  //   const userinfo = useLiveQuery(async () => {
  //     const u = await db.user_cache.where('username')
  //       .equals(localStorage.getItem('username') || '')
  //       .and(user => user.accessed_title.indexOf(keyword || '') != -1)
  //       .toArray()    
  //     return u;
  //   }, [keyword]);

  //   let ans: SearchResult[] = []
  //   message.open({
  //     content: '检测到网络断线，启用离线服务',
  //     type: 'warning'
  //   })
    
  //   // window.location.reload();
  //   for (let user of userinfo) {
  //     ans.push({
  //       title: user.accessed_title,
  //       fromURL: user.accessed_url,
  //       text: '',
  //       description: '',
  //       tags: [],
  //       created_at: user.created_at
  //     })
      
  //   //@ts-ignore
  //   return Promise.resolve({data: userinfo})
  // }

  return axios.get(new URL("/search/search_word_contents?words=".concat(keyword), BASE_URL).toString(), {
    headers: {
      "username": username
    },
    timeout: 10000 // 10s
  })
  // return enhancedFetch<SearchResult[]>("/search/search_word_contents?words=".concat(keyword), username);
}

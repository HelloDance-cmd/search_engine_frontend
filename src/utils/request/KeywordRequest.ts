import axios from "axios";
import { SearchResult } from "../../types/SearchResult";
import { requestInstance, type ResponseType } from "./Request";

/**
 * 返回出现过这个关键词的相关词
 * @param keyword
 * @returns 相关词
 */
export function getRelateKeywords(keyword: string): Promise<string[]> {
    const url = "/search/relate_keywords/?words=".concat(keyword);
    return requestInstance.get(url)
      .then(response => {
        const data = response.data;
        const relatedWords = data.g.map((word: {q: string}) => word.q);
        return Promise.resolve(relatedWords)
      });
}

/**
 * 获取所有分类
 * @returns 所有的分类
 */
export function getCategories(): ResponseType<string[]> {
    const url = "/search/search_tags/";
    return requestInstance.get(url)
}

/**
 * 通过关键词查找相关的数据
 * @param keyword 关键词
 * @returns 所有和这个关键词相关的数据
 */
export function getResultsByKeyword(keyword: string, username: string): ResponseType<SearchResult[]> {
  username = 'Hello'; // 临时数据测试使用
  const url = "/search/search_word_contents/?words=".concat(keyword)
  return requestInstance.get(url, {
    headers: {
      "username": username,
    }
  })
}

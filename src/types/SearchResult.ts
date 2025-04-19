export interface SearchResult {
    title: string; // 标题
    fromURL: string; // 来自那个网页地址
    text: string; // 内容
    description: string,
    tags: string[];
    created_at: Date; // 爬取时间，创建时间,
    category: string
    total: number
  }
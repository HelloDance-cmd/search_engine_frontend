import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchResultsByKeyword } from "../utils/request";
import { type SearchResult } from "../types/SearchResult";
import { Card, Empty, message, Pagination, Space } from "antd";
import CusomAutoComplete from
 "../components/CusomAutoComplete";
import { db } from "../utils/db";
import { useLiveQuery } from "dexie-react-hooks";


function usePageUntil(page: number, prePage: number) {
  return [(page - 1) * prePage, page * prePage];
}

export default function SearchResultView() {
  const { keyword } = useParams();
  const [results, setResults] = useState<SearchResult[]>([]);
  const [page, setPage] = useState<number>(1);

  const userinfo = useLiveQuery(async () => {
    const u = await db.user_cache.where('username')
      .equals(localStorage.getItem('username') || '')
      .and(user => user.accessed_title.indexOf(keyword || '') != -1)
      .toArray()    
    return u;
  }, [keyword]);

  useEffect(() => {
    if (navigator.onLine)
      return;

    if (userinfo === undefined)
      return;


    let ans: SearchResult[] = []
    message.open({
      content: '检测到网络断线，启用离线服务',
      type: 'warning'
    })
    
    // window.location.reload();
    for (let user of userinfo) {
      ans.push({
        title: user.accessed_title,
        fromURL: user.accessed_url,
        text: '',
        description: '',
        tags: [],
        created_at: user.created_at
      })
    }
    console.log(keyword, ans);
    
    setResults(ans);
  }, [navigator.onLine, keyword])

  
  useEffect(() => {
    /**
     * 关键字是空的或者是其他
     * 或是网络状态是离线的，就不需要请求了
     */
    if (!keyword || !navigator.onLine)
        return
          
    message.open({
      content: "你的消息正在路上",
      type: 'info',
      duration: 0
    });

    fetchResultsByKeyword(keyword, localStorage.getItem('username') as string)
      .then(({ data: results }) => {
        if (results === undefined) {
          return
        }
        
        setResults(results);
        message.destroy();

        /**
         * 加载到数据库中
         */
        async function setUserMetaToDatabase() {
          console.log('appending', results);
          
          for (let result of results) {
            await db.user_cache.add({
              username: localStorage.getItem('username') as string,
              accessed_title: result.title,
              created_at: new Date(),
              accessed_url: result.fromURL
            }).catch(() => { console.error('加入失败') })
          }
        }

        setUserMetaToDatabase()
      }).finally(() =>  message.destroy());
  }, [keyword]);

  if (!keyword || !results)
    return <>
      <CusomAutoComplete className="mx-auto my-5 flex w-1/2 p-5" keywordProps="" />
      <Empty />
    </>

 

  const PER_PAGE = 4;
  const [from, to] = usePageUntil(page, PER_PAGE)

  return (
    <>
      <CusomAutoComplete className="mx-auto my-5 flex w-1/2 p-5" keywordProps={keyword}/>
      {/* 搜索结果 */}
      <Space direction="vertical" className="mx-auto my-0 flex w-1/2">
        {results.length != 0 ? (
          results
            .slice(from, to)
            .map((result, index) => (
            <Card key={index} title={result.title} extra={<a href={result.fromURL}>更多</a>}>
              <p>{result.description.concat("...")}</p>

              {/* <section className="search-result-options flex flex-row">
                {result.tags.map((tag) => (
                  <div className="bg-gray-200 rounded px-3">{tag}</div>
                ))}
              </section> */}

              {/* <section>{result.created_at.toLocaleTimeString()}</section> */}
            </Card>

          ))
        ) : (
          <Empty />
        )}
      </Space>

      {
        results.length ? 
          (
            <Pagination className="mx-auto my-0 flex w-1/2"
              current={page} total={results.length} onChange={(page) => setPage(page)} pageSize={PER_PAGE}/>
          )
        : <span></span>
      }
    </>
  );
}
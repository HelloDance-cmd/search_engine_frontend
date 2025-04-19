import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchResultsByKeyword } from "../utils/request";
import type { SearchResult } from "../types/SearchResult";
import { Card, Empty, message, Pagination, Space } from "antd";
import CustomerAutoComplete from "../components/CustomerAutoComplete";
import { db } from "../utils/db";
import { useLiveQuery } from "dexie-react-hooks";
import { LocalStorageHelper } from "../utils/storage/localStorageHelper";

export default function SearchResultView() {
    const { keyword } = useParams();
    const [results, setResults] = useState<SearchResult[]>([]);
    const [page, setPage] = useState<number>(1);
    const [pageSize, _] = useState<number>(10);
    const [totalPage, setTotalPage] = useState<number>(1)

    console.log("加载中");

    const userinfo = useLiveQuery(async () => {
        const u = await db.user_cache.where("username")
            .equals(LocalStorageHelper.getFromLocalStorage("username"))
            .and(user => user.accessed_title.indexOf(keyword || "") != -1)
            .toArray();
        return u;
    }, [keyword]);

    useEffect(() => {
        if (navigator.onLine)
            return;

        if (userinfo === undefined)
            return;


        let ans: SearchResult[] = [];
        message.open({
            content: "检测到网络断线，启用离线服务",
            type: "warning"
        });

        for (let user of userinfo) {
            ans.push({
                title: user.accessed_title,
                fromURL: user.accessed_url,
                text: "",
                description: "",
                tags: [],
                created_at: user.created_at,
                category: "",
                total: 10
            });
        }
        setResults(ans);
    }, [navigator.onLine, keyword]);

    const fetchResult = () => {
        /**
         * 关键字是空的或者是其他
         * 或是网络状态是离线的，就不需要请求了
         */
        if (!keyword || !navigator.onLine)
            return;

        message.open({
            content: "你的消息正在路上",
            type: "info",
            duration: 0
        });

        fetchResultsByKeyword(keyword, LocalStorageHelper.getFromLocalStorage("username"), page, pageSize)
            .then(({ data: results }) => {

                if (results === undefined) {
                    return;
                }

                results = results.filter(result => results.filter(r => r.title != result.title));

                setTotalPage(results[0].total)

                setResults(results);
                message.destroy();

                /**
                 * 加载到数据库中
                 */
                async function setUserMetaToDatabase() {
                    console.info("appending", results);

                    for (let result of results) {
                        await db.user_cache.add({
                            username: localStorage.getItem("username") as string,
                            accessed_title: result.title,
                            created_at: new Date(),
                            accessed_url: result.fromURL
                        }).catch(() => {
                            console.error("加入失败");
                        });
                    }
                }

                setUserMetaToDatabase();
            })
            .finally(() => message.destroy());
    };

    useEffect(fetchResult, [keyword, page]);
    

    if (!keyword || !results)
        return <>
            <CustomerAutoComplete className="mx-auto my-5 flex w-1/2 p-5" />
            <Empty />
        </>;
    
    function highlight(original: string, keyword: string) {
        if (!keyword) {
            return <span>{original}</span>;
        }
        const regex = new RegExp(keyword, 'gi');
        const parts = original.split(regex);
        const matches = original.match(regex);
    
        const result = [];
        for (let i = 0; i < parts.length; i++) {
            if (parts[i]) {
                result.push(<span key={i * 2}>{parts[i]}</span>);
            }
            if (matches && i < matches.length) {
                result.push(<span key={i * 2 + 1} className="text-red-500">{matches[i]}</span>);
            }
        }
        return <span>{result}</span>;
    }
    

    return (
        <>
            <CustomerAutoComplete className="mx-auto my-5 flex w-1/2 p-5" defaultValue={keyword} />
            {/* 搜索结果 */}
            <Space direction="vertical" className="mx-auto my-0 flex w-1/2">
                {results.length != 0 ? (
                    results.map((result, index) => (
                            <>
                                <section className="title">
                                    <a href={result.fromURL}>{highlight(result.title, keyword)}</a>
                                </section>
                                <Card key={index}>
                                <p>{result.description.concat("...")}</p>
                                <span
                                    className=" px-2 py-1 border-2 border-black rounded-md mt-4 block w-fit">{result.category}</span>
                            </Card>
                            </>

                        ))
                ) : (
                    <Empty />
                )}
            </Space>

            {
                results.length != 0 ?
                    (
                        <Pagination className="mx-auto my-0 flex w-1/2"
                                    current={page}
                                    total={totalPage}
                                    onChange={(page) => setPage(page)}
                                    pageSize={pageSize} 
                                    />
                    )
                    : <span></span>
            }
        </>
    );
}
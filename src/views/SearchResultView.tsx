import { Card, Empty, message, Pagination, Space } from "antd";
import { db, User } from "../utils/db";
import { fetchResultsByKeyword } from "../utils/request";
import { LocalStorageHelper } from "../utils/storage/localStorageHelper";
import { ReactNode, useEffect, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { useParams } from "react-router";
import CustomerAutoComplete from "../components/CustomerAutoComplete";
import type { SearchResult } from "../types/SearchResult";

/**
 * 高亮指定的字符串
 * @param original 原始字符串
 * @param keyword 需要高亮的字符串
 * @returns 高亮好的ReactNode
 */
function highlight(original: string, keyword: string) {
    if (!keyword) {
        return <span>{original}</span>;
    }
    const regex = new RegExp(keyword, 'gi');
    const parts = original.split(regex);
    const matches = original.match(regex);

    const result: ReactNode[] = [];
    parts.forEach((part, i) => {
        if (part) {
            result.push(<span key={i * 2}>{parts[i]}</span>);
        }

        if (matches && i < matches.length) {
            result.push(<span key={i * 2 + 1} className="text-red-500">{matches[i]}</span>);
        }
    });

    return <span>{result}</span>;
}

export default function SearchResultView() {
    const { keyword } = useParams();
    const [results, setResults] = useState<SearchResult[]>([]);
    const [page, setPage] = useState<number>(1);
    // const [pageSize, _] = useState<number>(10);
    // 由于不会更改PageSize所以useState不会有什么效果
    const pageSize = 10;
    const [totalPage, setTotalPage] = useState<number>(1)

    console.info("本地缓存加载中...");

    const userInfoList = useLiveQuery(async () => {
        const user = await db.user_cache.where("username")
            .equals(LocalStorageHelper.getFromLocalStorage("username"))
            .and(user => user.accessed_title.indexOf(keyword || "") != -1)
            .toArray();
        return user;
    }, [keyword]);

    useEffect(() => {
        // 这里处理一下网路断线的情况
        // 切记如果刷新的话需要走真实的网络请求页面
        // 这里不会起到任何作用
        if (navigator.onLine)
            return;

        // 本地缓存没有任何数据
        if (userInfoList === undefined)
            return;


        let results: SearchResult[] = [];
        
        message.open({
            content: "检测到网络断线，启用离线服务",
            type: "warning"
        });

        const userMapping = (user: User) => ({
            title: user.accessed_title,
            fromURL: user.accessed_url,
            text: "",
            description: "",
            tags: [],
            created_at: user.created_at,
            category: "",
            total: 10
        });
        
        userInfoList.forEach(user => {
            const mappedUser = userMapping(user);
            results.push(mappedUser);
        });

        setResults(results);
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

        console.info("正在进行第一次请求..")
        fetchResultsByKeyword(keyword, LocalStorageHelper.getFromLocalStorage("username"), page, pageSize).then(_ => {
            console.info("正在进行第二次请求..")
            // TODO: 可以記得修改一下
            // 这个地方后台貌似有问题就是需要请求两次
            // Django好像对于第一次请求速度太快数据库反应不过来
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
        }).finally(() => message.destroy());
    };

    useEffect(fetchResult, [keyword, page]);

    if (!keyword || !results)
        return <>
            <CustomerAutoComplete className="mx-auto my-5 flex w-1/2 p-5" />
            <Empty />
        </>;

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
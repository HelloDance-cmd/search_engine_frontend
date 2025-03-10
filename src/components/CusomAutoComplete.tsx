import { AutoComplete, Button, Input } from "antd";
import { useCallback, useState, ReactNode } from "react";
import { useNavigate } from "react-router";
import { fetchRelateKeyword } from "../utils/request";

interface IProps {
  className?: string; 
  children?: ReactNode, 
  keywordProps: string
  handleClick?: () => void;
}

export default function CusomAutoComplete({ className: classNameProps = "", keywordProps }: IProps) {
  const [keyword, setKeyword] = useState<string | undefined>(keywordProps);
  const [relateResultOptions, setRelateResultOptions] = useState<string[]>();
  const navigate = useNavigate();

  /**
   * 获取这个关键词相关的关键词
   */
  const fetchRelateKeywordHandler = useCallback(async () => {
    // 目前已经离线
    if (keyword === undefined || !navigator.onLine)
      return;

    // 查询相关关键字来自后台
    let result = await fetchRelateKeyword(keyword);

    if (result == undefined)
      return;

    result = [...new Set(result)]

    setRelateResultOptions(result);
  }, [keyword]);

  /**
   * 处理在输入的时候需要做什么
   */
  const typingTextHandler = useCallback((value: string) => {     
    setKeyword(value);
  
  }, [keyword]);

  return (
    <section className={`flex flex-row ${classNameProps}`}>
      <AutoComplete value={keyword} className="w-full" 
        onSearch={fetchRelateKeywordHandler} options={relateResultOptions?.map((opt) => ({ label: opt, value: opt }))}>
        <Input.Search size="large" placeholder="输入关键词以搜索..." enterButton onChange={(e) => typingTextHandler(e.target.value)}/>
      </AutoComplete>
      <Button type="primary" className="mx-2" size="large" onClick={() => {
        keyword && navigate("/search-results/" + keyword);
        // window.location.reload()
      }}>
        搜索
      </Button>
    </section>
  );
}

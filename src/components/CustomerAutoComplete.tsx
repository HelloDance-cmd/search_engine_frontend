import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { AutoComplete, Button } from "antd";
import { fetchRelateKeyword } from "../utils/request";

interface IProps {
  className?: string;
  defaultValue?: string
}

export default function CustomerAutoComplete({ className: _className = "", defaultValue = '' }: IProps) {
  const [keyword, setKeyword] = useState<string>(defaultValue);
  const [relateResultOptions, setRelateResultOptions] = useState<string[]>();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (keyword != '') {
      navigate('/search-result/' + keyword);
      // if (/^(\/search-result\/)/.test(location.pathname)) {
      //   location.reload()
      // }

    }
    else {
      navigate('/search-result/' + encodeURIComponent(defaultValue))
    }
  }

  const Timer = undefined;
  const debuceSearch = (value: string) => {
    clearTimeout(Timer);
    setTimeout(() => fetchRelateKeywordHandler(value), 300);
  }

  /**
   * 获取这个关键词相关的关键词
   */
  const fetchRelateKeywordHandler = useCallback(async (keyword: string) => {
    // 目前已经离线
    if (keyword === undefined || !navigator.onLine)
      return;

    // 查询相关关键字来自后台
    let keywordArray = await fetchRelateKeyword(keyword);

    if (keywordArray == undefined)
      return;

    setRelateResultOptions(keywordArray);
  }, [keyword]);

  return (
    <section className={`flex flex-row items-center gap-2 ${_className} `}>
      <AutoComplete
        value={keyword}
        placeholder={defaultValue}
        className="w-full h-10"
        onChange={(value) => {
          debuceSearch(value);
          setKeyword(value);
        }}

        options={relateResultOptions?.map((opt) => ({ label: opt, value: opt }))}
      />
      <Button type="primary" onClick={handleSearch}>搜索</Button>
    </section>
  );
}

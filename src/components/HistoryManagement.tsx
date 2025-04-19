import { useLiveQuery } from "dexie-react-hooks";
import { db, User } from "../utils/db"
import { Table, TableProps } from "antd";

type HistoryUserAccess = Pick<User, 'accessed_title' | 'accessed_url'>;

/**
 * 这个Management意味着是代码层面数据的管理
 * 而不是让用户对访问过的数据进行修改
 * 管理用户历史数据的信息
 */
function HistoryManagement() {
  const userInfoList = useLiveQuery(() => db.user_cache.toArray());
  const columns: TableProps<HistoryUserAccess>['columns'] = [
    { title: '标题', dataIndex: 'accessed_title', key: '标题' },
    // { title: '访问时间', dataIndex: 'created_at', key: '访问时间' },
    { title: '地址', dataIndex: 'accessed_url', key: '地址' },
  ];
  const data: HistoryUserAccess[] = userInfoList?.map((userInfo, index) => ({
    'key': index,
    'accessed_title': userInfo.accessed_title.substring(0, 30).concat('...'),
    'accessed_url': userInfo.accessed_url,
    // 'created_at': new Date()
  })) as HistoryUserAccess[];

  return (
    <Table<HistoryUserAccess> columns={columns} dataSource={data} className=" w-[70vw]" />
  );
}

export default HistoryManagement;
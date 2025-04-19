import { Button, Input, message, Popconfirm } from "antd";
import { useCallback, useState } from "react";
import { changeUserPassword } from "../utils/request/UserInfoRequest";
import { LocalStorageHelper } from "../utils/storage/localStorageHelper";
import { useNavigate } from "react-router";

function PasswordManagement() {
  const [password, setPassword] = useState<string>('');
  const nav = useNavigate()

  const modifyPassword = useCallback(function () {
    if (!password) {
      return;
    }

    const username = LocalStorageHelper.getFromLocalStorage('username')
    changeUserPassword(username, password).then(response => {
      const isModify = response.data;
      if (isModify) {
        message.open({
          content: '修改成功',
          type: 'info'
        })
        nav("/login")
      } else {
        message.open({
          content: '修改失败',
          type: 'error'
        })
      }
    });
  }, [password])

  return (
    <section className="flex flex-col gap-3">
      <h2>你好 {LocalStorageHelper.getFromLocalStorage("username")}</h2>
      <Input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <Popconfirm
        title="修改密码"
        description="确认修改密码吗？这个行为是不可逆的"
        onConfirm={modifyPassword}
        okText="是的"
        cancelText="不是"
      >
        <Button type="primary" danger>修改密码</Button>
      </Popconfirm>
    </section>

  );
}

export default PasswordManagement;
import { Button, Input, message } from "antd";
import { useState } from "react";
import { loginValidate } from "../../utils/request/UserInfoRequest";
import { Link, useNavigate } from "react-router";
import "./LoginView.css"; // 引入样式文件

export default function LoginView() {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const navgation = useNavigate()

  function handleSubmit() {
    if (!username || !password) {
      message.error("用户名和密码不能为空");
      return;
    }
    
    loginValidate(username as string, password as string)
      .then(response => {
        const data = response.data;
        if (data.message === "True") {
          localStorage.setItem('username', username);
          navgation("/search");
          window.location.reload()
        } else {
          message.error("用户名或密码不正确");
        }
      })
      .catch(error => {
        message.error("登录失败，请稍后再试");
        console.error("Login failed:", error);
      });
  }

  return (
    <div className="p-10 login-container">
      <div className="login-form">
        <h1 className=" font-bold">用户登录</h1>
        <Input
          placeholder="用户名"
          onChange={e => setUsername(e.target.value)}
          value={username}
        />
        <Input
          placeholder="密码"
          type="password"
          onChange={e => setPassword(e.target.value)}
          value={password}
        />
        <Button onClick={handleSubmit} type="primary">登录</Button>

        <section>
          没有账号？点击<Link to="/register">注册</Link>
        </section>
      </div>
    </div>


  );
}
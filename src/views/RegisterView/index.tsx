import { Button, Input, message } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { registerValidate } from "../../utils/request/userInfomationFetch";
import "./RegisterView.css"; // 假设你有一个类似的样式文件

export default function RegisterView() {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [email, setEmail] = useState<string | undefined>()
  const navigate = useNavigate();

  function handleSubmit() {
    // 检查用户名和密码是否为空
    if (!username || !password || !confirmPassword) {
      message.open({
        content: '两次输入的密码不一致',
        type: 'error'
      });
      return;
    }

    // 检查密码是否一致
    if (password !== confirmPassword) {
      message.open({
        content: '两次输入的密码不一致',
        type: 'error'
      });
      return;
    }

    // 调用注册函数
    registerValidate(username as string, password as string, email)
      .then(response => {
        if (response.message === "True") {
          message.open({
            content: '注册成功，请登录',
            type: 'success'
          });
          navigate("/"); // 注册成功后跳转到登录页面
        } else {
          message.open({
            content: '注册失败，请稍后再试'.concat(response.message),
            type: 'error'
          });
        }
      })
      .catch(error => {
        message.open({
          content: '注册失败，请稍后再试'.concat(error.message),
          type: 'error'
        });
        console.error("Registration failed:", error);
      });
  }

  return (
    <div className="register-container">
      <div className="register-form">
        <h1>用户注册</h1>
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
          required
        />
        <Input
          placeholder="确认密码"
          type="password"
          onChange={e => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          required
        />
        <Input
          placeholder="邮箱"
          type="email"
          onChange={e => setEmail(e.target.value)}
          value={email}
        />

        <Button onClick={handleSubmit}>注册</Button>

        <section>
          已有账号？点击<Link to="/login">登录</Link>
        </section>
      </div>
    </div>
  );
}
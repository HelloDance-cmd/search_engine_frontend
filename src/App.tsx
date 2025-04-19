import { BrowserRouter, Link, Route, Routes, useNavigate } from "react-router";
import HomeView from "./views/HomeView";
import UserProfileView from "./views/UserProfileView";
import SearchResultView from "./views/SearchResultView";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import { Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import AccountManagement from "./components/AccountManagement";
import AvatarManagement from "./components/AvatarManagement";
import PasswordManagement from "./components/PasswordManagement";
import HistoryManagement from "./components/HistoryManagement";
import { LocalStorageHelper } from "./utils/storage/localStorageHelper";

function NotLoggedIn() {
  return <Button type="primary">
    <Link to="/login">登录</Link>
  </Button>;
}

function LoggedIn({ username }: { username: string }) {
  const nav = useNavigate()
  function logoutHandler() {
    LocalStorageHelper.removeLocalStorage("username")
    nav('/login');
  }
  return <section className="flex flex-row gap-2 items-center">
    <section>欢迎你 {username}</section>
    <Button type="primary" onClick={logoutHandler}>
      <Link to="/login">退出</Link>
    </Button>
  </section>;
}


export default function App() {
  const username = LocalStorageHelper.getFromLocalStorage("username");

  return (
    <div>
      <BrowserRouter>
        {/* 导航栏：设置用户的登录状态... */}
        <nav className="flex h-6 w-full flex-row items-center justify-end px-12 py-7">
          <section className="w-full font-bold">
            <Link to="/search">Sou 搜搜搜</Link>
          </section>
          <section className="group/avatar relative flex flex-row w-full justify-end">
            <section className="pr-3 text-sm">{username ? <LoggedIn username={username} /> : <NotLoggedIn />}</section>
            <Link to="/user-profile/account">
              <Avatar size="large" icon={<UserOutlined />} />
            </Link>
          </section>
        </nav>

        <Routes>
          <Route path="/search" element={<HomeView />} />
          <Route path="/user-profile" element={<UserProfileView />}>
            <Route path="account" element={<AccountManagement />} />
            <Route path="avatar" element={<AvatarManagement />} />
            <Route path="password" element={<PasswordManagement/>} />
            <Route path="histories" element={<HistoryManagement />} />
          </Route>
          <Route path="/search-result/:keyword" element={<SearchResultView />} />
          <Route path="/" element={<LoginView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/register" element={<RegisterView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

import { BrowserRouter, Link, Route, Routes } from "react-router";
import HomeView from "./views/HomeView";
import UserProfileView from "./views/UserProfileView";
import SearchResultView from "./views/SearchResultView";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default function App() {
    return (
        <div>
            <BrowserRouter>
                {/* 导航栏：设置用户的登录状态... */}
                <nav className="flex h-6 w-full flex-row items-center justify-end px-12 py-7">
                    <section className="group/avatar relative">
                        <span className="px-10">{localStorage.getItem('username') || '未登录'}</span>
                        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                        <div className=" bg-white scale-0 absolute bottom-[-30px] right-[-10px] w-[100px] text-center border-2 rounded-md group-hover/avatar:scale-100 transition-all duration-100 origin-top-right">
                            <div className="hover:bg-gray-100 px-3 cursor-pointer">
                                <Link to="/" target="_blank" onClick={() => {
                                localStorage.removeItem('username')
                            }}>退出</Link>
                            </div>
                        </div>
                    </section>
                </nav>
                <Routes>
                    <Route path="/search" element={<HomeView />} />
                    <Route path="/user-setting" element={<UserProfileView />} />
                    <Route path="/search-results/:keyword" element={<SearchResultView />} />
                    <Route path="/" element={<LoginView />} />
                    <Route path="/register" element={<RegisterView />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

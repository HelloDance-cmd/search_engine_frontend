import { ArrowLeftOutlined } from "@ant-design/icons";
import { Avatar, Empty, List } from "antd";
import { Link, Outlet } from "react-router";
import * as React from "react";

function BackHistoryArrow(props: React.PropsWithoutRef<any>) {
  return <nav className="w-full h-10 flex justify-start items-center px-10" {...props}>
    <section className="group/arrow cursor-pointer">
      <ArrowLeftOutlined className="group-hover/arrow:translate-x-[-5px] transition-transform duration-100" />
      <span className="group-hover/arrow:underline">
          <span onClick={() => history.back()}>&nbsp; {props.showText}</span>
        </span>
    </section>
  </nav>;
}

export default function UserProfileView() {
  // TODO 解开注释
  // if (localStorage.getItem("username") === null) {
  //   return <section className="flex flex-col items-center justify-center gap-2">
  //     <Empty description="你可能还未登陆"/>
  //     <BackHistoryArrow className="w-fit" showText="点击此返回" />
  //   </section>;
  // }

  return <>
    <BackHistoryArrow showText="回到上一级" />

    <section className="flex flex-row mt-4 p-10 gap-2">
      <section className="w-[30vw] flex flex-col justify-center items-center self-start">
        <section className="w-fit">
          <Avatar size="large"/>
        </section>

        <section className="mt-4 w-full">
          <List>
            <List.Item className="hover:bg-gray-50 cursor-pointer">
              <Link to="account" className="px-2">账号管理</Link>
            </List.Item>
            {/* <List.Item className="hover:bg-gray-50 cursor-pointer">
              <Link to="avatar" className="px-2">头像管理</Link>
            </List.Item> */}
            <List.Item className="hover:bg-gray-50 cursor-pointer">
              <Link to="password" className="px-2">密码管理</Link>
            </List.Item>
            <List.Item className="hover:bg-gray-50 cursor-pointer">
              <Link to="histories" className="px-2">查看我的记录</Link>
            </List.Item>
          </List>
        </section>
      </section>
      <section className="w-full">
        <Outlet />
      </section>
    </section>

  </>;
}
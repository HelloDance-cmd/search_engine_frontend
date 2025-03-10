import { Fragment } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AntdThemeConfig from "./antd-theme-config/ThemeConfig.ts";
import '@ant-design/v5-patch-for-react-19';
import { ConfigProvider, unstableSetRender } from 'antd';
import App from "./App.tsx";


unstableSetRender((node, container) => {
  // @ts-ignore
  container._reactRoot ||= createRoot(container);
  // @ts-ignore
  const root = container._reactRoot;
  root.render(node);
  return async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    root.unmount();
  };
});


createRoot(document.getElementById("root")!).render(
  <Fragment>
    <ConfigProvider theme={AntdThemeConfig}>
       <App/>
    </ConfigProvider>
  </Fragment>,
);

import { Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
import { HeaderComponent } from "./components/Layout/Header";
import { UserRoleProvider } from "./contexts/userRoleContext";
import { ModalProvider } from "./contexts/modalContext";

const { Content, Footer } = Layout;

export const MainLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <UserRoleProvider>
      <Layout>
        <HeaderComponent />
        <Content style={{ padding: "48px" }}>
          <ModalProvider>
            <div
              style={{
                background: colorBgContainer,
                minHeight: 280,
                padding: 24,
                borderRadius: borderRadiusLG,
              }}
            >
              <Outlet />
            </div>
          </ModalProvider>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          WISEBIRDS ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </UserRoleProvider>
  );
};

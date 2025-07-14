import { Outlet, Link, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  TeamOutlined,
  DashboardOutlined,
  SettingOutlined,
  BranchesOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

const menuItems = [
  {
    key: "courses",
    icon: <DashboardOutlined />,
    label: <Link to="/admin/courses">Courses</Link>,
  },
  {
    key: "groups",
    icon: <TeamOutlined />,
    label: <Link to="/admin/groups">Groups</Link>,
  },
  {
    key: "branches",
    icon: <BranchesOutlined />,
    label: <Link to="/admin/branches">Branches</Link>,
  },
  {
    key: "settings",
    icon: <SettingOutlined />,
    label: <Link to="/admin/settings">Sozlamalar</Link>,
  },
];

const Admin = () => {
  const location = useLocation();
  const selectedKey = menuItems.find((item) =>
    location.pathname.includes(item.key)
  )?.key;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div
          className="logo"
          style={{
            color: "#fff",
            textAlign: "center",
            margin: "16px 0",
            fontWeight: "bold",
          }}
        >
          ERP Admin
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKey ? [selectedKey] : []}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: 0,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Admin Panel
        </Header>
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Admin;

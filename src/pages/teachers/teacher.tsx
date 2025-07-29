import {
	LogoutOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { removeItem } from "@helpers";
import { Button, Dropdown, Layout, Menu, Modal, theme } from "antd";
import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import sidebarRoutes, {
	sidebarRoutesForTeacher,
} from "../../routes/sidebar-routes";

const { Header, Sider, Content } = Layout;

const TeacherLayout = () => {
	const [collapsed, setCollapsed] = useState(false);
	const location = useLocation();
	const [selectedKey, setSelectedKey] = useState("");
	useEffect(() => {
		const currentRouteIndex = sidebarRoutes.findIndex(
			(route) => route.path === location.pathname
		);
		if (currentRouteIndex !== -1) {
			setSelectedKey(currentRouteIndex.toString());
		}
	}, [location.pathname]);

	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();
	const navigate = useNavigate();

	const handleLogout = () => {
		Modal.confirm({
			title: "Do you want to logout?",
			icon: <LogoutOutlined />,
			content: "Your session will be closed.",
			onOk() {
				removeItem("access_token");
				removeItem("role");
				navigate("/");
			},
			okButtonProps: {
				style: {
					backgroundColor: "#d55200",
					borderColor: "#ff4d4f",
				},
			},
			okText: "Confirm",
		});
	};

	const menu = {
		items: [
			{
				key: "profile",
				icon: <UserOutlined />,
				label: <span onClick={() => navigate("/teacher/me")}>Profile</span>,
			},
			{
				key: "logout",
				icon: <LogoutOutlined />,
				danger: true,
				label: <span onClick={handleLogout}>Logout</span>,
			},
		],
	};

	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Sider
				trigger={null}
				collapsible
				collapsed={collapsed}
				style={{
					minHeight: "100vh",
					width: "400px",
					overflow: "auto",
					position: "fixed",
					left: 0,
					top: 0,
					bottom: 0,
				}}
			>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: collapsed ? "center" : "space-around",
						padding: collapsed ? "16px 8px" : "20px",
						marginBottom: "16px",
					}}
				>
					{collapsed && (
						<p style={{ fontSize: "24px", fontWeight: "bold", color: "white" }}>
							CRM
						</p>
					)}
					{!collapsed && (
						<p style={{ fontSize: "24px", fontWeight: "bold", color: "white" }}>
							CRM Teacher
						</p>
					)}
				</div>
				<Menu
					theme="dark"
					mode="inline"
					selectedKeys={[selectedKey]}
					items={sidebarRoutesForTeacher.map((item, index) => ({
						key: index.toString(),
						icon: <item.icon />,
						label: <NavLink to={item.path}>{item.title}</NavLink>,
					}))}
				/>
			</Sider>
			<Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
				<Header
					style={{
						padding: 0,
						background: colorBgContainer,
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Button
						type="text"
						icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
						onClick={() => setCollapsed(!collapsed)}
						style={{
							fontSize: "16px",
							width: 63,
							height: 64,
						}}
					/>
					<Dropdown menu={menu} placement="bottom">
						<Button
							type="text"
							size="large"
							icon={<UserOutlined />}
							style={{ marginRight: 24 }}
						/>
					</Dropdown>
				</Header>
				<Content
					style={{
						margin: "24px 0px",
						padding: 20,
						minHeight: 280,
						background: colorBgContainer,
						borderRadius: borderRadiusLG,
					}}
				>
					<Outlet />
				</Content>
			</Layout>
		</Layout>
	);
};

export default TeacherLayout;

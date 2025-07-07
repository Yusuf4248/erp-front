import {
	DashboardOutlined,
	LogoutOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	MoonOutlined,
	SunOutlined,
	TeamOutlined,
	UserOutlined,
} from "@ant-design/icons";
import {
	Avatar,
	Button,
	Divider,
	Dropdown,
	Layout,
	Menu,
	Space,
	Switch,
	theme,
	Typography,
} from "antd";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { removeItem } from "../../helpers";

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

const AdminLayout: React.FC = () => {
	const [collapsed, setCollapsed] = useState(false);
	const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");
	const navigate = useNavigate();

	const {
		token: {
			colorBgContainer,
			borderRadiusLG,
			colorTextBase,
			colorPrimary,
			colorBorder,
		},
	} = theme.useToken();

	const themeConfig = {
		algorithm:
			currentTheme === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
	};

	const menuItems = [
		{
			key: "/dashboard",
			icon: <DashboardOutlined />,
			label: "Dashboard",
			onClick: () => navigate("/admin"),
		},
		{
			key: "/groups",
			icon: <TeamOutlined />,
			label: "Groups",
			onClick: () => navigate("/admin/groups"),
		},
	];

	const userMenu = (
		<Menu theme={currentTheme}>
			<Menu.Item key="profile">Profile</Menu.Item>
			<Menu.Item key="logout" icon={<LogoutOutlined />}>
				Logout
			</Menu.Item>
		</Menu>
	);

	const toggleTheme = () => {
		setCurrentTheme(currentTheme === "light" ? "dark" : "light");
	};

	return (
		<Layout
			style={{
				minHeight: "100vh",
				background: currentTheme === "dark" ? "#000" : "#f0f2f5",
			}}
		>
			<Sider
				trigger={null}
				collapsible
				collapsed={collapsed}
				width={250}
				style={{
					overflow: "auto",
					height: "100vh",
					position: "fixed",
					left: 0,
					top: 0,
					bottom: 0,
					background: currentTheme === "dark" ? "#1f1f1f" : colorBgContainer,
					boxShadow: "2px 0 8px 0 rgba(29, 35, 41, 0.05)",
				}}
				theme={currentTheme}
			>
				<div
					style={{
						height: 64,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						borderBottom: `1px solid ${
							currentTheme === "dark" ? "#303030" : colorBorder
						}`,
					}}
				>
					<Title
						level={4}
						style={{
							color: currentTheme === "dark" ? "#fff" : colorPrimary,
							margin: 0,
							whiteSpace: "nowrap",
							overflow: "hidden",
							textOverflow: "ellipsis",
							maxWidth: collapsed ? 0 : "100%",
							transition: "max-width 0.2s",
						}}
					>
						Admin Page
					</Title>
				</div>

				<Menu
					theme={currentTheme}
					mode="inline"
					defaultSelectedKeys={["/dashboard"]}
					items={menuItems}
					style={{
						borderRight: 0,
						background: "transparent",
					}}
				/>
			</Sider>

			<Layout
				style={{
					marginLeft: collapsed ? 80 : 250,
					transition: "margin 0.2s",
					background: "transparent",
				}}
			>
				<Header
					style={{
						padding: "0 24px",
						background: currentTheme === "dark" ? "#1f1f1f" : colorBgContainer,
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						boxShadow: "0 1px 4px rgba(0, 21, 41, 0.08)",
						borderBottom: `1px solid ${
							currentTheme === "dark" ? "#303030" : colorBorder
						}`,
						position: "sticky",
						top: 0,
						zIndex: 1,
					}}
				>
					<Button
						type="text"
						icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
						onClick={() => setCollapsed(!collapsed)}
						style={{
							fontSize: "16px",
							width: 64,
							height: 64,
							color: currentTheme === "dark" ? "#fff" : "inherit",
						}}
					/>

					<Space size="middle" align="center">
						<Switch
							checkedChildren={
								<MoonOutlined
									style={{
										color: currentTheme === "dark" ? "#fff" : "inherit",
									}}
								/>
							}
							unCheckedChildren={
								<SunOutlined
									style={{
										color: currentTheme === "light" ? "#000" : "inherit",
									}}
								/>
							}
							checked={currentTheme === "dark"}
							onChange={toggleTheme}
						/>
						<Divider
							type="vertical"
							style={{
								background: currentTheme === "dark" ? "#303030" : colorBorder,
							}}
						/>

						<Dropdown
							overlay={userMenu}
							placement="bottomRight"
							trigger={["click"]}
						>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									gap: 8,
									cursor: "pointer",
									color: currentTheme === "dark" ? "#fff" : "inherit",
								}}
							>
								<Avatar
									icon={<UserOutlined />}
									style={{
										backgroundColor:
											currentTheme === "dark" ? "#1890ff" : colorPrimary,
									}}
								/>
								{!collapsed && (
									<Text strong style={{ color: "inherit" }}></Text>
								)}
							</div>
						</Dropdown>
						<Button
							onClick={() => {
								removeItem("access_token");
								navigate("/");
							}}
							style={{ border: "0", borderRadius: "50%" }}
							size="large"
						>
							<LogoutOutlined />
						</Button>
					</Space>
				</Header>

				<Content
					style={{
						margin: "24px 16px",
						padding: 24,
						minHeight: "calc(100vh - 112px)",
						background: currentTheme === "dark" ? "#1f1f1f" : colorBgContainer,
						borderRadius: borderRadiusLG,
						color:
							currentTheme === "dark" ? "rgba(255, 255, 255, 0.85)" : "inherit",
						border: `1px solid ${
							currentTheme === "dark" ? "#303030" : colorBorder
						}`,
					}}
				>
					<Outlet />
				</Content>
			</Layout>
		</Layout>
	);
};

export default AdminLayout;

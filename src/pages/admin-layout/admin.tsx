import {
	BellOutlined,
	DashboardOutlined,
	LogoutOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	MoonOutlined,
	SettingOutlined,
	SunOutlined,
	TeamOutlined,
	UserOutlined,
} from "@ant-design/icons";
import {
	Avatar,
	Badge,
	Button,
	Dropdown,
	Input,
	Layout,
	Menu,
	Space,
	Switch,
} from "antd";
import React, { useState } from "react";
import { FaCodeBranch } from "react-icons/fa";
import { MdCastForEducation } from "react-icons/md";
import { Outlet, useNavigate } from "react-router-dom";
import { ApiUrls } from "../../api/api-urls";
import { removeItem, setItem } from "../../helpers";
const { Header, Sider, Content } = Layout;
const { Search } = Input;

const AdminLayout: React.FC = () => {
	const [collapsed, setCollapsed] = useState(false);
	const [darkMode, setDarkMode] = useState(false);
	const navigate = useNavigate();
	const userMenuItems = [
		{
			key: "profile",
			icon: <UserOutlined />,
			label: "Profile",
		},
		{
			key: "settings",
			icon: <SettingOutlined />,
			label: "Settings",
		},
		{
			type: "divider" as const,
		},
		{
			key: "logout",
			icon: <LogoutOutlined />,
			label: "Logout",
			danger: true,
			onClick: async () => {
				// const res = await logoutService.signOut("admin");
				// console.log(res)
				// if (res?.status === 200) {
				removeItem("access_token");
				removeItem("role");
				navigate("/");
				// }
			},
		},
	];

	const sidebarItems = [
		{
			key: "dashboard",
			icon: <DashboardOutlined />,
			label: "Dashboard",
			onClick: () => navigate("/admin/dashboard"),
		},
		{
			key: "students",
			icon: <UserOutlined />,
			label: "Students",
			onClick: () => navigate("/admin/students"),
		},
		{
			key: "groups",
			icon: <TeamOutlined />,
			label: "Groups",
			onClick: () => navigate("/admin/groups"),
		},
		{
			key: "branches",
			icon: <FaCodeBranch />,
			label: "Branches",
			onClick: () => navigate(`/admin${ApiUrls.BRANCHES}`),
		},
		{
			key: "courses",
			icon: <MdCastForEducation />,
			label: "Courses",
			onClick: () => navigate(`/admin${ApiUrls.COURSES}`),
		},
	];

	const handleThemeToggle = (checked: boolean) => {
		setDarkMode(checked);
		if (checked) {
			removeItem("dark_mode");
			setItem("dark_mode", "true");
		} else {
			removeItem("dark_mode");
			setItem("dark_mode", "false");
		}
	};

	return (
		<Layout
			style={{
				minHeight: "100vh",
				background: darkMode ? "#1a1f24" : "#f5f7fa",
				marginTop: "-10px",
				marginBottom: "0px",
			}}
		>
			<Sider
				trigger={null}
				collapsible
				collapsed={collapsed}
				style={{
					position: "fixed",
					height: "100vh",
					left: 0,
					top: 0,
					bottom: 0,
					zIndex: 1000,
					background: darkMode ? "#1a1f24" : "#ffffff",
					boxShadow: "2px 0 8px rgba(0,0,0,0.08)",
					borderRight: darkMode ? "none" : "1px solid #e8e8e8",
					overflow: "auto",
				}}
			>
				<div
					style={{
						height: "64px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						background: darkMode ? "#2a3a4a" : "#2a3a4a",
						color: "#fff",
						fontSize: collapsed ? "18px" : "20px",
						fontWeight: "600",
						marginBottom: "8px",
					}}
				>
					{collapsed ? "CRM" : "CRM Admin"}
				</div>

				<Menu
					theme={darkMode ? "dark" : "light"}
					mode="inline"
					defaultSelectedKeys={["dashboard"]}
					items={sidebarItems}
					style={{
						borderRight: "none",
						padding: "8px 0",
						background: darkMode ? "#1a1f24" : "#ffffff",
					}}
				/>
			</Sider>

			<Layout
				style={{
					marginLeft: collapsed ? 80 : 200,
					transition: "margin-left 0.2s",
					background: darkMode ? "#1a1f24" : "#f5f7fa",
					marginRight: "-8px",
					marginTop: "-10px",
					marginBottom: "-10px",
				}}
			>
				<Header
					style={{
						padding: "0 20px",
						background: darkMode ? "#2a3a4a" : "#ffffff",
						borderBottom: darkMode ? "none" : "1px solid #e8e8e8",
						position: "sticky",
						top: 0,
						zIndex: 999,
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
						height: "64px",
					}}
				>
					<div style={{ display: "flex", alignItems: "center" }}>
						<Button
							type="text"
							icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
							onClick={() => setCollapsed(!collapsed)}
							style={{
								fontSize: "16px",
								width: 48,
								height: 48,
								color: darkMode ? "#fff" : "#5a5a5a",
							}}
						/>

						<Search
							placeholder="Search..."
							style={{
								width: 240,
								marginLeft: 12,
								backgroundColor: darkMode ? "#2a3a4a" : "#ffffff",
								borderColor: darkMode ? "#3d4d5d" : "#d9d9d9",
								color: darkMode ? "#fff" : "#000",
							}}
							size="middle"
							allowClear
						/>
					</div>

					<Space size="middle" align="center">
						<Switch
							checked={darkMode}
							onChange={handleThemeToggle}
							checkedChildren={<MoonOutlined />}
							unCheckedChildren={<SunOutlined />}
							style={{
								backgroundColor: darkMode ? "#394b59" : "#e6e6e6",
							}}
						/>

						<Badge count={5} size="small" dot={false}>
							<Button
								type="text"
								icon={<BellOutlined />}
								size="middle"
								style={{
									color: darkMode ? "#fff" : "#5a5a5a",
									width: 40,
									height: 40,
								}}
							/>
						</Badge>

						<Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
							<div
								style={{
									display: "flex",
									alignItems: "center",
									cursor: "pointer",
									padding: "8px 0 8px 12px",
									borderRadius: "4px",
									transition: "background 0.3s",
								}}
							>
								<Avatar
									icon={<UserOutlined />}
									style={{
										backgroundColor: "#4a6da7",
										marginRight: 8,
									}}
								/>
								{!collapsed && (
									<span
										style={{
											color: darkMode ? "#fff" : "#333",
											fontWeight: 500,
											fontSize: "14px",
										}}
									>
										Admin
									</span>
								)}
							</div>
						</Dropdown>
					</Space>
				</Header>

				<Content
					style={{
						margin: "26px 26px 0",
						padding: 24,
						minHeight: 280,
						background: darkMode ? "#2a3a4a" : "#ffffff",
						borderRadius: "8px",
						boxShadow: darkMode
							? "0 1px 2px 0 rgba(0, 0, 0, 0.1)"
							: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
					}}
				>
					<Outlet />
				</Content>
			</Layout>
		</Layout>
	);
};

export default AdminLayout;

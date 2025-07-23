import {
	BellOutlined,
	DashboardOutlined,
	LogoutOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	SettingOutlined,
	TeamOutlined,
	UserOutlined,
} from "@ant-design/icons";
import {
	Avatar,
	Badge,
	Button,
	ConfigProvider,
	Dropdown,
	Layout,
	Menu,
	Space,
} from "antd";
import React, { useState } from "react";
import { FaCodeBranch } from "react-icons/fa";
import { MdCastForEducation } from "react-icons/md";
import { PiChalkboardTeacherFill } from "react-icons/pi";
import { SiGoogleclassroom } from "react-icons/si";
import { Outlet, useNavigate } from "react-router-dom";
import { ApiUrls } from "../../api/api-urls";
import { removeItem } from "../../helpers";
const { Header, Sider, Content } = Layout;

const AdminLayout: React.FC = () => {
	const [collapsed, setCollapsed] = useState(false);
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
			default: true,
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
		{
			key: "teachers",
			icon: <PiChalkboardTeacherFill />,
			label: "Teachers",
			onClick: () => navigate(`/admin${ApiUrls.TEACHER}`),
		},
		{
			key: "rooms",
			icon: <SiGoogleclassroom />,
			label: "Rooms",
			onClick: () => navigate(`/admin${ApiUrls.ROOMS}`),
		},
	];

	return (
		<ConfigProvider>
			<div className="admin-layout min-h-screen bg-gray-100">
				<Layout>
					<Sider
						trigger={null}
						collapsible
						collapsed={collapsed}
						width={200}
						style={{
							position: "fixed",
							height: "100vh",
							left: 0,
							top: 0,
							bottom: 0,
							zIndex: 1000,
							background: "#2a3a4a",
							color: "#fff",
							boxShadow: "2px 0 8px rgba(0,0,0,0.08)",
							borderRight: "none",
							overflow: "auto",
						}}
					>
						<div
							style={{
								height: "64px",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								background: "#2a3a4a",
								color: "#fff",
								fontSize: collapsed ? "18px" : "20px",
								fontWeight: "600",
								marginBottom: "8px",
							}}
						>
							{collapsed ? "CRM" : "CRM Admin"}
						</div>
						<Menu
							theme="dark"
							mode="inline"
							defaultSelectedKeys={["dashboard"]}
							items={sidebarItems}
							style={{
								background: "#2a3a4a",
								color: "#fff",
								borderRight: "none",
								padding: "8px 0",
							}}
						/>
					</Sider>
					<Layout
						style={{
							marginLeft: 200,
							minHeight: "100vh",
							width: "100%",
							background: "#f5f7fa",
						}}
					>
						<Header
							style={{
								padding: "0 20px",
								background: "#ffffff",
								borderBottom: "1px solid #e8e8e8",
								position: "sticky",
								top: 0,
								zIndex: 999,
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
								height: "64px",
								marginLeft: "-8px",
							}}
						>
							<div style={{ display: "flex", alignItems: "center" }}>
								<Button
									type="text"
									icon={
										collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
									}
									onClick={() => setCollapsed(!collapsed)}
									style={{
										fontSize: "16px",
										width: 48,
										height: 48,
										color: "#5a5a5a",
									}}
								/>
							</div>
							<Space size="middle" align="center">
								<Badge count={5} size="small" dot={false}>
									<Button
										type="text"
										icon={<BellOutlined />}
										size="middle"
										style={{
											color: "#5a5a5a",
											width: 40,
											height: 40,
										}}
									/>
								</Badge>
								<Dropdown
									menu={{ items: userMenuItems }}
									placement="bottomRight"
								>
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
													color: "#000",
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
								padding: 0,
								width: "100%",
								maxWidth: "100%",
							}}
							className="overflow-x-auto p-2 sm:p-4 md:p-6 min-h-[280px] bg-white rounded-lg shadow"
						>
							<Outlet />
						</Content>
					</Layout>
				</Layout>
			</div>
		</ConfigProvider>
	);
};

export default AdminLayout;

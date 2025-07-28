// import {
//   BellOutlined,
//   DashboardOutlined,
//   LogoutOutlined,
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
//   SettingOutlined,
//   TeamOutlined,
//   UserOutlined,
// } from "@ant-design/icons";
// import { Avatar, Badge, Button, Dropdown } from "antd";
// import React, { useState } from "react";
// import { FaCodeBranch } from "react-icons/fa";
// import { MdCastForEducation } from "react-icons/md";
// import { PiChalkboardTeacherFill } from "react-icons/pi";
// import { SiGoogleclassroom } from "react-icons/si";
// import { Outlet, useNavigate } from "react-router-dom";
// import { ApiUrls } from "../../api/api-urls";
// import { removeItem } from "../../helpers";

// const AdminLayout: React.FC = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const navigate = useNavigate();

//   const userMenuItems = [
//     {
//       key: "profile",
//       icon: <UserOutlined />,
//       label: "Profile",
//     },
//     {
//       key: "settings",
//       icon: <SettingOutlined />,
//       label: "Settings",
//     },
//     {
//       type: "divider" as const,
//     },
//     {
//       key: "logout",
//       icon: <LogoutOutlined />,
//       label: "Logout",
//       danger: true,
//       onClick: async () => {
//         removeItem("access_token");
//         removeItem("role");
//         navigate("/");
//       },
//     },
//   ];

//   const sidebarItems = [
//     {
//       key: "dashboard",
//       icon: <DashboardOutlined />,
//       label: "Dashboard",
//       default: true,
//       onClick: () => navigate("/admin/dashboard"),
//     },
//     {
//       key: "students",
//       icon: <UserOutlined />,
//       label: "Students",
//       onClick: () => navigate("/admin/students"),
//     },
//     {
//       key: "groups",
//       icon: <TeamOutlined />,
//       label: "Groups",
//       onClick: () => navigate("/admin/groups"),
//     },
//     {
//       key: "branches",
//       icon: <FaCodeBranch />,
//       label: "Branches",
//       onClick: () => navigate(`/admin${ApiUrls.BRANCHES}`),
//     },
//     {
//       key: "courses",
//       icon: <MdCastForEducation />,
//       label: "Courses",
//       onClick: () => navigate(`/admin${ApiUrls.COURSES}`),
//     },
//     {
//       key: "teachers",
//       icon: <PiChalkboardTeacherFill />,
//       label: "Teachers",
//       onClick: () => navigate(`/admin${ApiUrls.TEACHER}`),
//     },
//     {
//       key: "rooms",
//       icon: <SiGoogleclassroom />,
//       label: "Rooms",
//       onClick: () => navigate(`/admin${ApiUrls.ROOMS}`),
//     },
//   ];

//   return (
//     <div className="min-h-screen flex flex-col overflow-hidden bg-gray-100 font-sans">
//       {/* Sidebar */}
//       <aside
//         className={`fixed top-0 left-0 h-screen z-30 bg-gray-800 text-white flex flex-col transition-all duration-300 ${
//           collapsed ? "w-16" : "w-64 md:w-72"
//         }`}
//       >
//         <div className="flex items-center justify-center h-16 font-bold text-lg tracking-wide border-b border-gray-700">
//           {collapsed ? "CRM" : "CRM Admin"}
//         </div>
//         <nav className="flex-1 overflow-y-auto py-4">
//           {sidebarItems.map((item) => (
//             <button
//               key={item.key}
//               onClick={item.onClick}
//               className="w-full flex items-center gap-3 px-4 py-3 my-1 rounded-lg hover:bg-gray-700 transition-colors text-left focus:outline-none text-sm md:text-base"
//             >
//               <span className="text-xl">{item.icon}</span>
//               {!collapsed && <span className="font-medium">{item.label}</span>}
//             </button>
//           ))}
//         </nav>
//       </aside>

//       {/* Main content wrapper */}
//       <div
//         className={`flex flex-col flex-1 transition-all duration-300 ${
//           collapsed ? "ml-16" : "ml-64 md:ml-72"
//         } overflow-x-hidden`}
//       >
//         {/* Header */}
//         <header className="sticky top-0 z-20 bg-white h-16 flex items-center justify-between px-4 md:px-6 shadow-sm border-b border-gray-200">
//           <Button
//             type="text"
//             icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//             onClick={() => setCollapsed(!collapsed)}
//             className="text-gray-600 w-10 h-10 flex items-center justify-center"
//           />
//           <div className="flex items-center gap-3">
//             <Badge count={5} size="small" dot={false}>
//               <Button
//                 type="text"
//                 icon={<BellOutlined />}
//                 className="text-gray-600 w-9 h-9 flex items-center justify-center"
//               />
//             </Badge>
//             <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
//               <div className="flex items-center cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-100 transition">
//                 <Avatar
//                   icon={<UserOutlined />}
//                   className="bg-blue-600 mr-2"
//                 />
//                 {!collapsed && (
//                   <span className="text-gray-900 font-medium text-sm md:text-base">
//                     Admin
//                   </span>
//                 )}
//               </div>
//             </Dropdown>
//           </div>
//         </header>

//         {/* Content */}
//         <main className="flex-1 p-4 md:p-6 lg:p-8 bg-gray-50 overflow-x-hidden">
//           <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm p-4 md:p-6">
//             <Outlet />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// ------------------------------------------

import {
	LogoutOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Modal, theme } from "antd";
import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import sidebarRoutes from "../../routes/sidebar-routes";
import { removeItem } from "../../helpers"
// import { removeAccessToken } from "@utils/token-service";
// import MainLogo from "../../assets/logo.svg";
// import LogoTitle from "../../assets/logo_title.svg";

const { Header, Sider, Content } = Layout;

const Index = () => {
	const [collapsed, setCollapsed] = useState(false);
	const location = useLocation();
	const [selectedKey, setSelectedKey] = useState("");

	useEffect(() => {
		// Find the active route and set the selected key based on the current path
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
							CRM Admin
						</p>
					)}
				</div>
				<Menu
					theme="dark"
					mode="inline"
					selectedKeys={[selectedKey]}
					items={sidebarRoutes.map((item, index) => ({
						key: index.toString(),
						icon: <item.icon />, // <-- FIX: use JSX, works for both AntD and React Icons
						label: <NavLink to={item.path}>{item.title}</NavLink>,
					}))}
				/>
			</Sider>
			<Layout style={{ marginLeft: collapsed ? 80 : 200, marginRight: 3 }}>
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
					<Button
						type="text"
						icon={<LogoutOutlined />}
						onClick={handleLogout}
						style={{ marginRight: "16px" }}
					>
						Logout
					</Button>
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

export default Index;

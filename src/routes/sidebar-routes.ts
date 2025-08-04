// src/routes/sidebar-routes.ts
import {
  DashboardOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { FaCodeBranch } from "react-icons/fa";
import { MdCastForEducation } from "react-icons/md";
import { PiChalkboardTeacherFill } from "react-icons/pi";
import { SiGoogleclassroom } from "react-icons/si";

const sidebarRoutes = [
  { path: "/admin/dashboard", icon: DashboardOutlined, title: "Dashboard" },
  { path: "/admin/students", icon: UserOutlined, title: "Students" },
  { path: "/admin/groups", icon: TeamOutlined, title: "Groups" },
  { path: "/admin/branches", icon: FaCodeBranch, title: "Branches" },
  { path: "/admin/courses", icon: MdCastForEducation, title: "Courses" },
  { path: "/admin/teacher", icon: PiChalkboardTeacherFill, title: "Teachers" },
  { path: "/admin/rooms", icon: SiGoogleclassroom, title: "Rooms" },
];
export default sidebarRoutes;

const sidebarRoutesForTeacher = [
  { path: "/teacher/dashboard", icon: DashboardOutlined, title: "Dashboard" },
  { path: "/teacher/my-groups", icon: TeamOutlined, title: "Groups" },
];
const sidebarRoutesForStudents = [
  { path: "/student/dashboard", icon: DashboardOutlined, title: "Dashboard" },
  { path: "/student/my-groups", icon: TeamOutlined, title: "Groups" },
];
export { sidebarRoutes, sidebarRoutesForTeacher,sidebarRoutesForStudents };
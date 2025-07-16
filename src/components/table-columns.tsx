import type { GroupType, StudentType, TeacherType } from "@types";
import type { TableProps } from "antd";

export const GroupColumns: TableProps<GroupType>["columns"] = [
	{
		title: "Group",
		dataIndex: "name",
		key: "group",
	},
	{
		title: "Course",
		dataIndex: "course",
		key: "course",
		render: (course) => <span>{course.title}</span>,
	},
	{
		title: "Start Date",
		dataIndex: "start_date",
		key: "start_date",
	},
	{
		title: "End Date",
		dataIndex: "end_date",
		key: "end_date",
	},
	{
		title: "Status",
		dataIndex: "status",
		key: "status",
	},
];

export const StudentColumn: TableProps<StudentType>["columns"] = [
	{
		title: "First Name",
		dataIndex: "first_name",
		key: "firstname",
		width: 150,
	},
	{
		title: "Last Name",
		dataIndex: "last_name",
		key: "lastname",
		width: 150,
	},
	{
		title: "Email",
		dataIndex: "email",
		key: "email",
		width: 200,
	},
	{
		title: "Phone",
		dataIndex: "phone",
		key: "phone",
		width: 150,
	},
	{
		title: "Password",
		dataIndex: "password_hash",
		key: "passwordhash",
		width: 150,
		render: (text) => (text ? `******` : "N/A"),
	},
	{
		title: "Gender",
		dataIndex: "gender",
		key: "gender",
		width: 100,
	},
	{
		title: "BirthDate",
		dataIndex: "date_of_birth",
		key: "dateofbirth",
		width: 120,
	},
	{
		title: "Lid Id",
		dataIndex: "lidId",
		key: "lidid",
		width: 80,
	},
	{
		title: "Events Id",
		dataIndex: "eventsId",
		key: "eventsid",
		width: 100,
	},
	{
		title: "Groups Id",
		dataIndex: "groupsId",
		key: "groupsid",
		width: 100,
	},
];
export const TeacherColumn: TableProps<TeacherType>["columns"] = [
	{
		title: "First Name",
		dataIndex: "first_name",
		key: "first_name",
		width: 150,
		// fixed: 'left',
	},
	{
		title: "Last Name",
		dataIndex: "last_name",
		key: "lastname",
		width: 150,
	},
	{
		title: "Email",
		dataIndex: "email",
		key: "email",
		width: 200,
	},
	{
		title: "Phone",
		dataIndex: "phone",
		key: "phone",
		width: 150,
	},
	{
		title: "Password",
		dataIndex: "password",
		key: "passwordhash",
		width: 150,
		render: (text) => (text ? `${text.slice(1,10)}...` : "N/A"),
	},
	{
		title: "Role",
		dataIndex: "role",
		key: "role",
		width: 100,
	},
	{
		title: "Branch",
		dataIndex: "BranchId",
		key: "branch",
		width: 120,
	},
];

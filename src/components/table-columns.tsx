import type { BranchType, CourseType, GroupType, StudentType, TeacherType } from "@types";
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
		render: (text) => (text ? `${text.slice(1, 10)}...` : "N/A"),
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

export const BranchColumn: TableProps<BranchType>["columns"] = [
	{
		title: "Name",
		dataIndex: "name",
		key: "Name",
	},
	{
		title: "Address",
		dataIndex: "address",
		key: "Address",
	},
	{
		title: "Call Number",
		dataIndex: "call_number",
		key: "Call Number",
	},
	{
		title: "Teachers",
		dataIndex: "teachers",
		key: "Teachers",
		render: (teachers) => (
			<span>
				{Array.isArray(teachers) && teachers.length > 0
					? teachers.map((teacher) => teacher.first_name || "N/A").join("\n")
					: "No teachers"}
			</span>
		),
	},
];

export const CourseColumns: TableProps<CourseType>["columns"] = [
	{
		title: "Title",
		dataIndex: "title",
		key: "title",
		// width: 150,
	},
	{
		title: "Description",
		dataIndex: "description",
		key: "description",
		// width: 150,
	},
	{
		title: "Price",
		dataIndex: "price",
		key: "price",
		// width: 150,
	},
	{
		title: "Duration",
		dataIndex: "duration",
		key: "duration",
		// width: 150,
	},
	{
		title: "Lesson in week",
		dataIndex: "lessons_in_a_week",
		key: "lessons_in_a_week",
		// width: 150,
	},
	{
		title: "Lesson Duration",
		dataIndex: "lesson_duration",
		key: "gender",
		// width: 150,
	},
];

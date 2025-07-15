import type { GroupType } from "@types";
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

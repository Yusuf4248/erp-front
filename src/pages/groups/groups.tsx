import { groupsService } from "@service";
import { useEffect, useState } from "react";

import type { TableProps } from "antd";
import { Table } from "antd";
import React from "react";

interface DataType {
	name: string;
	course: string;
	start_date: string;
	end_date: string;
	status: string;
}

const columns: TableProps<DataType>["columns"] = [
	{
		title: "Name",
		dataIndex: "name",
		key: "name",
		render: (text) => <a>{text}</a>,
	},
	{
		title: "Course",
		dataIndex: "course",
		key: "course",
	},
	{
		title: "Address",
		dataIndex: "address",
		key: "address",
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
		key: "status",
		dataIndex: "status",
	},
];

const Groups: React.FC = () => {
	const [group, setGroup] = useState([]);
	const [data, setData] = useState<DataType[]>([]);
	useEffect(() => {
		const fetchGroups = async () => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const res: any = await groupsService.getGroup();
			setGroup(res);
		};
		fetchGroups();
	}, []);
	console.log(group)
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	group.forEach((item:any)=>{
		setData([{
			name:item.name,
			course:item.course.title,
			status:item.status,
			start_date:item.start_date,
			end_date:item.end_date
		}])
	})

	return (
		<>
			<div>
				<h1>Groups</h1>
			</div>
			<Table<DataType> columns={columns} dataSource={data} />
		</>
	);
};

export default Groups;

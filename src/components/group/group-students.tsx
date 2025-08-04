import { UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Table } from "antd";
import { User } from "lucide-react";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import GroupStudentAttendance from "../students/group-students-attendance";
import AddTeacherorStudentModal from "./single-modal";
const GroupStudent = ({ students, id }: any) => {
	const [open, setOpen] = useState(false);
	const [addingTeacher, setAddingTeacher] = useState(true);
	// console.log(students)
	const toggle = () => {
		setOpen(!open);
	};
	const studentsColumns = [
		Table.EXPAND_COLUMN,
		{
			title: "Student",
			dataIndex: "name",
			key: "name",
			render: (text: string, record: any) => (
				<div className="flex items-center space-x-3">
					<Avatar
						size={40}
						icon={<UserOutlined />}
						src={record.avatar}
						className="bg-blue-500"
					/>
					<div>
						<div className="font-medium text-gray-900">{text}</div>
						<div className="text-sm text-gray-500">{record.email}</div>
					</div>
				</div>
			),
		},
		{
			title: "Phone",
			dataIndex: "phone",
			key: "phone",
			render: (phone: string) => <span className="text-gray-600">{phone}</span>,
		},
		{
			title: "Mail",
			dataIndex: "email",
			key: "email",
			render: (email: string) => <span className="text-gray-600">{email}</span>,
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			render: (status: string) => {
				const config = {
					active: { color: "success", text: "Active" },
					warning: { color: "warning", text: "Warning" },
					inactive: { color: "default", text: "Inactive" },
				} as const;
				type StatusKey = keyof typeof config;
				const statusKey = status as StatusKey;
				return (
					<Badge
						status={config[statusKey]?.color}
						text={config[statusKey]?.text}
					/>
				);
			},
		},
		{
			title: "Birth date",
			dataIndex: "date_of_birth",
			key: "date_of_birth",
			render: (date_of_birth: string) => (
				<span className="text-gray-600">{date_of_birth}</span>
			),
		},
	];
	const studentData = students.map((student: any) => ({
		key: student.student.id,
		name: student.student.first_name,
		phone: student.student.phone,
		email: student.student.email,
		status: student.status,
		date_of_birth: student.student.date_of_birth,
		attendance: student.student.attendance,
	}));
	console.log(studentData)
	return (
		<>
			{open && (
				<AddTeacherorStudentModal
					open={open}
					toggle={toggle}
					addingTeacher={addingTeacher}
					groupId={+id!}
				/>
			)}
			<div className="bg-white rounded-lg border border-gray-200">
				<div className="p-6 border-b border-gray-200">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<User className="w-5 h-5 text-green-600" />
							<h3 className="text-lg font-medium text-gray-900">Students</h3>
							<span className="bg-green-50 text-green-700 text-sm px-2 py-1 rounded-md">
								{students.length}
							</span>
						</div>
						<div className="flex items-center gap-2">
							<button
								type="button"
								className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
								onClick={() => {
									setOpen(true);
									setAddingTeacher(true);
								}}
							>
								<FaPlus className="w-4 h-4" />
								Add Teacher
							</button>
							<button
								type="button"
								className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 text-sm rounded-md hover:bg-green-700 cursor-pointer"
								onClick={() => {
									setOpen(true);
									setAddingTeacher(false);
								}}
							>
								<FaPlus className="w-4 h-4" />
								Add Student
							</button>
						</div>
					</div>
				</div>

				<div className="overflow-x-auto overflow-y-auto max-h-[500px] [&::-webkit-scrollbar]:hidden">
					<Table
						columns={studentsColumns}
						dataSource={studentData}
						pagination={{ pageSize: 10 }}
						scroll={{ x: 800 }}
						expandable={{
							expandedRowRender: (record) => (
								<GroupStudentAttendance data={record.attendance} />
							),
						}}
					/>
				</div>
			</div>
		</>
	);
};

export default React.memo(GroupStudent);

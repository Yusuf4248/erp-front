import type {
	BranchType,
	CourseType,
	GroupType,
	LessonType,
	RoomsType,
	StudentType,
	TeacherType,
} from "@types";
import { Button, Modal, Table, Tooltip, type TableProps } from "antd";
import { useState } from "react";
import { ExportOutlined } from "@ant-design/icons";
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
		// width: 150,
	},
	{
		title: "Last Name",
		dataIndex: "last_name",
		key: "lastname",
		// width: 150,
	},
	{
		title: "Email",
		dataIndex: "email",
		key: "email",
		// width: 200,
	},
	{
		title: "Phone",
		dataIndex: "phone",
		key: "phone",
		// width: 150,
	},
	{
		title: "Gender",
		dataIndex: "gender",
		key: "gender",
		// width: 100,
	},
	{
		title: "BirthDate",
		dataIndex: "date_of_birth",
		key: "dateofbirth",
		// width: 120,
	},
	{
		title: "Lid Id",
		dataIndex: "lidId",
		key: "lidid",
		// width: 80,
	},
];
export const TeacherColumn: TableProps<TeacherType>["columns"] = [
	{
		title: "First Name",
		dataIndex: "first_name",
		key: "first_name",
		// width: 150,
		// fixed: 'left',
	},
	{
		title: "Last Name",
		dataIndex: "last_name",
		key: "lastname",
		// 		width: 150,
	},
	{
		title: "Email",
		dataIndex: "email",
		key: "email",
		// width: 200,
	},
	{
		title: "Phone",
		dataIndex: "phone",
		key: "phone",
		width: 180,
	},
	{
		title: "Role",
		dataIndex: "role",
		key: "role",
		// width: 100,
	},
	{
		title: "Branch",
		dataIndex: "branches",
		key: "branch",
		render: (branches) => {
			if (!branches || !Array.isArray(branches) || branches.length === 0) {
				return "No branches";
			}
			const branchNames = branches
				.map((branch: any) => branch.name)
				.join(" | ");
			return (
				<Tooltip title={branchNames}>
					{branchNames.slice(0, 100) + (branchNames.length > 100 ? "..." : "")}
				</Tooltip>
			);
		},
		width: 200,
	},
];
export const TeacherColumnForModal: TableProps<TeacherType>["columns"] = [
	{
		title: "First Name",
		dataIndex: "first_name",
		key: "first_name",
		// width: 150,
		// fixed: 'left',
	},
	{
		title: "Last Name",
		dataIndex: "last_name",
		key: "lastname",
		// 		width: 150,
	},
	{
		title: "Email",
		dataIndex: "email",
		key: "email",
		// width: 200,
	},
	{
		title: "Phone",
		dataIndex: "phone",
		key: "phone",
		width: 180,
	},
	{
		title: "Role",
		dataIndex: "role",
		key: "role",
		// width: 100,
	},
];

const TeachersModal = ({ teachers }: { teachers: TeacherType[] }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};
	return (
		<>
			<Button type="link" onClick={showModal}>
			<ExportOutlined />
			</Button>
			<Modal
				title="Branch Teachers"
				open={isModalOpen}
				onCancel={handleCancel}
				footer={null}
				width={800}
			>
				<Table dataSource={teachers} columns={TeacherColumnForModal} />
			</Modal>
		</>
	);
};

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
				{Array.isArray(teachers) && teachers.length > 0 ? (
					<TeachersModal teachers={teachers} />
				) : (
					"No teachers"
				)}
			</span>
		),
	},
];

export const CourseColumns: TableProps<CourseType>["columns"] = [
	{
		title: "Title",
		dataIndex: "title",
		key: "title",
		width: 150,
	},
	{
		title: "Description",
		dataIndex: "description",
		key: "description",
		width: 250,
		render: (text) => (
			<Tooltip title={text}>{text.slice(0, 40) + "..."}</Tooltip>
		),
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
		width: 150,
	},
	{
		title: "Lesson Duration",
		dataIndex: "lesson_duration",
		key: "gender",
		// width: 150,
	},
];

export const RoomsColumn: TableProps<RoomsType>["columns"] = [
	{
		title: "Name",
		dataIndex: "name",
		key: "name",
		// width: 150,
	},
	{
		title: "Branch",
		dataIndex: "branch",
		key: "brnach",
		render: (branch) => branch.name,
		// width: 150,
	},
	{
		title: "Capacity",
		dataIndex: "capacity",
		key: "capacity",
		// width: 150,
	},
];
export const LessonsColumn: TableProps<LessonType>["columns"] = [
	Table.EXPAND_COLUMN,
	{
		title: "Title",
		dataIndex: "title",
		key: "title",
	},
	{
		title: "Notes",
		dataIndex: "notes",
		key: "notes",
	},
	{
		title: "Date",
		dataIndex: "date",
		key: "date",
		render: (dt) => dt.split("T")[0],
	},
	{
		title: "Status",
		dataIndex: "status",
		key: "status",
	},
	{
		title: "Group",
		dataIndex: "group",
		key: "groupId",
		render: (group) => group.name,
	},
	{
		title: "Room",
		dataIndex: "room",
		key: "roomId",
		render: (room) => room.name,
	},
];

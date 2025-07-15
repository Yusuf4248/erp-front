// import { courseService } from "@service";
// import type { TableProps } from "antd";
// import { Button, Input, Modal, Select, Table, message } from "antd";
// import React, { useEffect, useState } from "react";
// import { FaEdit } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// import { useLocation } from "react-router-dom";
// import { Notification } from "../../helpers";
// import { useGroups } from "../../hooks/useGroups";
// import { useStudents } from "../../hooks/useStudents";
// import { useTeachers } from "../../hooks/useTeacher";
// interface GroupType {
// 	id: number;
// 	name: string;
// 	course: string;
// 	start_date: string;
// 	end_date: string;
// 	status: string;
// }
// const Groups: React.FC = () => {
// 	const [courses, setCourses] = useState<any[]>([]);
// 	const [isModalOpen, setIsModalOpen] = useState(false);
// 	const [selectedGroup, setSelectedGroup] = useState<GroupType | null>(null);
// 	const [formData, setFormData] = useState({
// 		name: "",
// 		course: "",
// 		start_date: "",
// 		end_date: "",
// 		status: "",
// 	});
// 	const [user, setUser] = useState(false);
//
// 	const { data, useGroupCreate, useGroupUpdate, useGroupDelete } = useGroups();
// 	const { mutate: createGroup, isPending: isCreating } = useGroupCreate();
// 	const { mutate: updateGroup, isPending: isUpdating } = useGroupUpdate();
// 	const { mutate: deleteGroup, isPending: isDeleting } = useGroupDelete();
// 	const { data: teachers } = useTeachers();
// 	const { data: student } = useStudents();
// 	const [params, setParams] = useState({
// 		page: 1,
// 		limit: 5,
// 	});
// 	useEffect(() => {
// 		const fetchCourses = async () => {
// 			try {
// 				const res = await courseService.getCourse();
// 				setCourses(res?.data.courses || []);
// 			} catch (error) {
// 				message.error("Kurslarni yuklashda xato yuz berdi");
// 			}
// 		};
// 		fetchCourses();
// 	}, []);
// 	const location = useLocation();
// 	useEffect(() => {
// 		const searchParams = new URLSearchParams(location.search);
// 		const page = searchParams.get("page");
// 		const limit = searchParams.get("limit");
// 		if (page && limit) {
// 			setParams({
// 				page: Number(page),
// 				limit: Number(limit),
// 			});
// 		}
// 	}, [location.search]);
// 	const columns: TableProps<GroupType>["columns"] = [
// 		{
// 			title: "Name",
// 			dataIndex: "name",
// 			key: "name",
// 		},
// 		{
// 			title: "Course",
// 			dataIndex: "course",
// 			key: "course",
// 		},
// 		{
// 			title: "Start Date",
// 			dataIndex: "start_date",
// 			key: "start_date",
// 		},
// 		{
// 			title: "End Date",
// 			dataIndex: "end_date",
// 			key: "end_date",
// 		},
// 		{
// 			title: "Status",
// 			dataIndex: "status",
// 			key: "status",
// 			render: (status) => (
// 				<span
// 					style={{
// 						color: status === "active" ? "#52c41aff" : "#ff4d4f",
// 						textTransform: "capitalize",
// 					}}
// 				>
// 					{status}
// 				</span>
// 			),
// 		},
// 		{
// 			title: "Actions",
// 			key: "actions",
// 			render: (_, record) => (
// 				<div>
// 					<Button
// 						type="primary"
// 						onClick={() => handleEditClick(record)}
// 						style={{ marginRight: 8 }}
// 					>
// 						<FaEdit />
// 						Edit
// 					</Button>
// 					<Button
// 						danger
// 						onClick={() => handleDeleteClick(record.id)}
// 						loading={isDeleting}
// 						style={{ backgroundColor: "red", color: "#fff" }}
// 					>
// 						<MdDelete />
// 						Delete
// 					</Button>
// 				</div>
// 			),
// 		},
// 	];
// 	const handleEditClick = (group: GroupType) => {
// 		setSelectedGroup(group);
// 		setFormData({
// 			name: group.name,
// 			course: group.course,
// 			start_date: group.start_date,
// 			end_date: group.end_date,
// 			status: group.status,
// 		});
// 		setIsModalOpen(true);
// 	};
// 	const handleDeleteClick = (groupId: number) => {
// 		Modal.confirm({
// 			title: "Delete group",
// 			content: "Are you sure do you want to delete this group?",
// 			okText: "Yes",
// 			cancelText: "No",
// 			onOk: () =>
// 				deleteGroup(groupId, {
// 					onSuccess: () =>
// 						Notification("success", "Group deleted successfully"),
// 				}),
// 		});
// 	};
// 	const handleModalClose = () => {
// 		setIsModalOpen(false);
// 		setSelectedGroup(null);
// 		setFormData({
// 			name: "",
// 			course: "",
// 			start_date: "",
// 			end_date: "",
// 			status: "",
// 		});
// 	};
// 	const handleInputChange = (field: keyof typeof formData, value: string) => {
// 		setFormData((prev) => ({ ...prev, [field]: value }));
// 	};
// 	const handleAddNewGroup = (userSt: boolean) => {
// 		setUser(userSt);
// 		setSelectedGroup(null);
// 		setIsModalOpen(true);
// 	};
//
// 	console.log(user);
// 	const handleCreateGroup = () => {
// 		if (!formData.name || !formData.course || !formData.status) {
// 			Notification("error", "Feel all required area.");
// 			return;
// 		}
// 		const payload = {
// 			name: formData.name,
// 			course_id: Number(formData.course),
// 			start_date: formData.start_date,
// 			end_date: formData.end_date,
// 			status: formData.status,
// 		};
// 		createGroup(payload, {
// 			onSuccess: () => {
// 				Notification("success", "Group created successfully.");
// 				handleModalClose();
// 			},
// 		});
// 		setUser(false);
// 	};
// 	const handleUpdateGroup = () => {
// 		if (!selectedGroup) return;
// 		if (!formData.name || !formData.course || !formData.status) {
// 			Notification("error", "Feel all required area.");
// 			return;
// 		}
// 		const payload = {
// 			// id: selectedGroup.id,
// 			name: formData.name,
// 			course_id: Number(formData.course),
// 			start_date: formData.start_date,
// 			end_date: formData.end_date,
// 			status: formData.status,
// 		};
// 		updateGroup(
// 			{ id: selectedGroup.id, data: payload },
// 			{
// 				onSuccess: () => {
// 					Notification("success", "Group updated successfully");
// 					handleModalClose();
// 				},
// 			}
// 		);
// 	};
// 	const tableData =
// 		data?.data?.data?.map((item: any) => ({
// 			id: item.id,
// 			name: item.name,
// 			course: item.course?.title || "N/A",
// 			start_date: item.start_date || "N/A",
// 			end_date: item.end_date || "N/A",
// 			status: item.status || "N/A",
// 		})) || [];
// 	const handleTableChange = (pagination: any) => {};
// 	return (
// 		<div style={{ padding: 24 }}>
// 			<div style={{ marginBottom: "-38px", textAlign: "left" }}>
// 				<span style={{ marginTop: "100px", fontSize: "40px" }}>Groups</span>
// 			</div>
//
// 			<div style={{ marginBottom: 16, textAlign: "right" }}>
// 				<Button type="primary" onClick={() => handleAddNewGroup(false)}>
// 					Add new group
// 				</Button>
// 			</div>
// 			<div style={{ marginBottom: 16, textAlign: "right" }}>
// 				<Button
// 					type="primary"
// 					onClick={() => {
// 						handleAddNewGroup(true);
// 					}}
// 				>
// 					Add Student and Teacher
// 				</Button>
// 			</div>
//
// 			<Table
// 				columns={columns}
// 				dataSource={tableData}
// 				rowKey="id"
// 				pagination={{ pageSize: 5 }}
// 				loading={!data}
// 			/>
// 			<Modal
// 				title={
// 					user
// 						? "Add Student and Teacher"
// 						: selectedGroup
// 						? "Edit Group"
// 						: "Create Group"
// 				}
// 				open={isModalOpen}
// 				onCancel={handleModalClose}
// 				footer={[
// 					<Button key="cancel" onClick={handleModalClose}>
// 						Cancel
// 					</Button>,
// 					selectedGroup ? (
// 						<Button
// 							key="update"
// 							type="primary"
// 							onClick={handleUpdateGroup}
// 							loading={isUpdating}
// 						>
// 							Save
// 						</Button>
// 					) : (
// 						<Button
// 							key="create"
// 							type="primary"
// 							onClick={handleCreateGroup}
// 							loading={isCreating}
// 						>
// 							Create
// 						</Button>
// 					),
// 				]}
// 			>
// 				<div style={!user ? { marginBottom: 16 } : { display: "none" }}>
// 					<label>Name</label>
// 					<Input
// 						value={formData.name}
// 						onChange={(e) => handleInputChange("name", e.target.value)}
// 						placeholder="Guruh nomi"
//
// 					/>
// 				</div>
//
// 				<div style={!user ? { marginBottom: 16 } : { display: "none" }}>
// 					<label>Course</label>
// 					<Select
// 						style={{ width: "100%" }}
// 						value={formData.course}
// 						onChange={(value) => handleInputChange("course", value)}
// 						placeholder="Select course"
// 					>
// 						{courses.map((course) => (
// 							<Select.Option key={course.id} value={course.id}>
// 								{course.title}
// 							</Select.Option>
// 						))}
// 					</Select>
// 				</div>
//
// 				<div style={!user ? { marginBottom: 16 } : { display: "none" }}>
// 					<label>Start Date</label>
// 					<Input
// 						type="date"
// 						value={formData.start_date}
// 						onChange={(e) => handleInputChange("start_date", e.target.value)}
// 					/>
// 				</div>
//
// 				<div style={!user ? { marginBottom: 16 } : { display: "none" }}>
// 					<label>End Date</label>
// 					<Input
// 						type="date"
// 						value={formData.end_date}
// 						onChange={(e) => handleInputChange("end_date", e.target.value)}
// 					/>
// 				</div>
//
// 				<div style={!user ? { marginBottom: 16 } : { display: "none" }}>
// 					<label>Status</label>
// 					<Select
// 						style={{ width: "100%" }}
// 						value={formData.status}
// 						onChange={(value) => handleInputChange("status", value)}
// 						placeholder="Select status"
// 					>
// 						<Select.Option value="new">New</Select.Option>
// 						<Select.Option value="active">Active</Select.Option>
// 						<Select.Option value="end">End</Select.Option>
// 					</Select>
// 				</div>
//
// 				<div style={user ? { marginBottom: 16 } : { display: "none" }}>
// 					<label>Student</label>
// 					<Select
// 						style={{ width: "100%" }}
// 						value={formData.status}
// 						onChange={(value) => handleInputChange("status", value)}
// 						placeholder="Select status"
// 					>
// 						{student?.data?.students.map((st: any) => (
// 							<Select.Option key={st.id} value={st.id}>
// 								{st.first_name} {st.last_name}
// 							</Select.Option>
// 						))}
// 					</Select>
// 				</div>
// 				<div style={user ? { marginBottom: 16 } : { display: "none" }}>
// 					<label>Teacher</label>
// 					<Select
// 						style={{ width: "100%" }}
// 						value={formData.status}
// 						onChange={(value) => handleInputChange("status", value)}
// 						placeholder="Select status"
// 					>
// 						{teachers?.data?.teachers.map((teacher: any) => (
// 							<Select.Option key={teacher.id} value={teacher.id}>
// 								{teacher.first_name} {teacher.last_name}
// 							</Select.Option>
// 						))}
// 					</Select>
// 				</div>
// 			</Modal>
// 		</div>
// 	);
// };
// export default Groups;

import { EditOutlined } from "@ant-design/icons";
import { GroupColumns, PopConfirm } from "@components";
import { useGroups } from "@hooks";
import type { GroupType } from "@types";
import {
	Button,
	Space,
	Table,
	type TablePaginationConfig,
	type TableProps,
} from "antd";
import { useState } from "react";
import GroupModal from "./modal";
const Groups: React.FC = () => {
	const [open, setOpen] = useState(false);
	const [update, setUpdate] = useState<GroupType | null>(null);
	const [params, setParams] = useState({
		page: 1,
		limit: 10,
	});
	const { data, useGroupDelete } = useGroups(params);
	const { mutate: deleteGroup, isPending: isDeleting } = useGroupDelete();
	const deleteItem = (id: number) => {
		deleteGroup(id);
	};
	const updateItem = (groupData: GroupType) => {
		setOpen(true);
		setUpdate(groupData);
	};
	const toggle = () => {
		setOpen(!open);
		if (update) {
			setUpdate(null);
		}
	};
	const handleTableChange = (pagination: TablePaginationConfig) => {
		setParams({
			page: pagination.current!,
			limit: pagination.pageSize!,
		});
	};
	const columns: TableProps<GroupType>["columns"] = [
		...(GroupColumns ?? []),
		{
			title: "Action",
			key: "action",
			render: (_, record: GroupType) => (
				<Space size="middle">
					<Button type={"primary"} onClick={() => updateItem(record)}>
						<EditOutlined />
					</Button>
					<PopConfirm handleDelete={() => deleteItem(record.id)} loading={isDeleting} />
				</Space>
			),
		},
	];
	return (
		<>
			{open && <GroupModal open={open} toggle={toggle} update={update} />}
			<h1>Groups</h1>
			<Button type="primary" onClick={() => setOpen(true)}>
				Add New Group
			</Button>
			<Table<GroupType>
				columns={columns}
				dataSource={data?.data.data}
				rowKey={(record) => record.id}
				pagination={{
					current: params.page,
					pageSize: params.limit,
					total: data?.data.total,
					showSizeChanger: true,
					pageSizeOptions: [2, 6, 10, 14, 18, 20],
				}}
				onChange={handleTableChange}
			/>
		</>
	);
};
export default Groups;

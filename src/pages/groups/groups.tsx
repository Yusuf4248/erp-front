import { courseService } from "@service";
import type { TableProps } from "antd";
import { Button, Input, Modal, Select, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { Notification } from "../../helpers";
import { useGroups } from "../../hooks/useGroups";
interface GroupType {
	id: number;
	name: string;
	course: string;
	start_date: string;
	end_date: string;
	status: string;
}
const Groups: React.FC = () => {
	const [courses, setCourses] = useState<any[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedGroup, setSelectedGroup] = useState<GroupType | null>(null);
	const [formData, setFormData] = useState({
		name: "",
		course: "",
		start_date: "",
		end_date: "",
		status: "",
	});
	const { data, useGroupCreate, useGroupUpdate, useGroupDelete } = useGroups();
	const { mutate: createGroup, isPending: isCreating } = useGroupCreate();
	const { mutate: updateGroup, isPending: isUpdating } = useGroupUpdate();
	const { mutate: deleteGroup, isPending: isDeleting } = useGroupDelete();
	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const res = await courseService.getCourses();
				setCourses(res?.data.courses || []);
			} catch (error) {
				message.error("Kurslarni yuklashda xato yuz berdi");
			}
		};
		fetchCourses();
	}, []);
	const columns: TableProps<GroupType>["columns"] = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Course",
			dataIndex: "course",
			key: "course",
		},
		{
			title: "Satrt Date",
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
			render: (status) => (
				<span
					style={{
						color: status === "active" ? "#52c41a" : "#ff4d4f",
						textTransform: "capitalize",
					}}
				>
					{status}
				</span>
			),
		},
		{
			title: "Actions",
			key: "actions",
			render: (_, record) => (
				<div>
					<Button
						type="primary"
						onClick={() => handleEditClick(record)}
						style={{ marginRight: 8 }}
					>
						Edit
					</Button>
					<Button
						danger
						onClick={() => handleDeleteClick(record.id)}
						loading={isDeleting}
					>
						Delete
					</Button>
				</div>
			),
		},
	];
	const handleEditClick = (group: GroupType) => {
		setSelectedGroup(group);
		setFormData({
			name: group.name,
			course: group.course,
			start_date: group.start_date,
			end_date: group.end_date,
			status: group.status,
		});
		setIsModalOpen(true);
	};
	const handleDeleteClick = (groupId: number) => {
		Modal.confirm({
			title: "Delete group",
			content: "Are you sure do you want to delete this group?",
			okText: "Ha",
			cancelText: "Yo'q",
			onOk: () =>
				deleteGroup(groupId, {
					onSuccess: () =>
						Notification("success", "Group deleted successfully"),
				}),
		});
	};
	const handleModalClose = () => {
		setIsModalOpen(false);
		setSelectedGroup(null);
		setFormData({
			name: "",
			course: "",
			start_date: "",
			end_date: "",
			status: "",
		});
	};
	const handleInputChange = (field: keyof typeof formData, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};
	const handleAddNewGroup = () => {
		setSelectedGroup(null);
		setIsModalOpen(true);
	};
	const handleCreateGroup = () => {
		if (!formData.name || !formData.course || !formData.status) {
			Notification("error", "Feel all required area.");
			return;
		}
		const payload = {
			name: formData.name,
			course_id: Number(formData.course),
			start_date: formData.start_date,
			end_date: formData.end_date,
			status: formData.status,
		};
		createGroup(payload, {
			onSuccess: () => {
				Notification("success", "Group created successfully.");
				handleModalClose();
			},
		});
	};
	const handleUpdateGroup = () => {
		if (!selectedGroup) return;
		if (!formData.name || !formData.course || !formData.status) {
			Notification("error", "Feel all required area.");
			return;
		}
		const payload = {
			// id: selectedGroup.id,
			name: formData.name,
			course_id: Number(formData.course),
			start_date: formData.start_date,
			end_date: formData.end_date,
			status: formData.status,
		};
		updateGroup(
			{ id: selectedGroup.id, data: payload },
			{
				onSuccess: () => {
					Notification("success", "Group updated successfully");
					handleModalClose();
				},
			}
		);
	};
	const tableData =
		data?.data?.data?.map((item: any) => ({
			id: item.id,
			name: item.name,
			course: item.course?.title || "N/A",
			start_date: item.start_date || "N/A",
			end_date: item.end_date || "N/A",
			status: item.status || "N/A",
		})) || [];
	return (
		<div style={{ padding: 24 }}>
			<h1 style={{ marginBottom: 16 }}>Groups</h1>

			<div style={{ marginBottom: 16, textAlign: "right" }}>
				<Button type="primary" onClick={handleAddNewGroup}>
					Add new group
				</Button>
			</div>

			<Table
				columns={columns}
				dataSource={tableData}
				rowKey="id"
				pagination={{ pageSize: 10 }}
				loading={!data}
			/>
			<Modal
				title={selectedGroup ? "Edit Group" : "Add new group"}
				open={isModalOpen}
				onCancel={handleModalClose}
				footer={[
					<Button key="cancel" onClick={handleModalClose}>
						Cancel
					</Button>,
					selectedGroup ? (
						<Button
							key="update"
							type="primary"
							onClick={handleUpdateGroup}
							loading={isUpdating}
						>
							Save
						</Button>
					) : (
						<Button
							key="create"
							type="primary"
							onClick={handleCreateGroup}
							loading={isCreating}
						>
							Create
						</Button>
					),
				]}
			>
				<div style={{ marginBottom: 16 }}>
					<label>Name</label>
					<Input
						value={formData.name}
						onChange={(e) => handleInputChange("name", e.target.value)}
						placeholder="Guruh nomi"
					/>
				</div>

				<div style={{ marginBottom: 16 }}>
					<label>Course</label>
					<Select
						style={{ width: "100%" }}
						value={formData.course}
						onChange={(value) => handleInputChange("course", value)}
						placeholder="Select course"
					>
						{courses.map((course) => (
							<Select.Option key={course.id} value={course.id}>
								{course.title}
							</Select.Option>
						))}
					</Select>
				</div>

				<div style={{ marginBottom: 16 }}>
					<label>Start Date</label>
					<Input
						type="date"
						value={formData.start_date}
						onChange={(e) => handleInputChange("start_date", e.target.value)}
					/>
				</div>

				<div style={{ marginBottom: 16 }}>
					<label>End Date</label>
					<Input
						type="date"
						value={formData.end_date}
						onChange={(e) => handleInputChange("end_date", e.target.value)}
					/>
				</div>

				<div style={{ marginBottom: 16 }}>
					<label>Status</label>
					<Select
						style={{ width: "100%" }}
						value={formData.status}
						onChange={(value) => handleInputChange("status", value)}
						placeholder="Select status"
					>
						<Select.Option value="new">New</Select.Option>
						<Select.Option value="active">Active</Select.Option>
						<Select.Option value="end">End</Select.Option>
					</Select>
				</div>
			</Modal>
		</div>
	);
};
export default Groups;

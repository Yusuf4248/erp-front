import { courseService, groupsService } from "@service";
import type { TableProps } from "antd";
import { Button, Input, Modal, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Notification } from "../../helpers";

interface DataType {
	id: number;
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

const Groups: React.FC = () => {
	const [group, setGroup] = useState<DataType[]>([]);
	const [course, setCourse] = useState([]);
	const [data, setData] = useState<DataType[]>([]);
	const [loading, setLoading] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedGroup, setSelectedGroup] = useState<DataType | null>(null);
	const [formData, setFormData] = useState({
		name: "",
		course: "",
		start_date: "",
		end_date: "",
		status: "",
	});
	const [submitLoading, setSubmitLoading] = useState(false);

	useEffect(() => {
		const fetchGroups = async () => {
			setLoading(true);
			try {
				const res = await groupsService.getGroup();
				if (res?.data?.data) {
					const groups = res.data.data;
					setGroup(groups);
					const newData: DataType[] = groups.map((item: any) => ({
						id: item.id,
						name: item.name,
						course: item.course?.title || "Unknown",
						status: item.status || "N/A",
						start_date: item.start_date || "N/A",
						end_date: item.end_date || "N/A",
					}));
					setData(newData);
				}
			} catch (error) {
				console.error("Error fetching groups:", error);
				Notification("error", "Failed to fetch groups");
			} finally {
				setLoading(false);
			}
		};
		fetchGroups();
	}, []);
	useEffect(() => {
		const fetchCourse = async () => {
			const res = await courseService.getCourses();
			// console.log(res);
			setCourse(res?.data.courses);
		};
		fetchCourse();
	}, []);
	const handleRowClick = (data: DataType) => {
		setSelectedGroup(data);
		setFormData({
			name: data.name,
			course: data.course,
			start_date: data.start_date,
			end_date: data.end_date,
			status: data.status,
		});
		setIsModalOpen(true);
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

	const handleDeleteGroup = async (id: number) => {
		setSubmitLoading(true);
		try {
			const res = await groupsService.deleteGroup(id);
			console.log(res)
			if (res?.status === 200 || res?.status === 201) {
				Notification("info", "Group successfully deleted");
				setData(data.filter((item) => item.id !== id));
				handleModalClose();
			}
		} catch (error) {
			Notification("error", "Failed to delete group");
			console.error("Error deleting group:", error);
		} finally {
			setSubmitLoading(false);
		}
	};

	const handleEditGroup = async () => {
		if (!selectedGroup) return;
		if (!formData.name || !formData.course || !formData.status) {
			Notification("error", "Please fill all required fields");
			return;
		}
		setSubmitLoading(true);
		try {
			const payload = {
				id: selectedGroup.id,
				name: formData.name,
				course_id: Number(formData.course),
				start_date: formData.start_date,
				end_date: formData.end_date,
				status: formData.status,
			};
			const res = await groupsService.updateGroup(selectedGroup.id, payload);
			if (res?.status === 200 || res?.status === 201) {
				Notification("success", "Group successfully updated");
				setData(
					data.map((item) =>
						item.id === selectedGroup.id ? { ...item, ...payload } : item
					)
				);
				handleModalClose();
			}
		} catch (error) {
			Notification("error", "Failed to update group");
			console.error("Error updating group:", error);
		} finally {
			setSubmitLoading(false);
		}
	};

	const handleCreateGroup = async () => {
		if (!formData.name || !formData.course || !formData.status) {
			Notification("error", "Please fill all required fields");
			return;
		}
		setSubmitLoading(true);
		try {
			const payload = {
				name: formData.name,
				course_id: Number(formData.course),
				start_date: formData.start_date,
				end_date: formData.end_date,
				status: formData.status,
			};
			const res = await groupsService.createGroup(payload);
			if (res?.status === 201) {
				Notification("success", "Group successfully created");
				setData([
					...data,
					{
						id: res.data.id,
						name: payload.name,
						course: formData.course,
						start_date: payload.start_date,
						end_date: payload.end_date,
						status: payload.status,
					},
				]);
				handleModalClose();
			}
		} catch (error) {
			Notification("error", "Failed to create group");
			console.error("Error creating group:", error);
		} finally {
			setSubmitLoading(false);
		}
	};

	const handleInputChange = (field: keyof typeof formData, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleAddNewGroup = () => {
		setSelectedGroup(null);
		setFormData({
			name: "",
			course: "",
			start_date: "",
			end_date: "",
			status: "",
		});
		setIsModalOpen(true);
	};
	return (
		<div style={{ padding: "24px" }}>
			<h1 style={{ marginBottom: "16px", fontWeight: 600, color: "#1a1a1a" }}>
				Groups
			</h1>
			<Table<DataType>
				columns={columns}
				dataSource={data}
				loading={loading}
				rowKey="id"
				style={{ background: "#fff", borderRadius: "8px" }}
				pagination={{ pageSize: 10 }}
				onRow={(data) => ({
					onClick: () => handleRowClick(data),
					style: { cursor: "pointer" },
				})}
			/>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					marginTop: "16px",
				}}
			>
				<Button
					key="create"
					onClick={handleAddNewGroup}
					style={{
						backgroundColor: "rgb(14, 207, 14)",
						color: "#fff",
						borderRadius: "6px",
					}}
				>
					Add New Group
				</Button>
			</div>
			<Modal
				title={selectedGroup ? "Edit Group" : "Create Group"}
				open={isModalOpen}
				onCancel={handleModalClose}
				footer={[
					<Button
						key="close"
						onClick={handleModalClose}
						style={{
							backgroundColor: "rgba(0, 0, 0, 0.5)",
							color: "#fff",
							borderRadius: "6px",
						}}
					>
						Close
					</Button>,
					selectedGroup && (
						<Button
							key="delete"
							onClick={() => handleDeleteGroup(selectedGroup.id)}
							style={{
								backgroundColor: "rgb(255, 0, 0)",
								color: "#fff",
								borderRadius: "6px",
							}}
							loading={submitLoading}
						>
							Delete
						</Button>
					),
					<Button
						key="submit"
						onClick={selectedGroup ? handleEditGroup : handleCreateGroup}
						style={{
							backgroundColor: "rgb(13, 21, 235)",
							color: "#fff",
							borderRadius: "6px",
						}}
						loading={submitLoading}
					>
						{selectedGroup ? "Save Changes" : "Create"}
					</Button>,
				]}
				style={{ maxWidth: "500px" }}
			>
				<div style={{ padding: "16px", lineHeight: "1.8" }}>
					<p>
						<label>
							<strong>Name:</strong>
						</label>
						<Input
							value={formData.name}
							onChange={(e) => handleInputChange("name", e.target.value)}
							style={{
								borderRadius: "3px",
								padding: "6px",
								marginLeft: "5px",
								width: "calc(100% - 80px)",
							}}
						/>
					</p>
					<p>
						<label>
							<strong>Course:</strong>
						</label>
						{/* <Input
							value={formData.course}
							onChange={(e) => handleInputChange("course", e.target.value)}
							style={{
								borderRadius: "3px",
								padding: "6px",
								marginLeft: "5px",
								width: "calc(100% - 80px)",
							}}
						/> */}
						<Select
							onChange={(value) => handleInputChange("course", value)}
							value={formData.course}
							style={{
								borderRadius: "3px",
								marginLeft: "5px",
								width: "calc(100% - 80px)",
							}}
						>
							{course.map((item: any) => (
								<Select.Option key={item.id} value={String(item.id)}>
									{item.title}
								</Select.Option>
							))}
						</Select>
					</p>
					<p>
						<label>
							<strong>Start Date:</strong>
						</label>
						<Input
							type="date"
							value={formData.start_date}
							onChange={(e) => handleInputChange("start_date", e.target.value)}
							style={{
								borderRadius: "3px",
								marginLeft: "5px",
								width: "calc(100% - 80px)",
							}}
						/>
					</p>
					<p>
						<label>
							<strong>End Date:</strong>
						</label>
						<Input
							type="date"
							value={formData.end_date}
							onChange={(e) => handleInputChange("end_date", e.target.value)}
							style={{
								borderRadius: "3px",
								padding: "6px",
								marginLeft: "5px",
								width: "calc(100% - 80px)",
							}}
						/>
					</p>
					<p>
						<label>
							<strong>Status:</strong>
						</label>
						<Select
							value={formData.status}
							onChange={(value) => handleInputChange("status", value)}
							style={{
								borderRadius: "3px",
								marginLeft: "5px",
								width: "calc(100% - 80px)",
							}}
						>
							<Select.Option value="new">New</Select.Option>
							<Select.Option value="active">Active</Select.Option>
							<Select.Option value="end">End</Select.Option>
						</Select>
					</p>
				</div>
			</Modal>
		</div>
	);
};

export default Groups;

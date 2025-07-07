import { groupsService, studentService } from "@service";
import type { TableProps } from "antd";
import { Button, Input, Modal, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Notification } from "../../helpers";

interface DataType {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	phone: string;
	date_of_birth: string;
	is_active: boolean;
	groups: any[];
	events: any[];
}

const columns: TableProps<DataType>["columns"] = [
	{
		title: "Id",
		dataIndex: "id",
		key: "id",
		render: (text) => <a>{text}</a>,
	},
	{
		title: "FirstName",
		dataIndex: "FirstName",
		key: "FirstName",
	},
	{
		title: "LastName",
		dataIndex: "LastName",
		key: "LastName",
	},
	{
		title: "Email",
		dataIndex: "email",
		key: "email",
	},
	{
		title: "Password",
		dataIndex: "Password",
		key: "Password",
	},
	{
		title: "Phone",
		dataIndex: "Phone",
		key: "Phone",
	},
	{
		title: "DateOfBith",
		dataIndex: "DateOfBith",
		key: "DateOfBith",
	},
	{
		title: "IsActive",
		dataIndex: "IsActive",
		key: "IsActive",
	},
	{
		title: "Groups",
		dataIndex: "Groups",
		key: "Groups",
	},
	{
		title: "Events",
		dataIndex: "Events",
		key: "Events",
	},
];

const StudentsTbl: React.FC = () => {
	const [student, setStudent] = useState<DataType[]>([]);
	const [data, setData] = useState<DataType[]>([]);
	const [loading, setLoading] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedStudent, setSelectedStudent] = useState<DataType | null>(null);
	const [formData, setFormData] = useState<DataType>({
		id: 0,
		first_name: "",
		last_name: "",
		email: "",
		password: "",
		phone: "",
		date_of_birth: "",
		is_active: false,
		groups: [],
		events: [],
	});
	const [submitLoading, setSubmitLoading] = useState(false);

	useEffect(() => {
		const fetchGroups = async () => {
			setLoading(true);
			try {
				const res = await studentService.getStudent();
				if (res) {
					const students = res.data.students;
					setStudent(students);
					const newData: DataType[] = students.map((item: any) => ({
						id: item.id || "N|A",
						first_name: item.first_name || "N|A",
						last_name: item.last_name || "N|A",
						email: item.email || "N|A",
						password: item.password || "N|A",
						phone: item.phone || "N|A",
						date_of_birth: item.date_of_birth || "N|A",
						is_active: item.is_active || "N|A",
						groups: item.groups || "N|A",
						events: item.events || "N|A",
					}));
					setData(newData);
				}
			} catch (error) {
				console.error("Error fetching students:", error);
				Notification("error", "Failed to fetch students");
			} finally {
				setLoading(false);
			}
		};
		fetchGroups();
	}, []);
	const handleRowClick = (data: DataType) => {
		setSelectedStudent(data);
		setFormData({
			id: data.id,
			first_name: data.first_name,
			last_name: data.last_name,
			email: data.email,
			password: data.password,
			phone: data.phone,
			date_of_birth: data.date_of_birth,
			is_active: data.is_active,
			groups: data.groups,
			events: data.events,
		});
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
		setSelectedStudent(null);
		setFormData({
			id: 0,
			first_name: "",
			last_name: "",
			email: "",
			password: "",
			phone: "",
			date_of_birth: "",
			is_active: false,
			groups: [],
			events: [],
		});
	};

	const handleDeleteGroup = async (id: number) => {
		setSubmitLoading(true);
		try {
			const res = await studentService.deleteStudent(id);
			if (res?.status === 200 || res?.status === 201) {
				Notification("info", "Student successfully deleted");
				setData(data.filter((item) => item.id !== id));
				handleModalClose();
			}
		} catch (error) {
			Notification("error", "Failed to delete stuent");
			console.error("Error deleting student:", error);
		} finally {
			setSubmitLoading(false);
		}
	};

	const handleEditStudent = async () => {
		if (!selectedStudent) return;
		if (!formData.email || !formData.first_name || !formData.phone) {
			Notification("error", "Please fill all required fields");
			return;
		}
		setSubmitLoading(true);
		try {
			const payload = {
				first_name: formData.first_name,
				last_name: formData.last_name,
				email: formData.email,
				password: formData.password,
				phone: formData.phone,
				date_of_birth: formData.date_of_birth,
				is_active: formData.is_active,
				groups: formData.groups,
				events: formData.events,
			};
			const res = await studentService.updateStudent(formData.id, payload);
			if (res?.status === 200 || res?.status === 201) {
				Notification("success", "Student successfully updated");
				setData(
					data.map((item) =>
						item.id === selectedStudent.id ? { ...item, ...payload } : item
					)
				);
				handleModalClose();
			}
		} catch (error) {
			Notification("error", "Failed to update student");
			console.error("Error updating student:", error);
		} finally {
			setSubmitLoading(false);
		}
	};

	const handleCreateStudent = async () => {
		if (!formData.email || !formData.password || !formData.phone) {
			Notification("error", "Please fill all required fields");
			return;
		}
		setSubmitLoading(true);
		try {
			const payload = {
				id: formData.id,
				first_name: formData.first_name,
				last_name: formData.last_name,
				email: formData.email,
				password: formData.password,
				phone: formData.phone,
				date_of_birth: formData.date_of_birth,
				is_active: formData.is_active,
				groups: formData.groups,
				events: formData.events,
			};
			const res = await groupsService.createGroup(payload);
			if (res?.status === 201) {
				Notification("success", "Group successfully created");
				setData([
					...data,
					{
						id: res.data.id,
						first_name: payload.first_name,
						last_name: payload.last_name,
						email: payload.email,
						password: payload.password,
						phone: payload.phone,
						date_of_birth: payload.date_of_birth,
						is_active: payload.is_active,
						groups: payload.groups,
						events: payload.events,
					},
				]);
				handleModalClose();
			}
		} catch (error) {
			Notification("error", "Failed to create student");
			console.error("Error creating student:", error);
		} finally {
			setSubmitLoading(false);
		}
	};

	const handleInputChange = (field: keyof typeof formData, value: string | boolean) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleAddNewGroup = () => {
		setSelectedStudent(null);
		setFormData({
			id: 0,
			first_name: "",
			last_name: "",
			email: "",
			password: "",
			phone: "",
			date_of_birth: "",
			is_active: false,
			groups: [],
			events: [],
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
					Add New Student
				</Button>
			</div>
			<Modal
				title={selectedStudent ? "Edit Student" : "Create Student"}
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
					selectedStudent && (
						<Button
							key="delete"
							onClick={() => handleDeleteGroup(selectedStudent.id)}
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
						onClick={selectedStudent ? handleEditStudent : handleCreateStudent}
						style={{
							backgroundColor: "rgb(13, 21, 235)",
							color: "#fff",
							borderRadius: "6px",
						}}
						loading={submitLoading}
					>
						{selectedStudent ? "Save Changes" : "Create"}
					</Button>,
				]}
				style={{ maxWidth: "500px" }}
			>
				<div style={{ padding: "16px", lineHeight: "1.8" }}>
					<p>
						<label>
							<strong>First Name:</strong>
						</label>
						<Input
							value={formData.first_name}
							onChange={(e) => handleInputChange("first_name", e.target.value)}
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
							<strong>Last Name:</strong>
						</label>
						<Input
							value={formData.last_name}
							onChange={(e) => handleInputChange("last_name", e.target.value)}
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
							<strong>Email:</strong>
						</label>
						<Input
							value={formData.email}
							onChange={(e) => handleInputChange("email", e.target.value)}
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
							<strong>Password:</strong>
						</label>
						<Input
							value={formData.password}
							onChange={(e) => handleInputChange("password", e.target.value)}
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
							<strong>Phone:</strong>
						</label>
						<Input
							value={formData.phone}
							onChange={(e) => handleInputChange("phone", e.target.value)}
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
							<strong>DateOfBirth:</strong>
						</label>
						<Input
						type='date'
							value={formData.date_of_birth}
							onChange={(e) =>
								handleInputChange("date_of_birth", e.target.value)
							}
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
							<strong>IsActive:</strong>
						</label>
						<Select
							onChange={(value) => handleInputChange("is_active", value)}
							value={formData.is_active}
							style={{
								borderRadius: "3px",
								marginLeft: "5px",
								width: "calc(100% - 80px)",
							}}
						>
							<Select.Option key="true" value={true}>
								True
							</Select.Option>
							<Select.Option key="false" value={false}>
								False
							</Select.Option>
						</Select>
					</p>
					<p>
						<label>
							<strong>Groups:</strong>
						</label>
						<Input
							type="text"
							value={formData.groups}
							readOnly={true}
							style={{
								borderRadius: "3px",
								marginLeft: "5px",
								width: "calc(100% - 80px)",
							}}
						/>
					</p>
					<p>
						<label>
							<strong>Events:</strong>
						</label>
						<Input
							type="text"
							value={formData.events}
							readOnly={true}
							style={{
								borderRadius: "3px",
								marginLeft: "5px",
								width: "calc(100% - 80px)",
							}}
						/>
					</p>
				</div>
			</Modal>
		</div>
	);
};

export default StudentsTbl;

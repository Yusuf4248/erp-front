import type { TableProps } from "antd";
import { Button, Input, Modal, Select, Table } from "antd";
import { createStyles } from "antd-style";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Notification } from "../../helpers";
import { useStudents } from "../../hooks/useStudents";

interface StudentType {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	phone: string;
	password_hash: string;
	gender: string;
	date_of_birth: string;
	lidId: number;
	eventsId: number;
	groupsId: number;
}

const useStyle = createStyles(({ css }) => {
	return {
		customTable: css`
			.ant-table {
				.ant-table-container {
					.ant-table-body,
					.ant-table-content {
						scrollbar-width: thin;
						scrollbar-color: #eaeaea transparent;
						scrollbar-gutter: stable;
					}
				}
			}
		`,
	};
});

const Students: React.FC = () => {
	const { styles } = useStyle();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedStudent, setSelectedStudent] = useState<StudentType | null>(
		null
	);
	const [item, setFormData] = useState({
		first_name: "",
		last_name: "",
		email: "",
		phone: "",
		password_hash: "",
		gender: "",
		date_of_birth: "",
		lidId: 0,
		eventsId: 0,
		groupsId: 0,
	});

	const { data, useStudentCreate, useStudentUpdate, useStudentDelete } =
		useStudents();
	const { mutate: createStudent, isPending: isCreating } = useStudentCreate();
	const { mutate: updateStudent, isPending: isUpdating } = useStudentUpdate();
	const { mutate: deleteStudent, isPending: isDeleting } = useStudentDelete();

	const columns: TableProps<StudentType>["columns"] = [
		{
			title: "First Name",
			dataIndex: "first_name",
			key: "firstname",
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
			dataIndex: "password_hash",
			key: "passwordhash",
			width: 150,
			render: (text) => (text ? `${text.slice(0, 5)}...` : "N/A"),
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
		{
			title: "Actions",
			key: "actions",
			width: 170,
			fixed: "right",
			render: (_, record) => (
				<div style={{ display: "flex", gap: "8px" }}>
					<Button
						type="primary"
						onClick={() => handleEditClick(record)}
						icon={<FaEdit />}
						style={{ width: 75 }}
					>
						Edit
					</Button>
					<Button
						danger
						onClick={() => handleDeleteClick(record.id)}
						loading={isDeleting}
						style={{ backgroundColor: "red", color: "#fff", width: 75 }}
						icon={<MdDelete />}
					>
						Delete
					</Button>
				</div>
			),
		},
	];
	const handleEditClick = (student: StudentType) => {
		setSelectedStudent(student);
		setFormData({
			first_name: student.first_name,
			last_name: student.last_name,
			email: student.email,
			phone: student.phone,
			password_hash: student.password_hash,
			gender: student.gender,
			date_of_birth: student.date_of_birth,
			lidId: student.lidId,
			eventsId: student.eventsId,
			groupsId: student.groupsId,
		});
		setIsModalOpen(true);
	};
	const handleDeleteClick = (branchId: number) => {
		Modal.confirm({
			title: "Delete Student",
			content: "Are you sure do you want to delete this student?",
			okText: "Yes",
			cancelText: "No",
			onOk: () =>
				deleteStudent(branchId, {
					onSuccess: () =>
						Notification("success", "Student deleted successfully"),
				}),
		});
	};
	const handleModalClose = () => {
		setIsModalOpen(false);
		setSelectedStudent(null);
		setFormData({
			first_name: "",
			last_name: "",
			email: "",
			phone: "",
			password_hash: "",
			gender: "",
			date_of_birth: "",
			lidId: 0,
			eventsId: 0,
			groupsId: 0,
		});
	};
	const handleInputChange = (field: keyof typeof item, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};
	const handleAddNewGroup = () => {
		setSelectedStudent(null);
		setIsModalOpen(true);
	};
	const handleCreateGroup = () => {
		if (!item.email || !item.password_hash || !item.phone) {
			Notification("error", "Feel all required area.");
			return;
		}
		const payload = {
			first_name: item.first_name,
			last_name: item.last_name,
			email: item.email,
			phone: item.phone,
			password_hash: item.password_hash,
			confirm_password: item.password_hash,
			gender: item.gender,
			date_of_birth: item.date_of_birth,
			lidId: null,
			eventsId: null,
			groupsId: null,
		};
		createStudent(payload, {
			onSuccess: () => {
				Notification("success", "Student created successfully.");
				handleModalClose();
			},
		});
	};
	const handleUpdateGroup = () => {
		if (!selectedStudent) return;
		if (!item.email || !item.phone || !item.password_hash) {
			Notification("error", "Feel all required area.");
			return;
		}
		const payload = {
			first_name: item.first_name,
			last_name: item.last_name,
			email: item.email,
			phone: item.phone,
			password_hash: item.password_hash,
			gender: item.gender,
			date_of_birth: item.date_of_birth,
			// lidId: formData.lidId,
			// eventsId: formData.eventsId,
			// groupsId: formData.groupsId,
		};
		updateStudent(
			{ id: selectedStudent.id, data: payload },
			{
				onSuccess: () => {
					Notification("success", "Student updated successfully");
					handleModalClose();
				},
			}
		);
	};

	const datas = data?.data?.students;
	const tableData = datas
		? datas.map((item: any) => ({
				id: item.id,
				first_name: item.first_name || "N/A",
				last_name: item.last_name || "N/A",
				email: item.email || "N/A",
				phone: item.phone || "N/A",
				password_hash: item.password_hash || "N/A",
				gender: item.gender || "N/A",
				date_of_birth: item.date_of_birth || "N/A",
				lidId: item.lidId || "N/A",
				eventsId: item.eventsId || "N/A",
				groupsId: item.groupsId || "N/A",
		  }))
		: [];

	return (
		<div style={{ padding: 24 }}>
			<div
				style={{
					marginBottom: 16,
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<h1 style={{ fontSize: 24, margin: 0 }}>Students</h1>
				<Button type="primary" onClick={handleAddNewGroup}>
					Add new student
				</Button>
			</div>

			<Table
				columns={columns}
				dataSource={tableData}
				rowKey="id"
				pagination={{ pageSize: 10 }}
				loading={!data}
				scroll={{ x: 1500 }}
				className={styles.customTable}
				bordered
				size="middle"
			/>

			<Modal
				title={selectedStudent ? "Edit Student" : "Add new student"}
				open={isModalOpen}
				onCancel={handleModalClose}
				footer={[
					<Button key="cancel" onClick={handleModalClose}>
						Cancel
					</Button>,
					selectedStudent ? (
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
					<label>F Name</label>
					<Input
						value={item.first_name}
						onChange={(e) => handleInputChange("first_name", e.target.value)}
						placeholder="First Name..."
					/>
				</div>
				<div style={{ marginBottom: 16 }}>
					<label>L Name</label>
					<Input
						value={item.last_name}
						onChange={(e) => handleInputChange("last_name", e.target.value)}
						placeholder="Last Name..."
					/>
				</div>

				<div style={{ marginBottom: 16 }}>
					<label>Email</label>
					<Input
						style={{ width: "100%" }}
						value={item.email}
						onChange={(e) => handleInputChange("email", e.target.value)}
						placeholder="Email..."
					></Input>
				</div>

				<div style={{ marginBottom: 16 }}>
					<label>Phone</label>
					<Input
						type="text"
						value={item.phone}
						onChange={(e) => handleInputChange("phone", e.target.value)}
						placeholder="Phone Number..."
					/>
				</div>

				<div style={{ marginBottom: 16 }}>
					<label>Password</label>
					<Input
						value={item.password_hash}
						type="password"
						onChange={(e) => handleInputChange("password_hash", e.target.value)}
						placeholder="Password..."
					/>
				</div>

				<div style={{ marginBottom: 16 }}>
					<label>Gender</label>
					<Select
						style={{ width: "100%" }}
						value={item.gender}
						onChange={(value) => handleInputChange("gender", value)}
						placeholder="Select gender..."
					>
						<Select.Option value="male">Male</Select.Option>
						<Select.Option value="female">Female</Select.Option>
					</Select>
				</div>
				<div style={{ marginBottom: 16 }}>
					<label>Birth Date</label>
					<Input
						type="date"
						value={item.date_of_birth}
						onChange={(e) => handleInputChange("date_of_birth", e.target.value)}
						placeholder="Choose date..."
					/>
				</div>
			</Modal>
		</div>
	);
};
export default Students;

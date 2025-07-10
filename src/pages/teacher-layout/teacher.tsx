import type { TableProps } from "antd";
import { Button, Input, Modal, Select, Table } from "antd";
import { createStyles } from "antd-style";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Notification } from "../../helpers";
import { useBranches } from "../../hooks/useBranches";
import { useTeachers } from "../../hooks/useTeacher";

interface TeacherType {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	password_hash: string;
	phone: string;
	role: string;
	branchId: [];
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

const Teachers: React.FC = () => {
	const { styles } = useStyle();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedTeacher, setSelectedTeacher] = useState<TeacherType | null>(
		null
	);
	const [item, setFormData] = useState({
		first_name: "",
		last_name: "",
		email: "",
		password: "",
		phone: "",
		role: "",
		branchId: [],
	});

	const { data, useTeacherCreate, useTeacherUpdate, useTeacherDelete } =
		useTeachers();
	const { data: brachData } = useBranches();
	const { mutate: createTeacher, isPending: isCreating } = useTeacherCreate();
	const { mutate: updateTeacher, isPending: isUpdating } = useTeacherUpdate();
	const { mutate: deleteTeacher, isPending: isDeleting } = useTeacherDelete();
	const [branchIdList, setBranchIdList] = useState<number[]>([]);
	const handleChangeBrnachId = (value: string[]) => {
		setBranchIdList(value.map(Number));
	};
	const columns: TableProps<TeacherType>["columns"] = [
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
			dataIndex: "password_hash",
			key: "passwordhash",
			width: 150,
			render: (text) => (text ? `${text.slice(0, 5)}...` : "N/A"),
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

	const handleEditClick = (teacher: TeacherType) => {
		setSelectedTeacher(teacher);
		setFormData({
			first_name: teacher.first_name,
			last_name: teacher.last_name,
			email: teacher.email,
			phone: teacher.phone,
			password: teacher.password_hash,
			role: teacher.role,
			branchId: teacher.branchId,
		});
		setIsModalOpen(true);
	};
	const handleDeleteClick = (branchId: number) => {
		Modal.confirm({
			title: "Delete Teacher",
			content: "Are you sure do you want to delete this teacher?",
			okText: "Yes",
			cancelText: "No",
			onOk: () =>
				deleteTeacher(branchId, {
					onSuccess: () =>
						Notification("success", "Teacher deleted successfully"),
				}),
		});
	};
	const handleModalClose = () => {
		setIsModalOpen(false);
		setSelectedTeacher(null);
		setFormData({
			first_name: "",
			last_name: "",
			email: "",
			phone: "",
			password: "",
			role: "",
			branchId: [],
		});
	};
	const handleInputChange = (
		field: keyof typeof item,
		value: string | string[]
	) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};
	const handleAddNewGroup = () => {
		setSelectedTeacher(null);
		setIsModalOpen(true);
	};
	const handleCreateGroup = () => {
		if (!item.email || !item.password || !item.first_name) {
			Notification("error", "Feel all required area.");
			return;
		}
		const payload = {
			first_name: item.first_name,
			last_name: item.last_name,
			email: item.email,
			phone: item.phone,
			password: item.password,
			// confirm_password: item.password,
			role: item.role,
			branchId: [...branchIdList],
		};
		createTeacher(payload, {
			onSuccess: () => {
				Notification("success", "Teacher created successfully.");
				handleModalClose();
			},
		});
		branchIdList.length = 0;
	};
	const handleUpdateGroup = () => {
		if (!selectedTeacher) return;
		if (!item.email || !item.password || !item.first_name) {
			Notification("error", "Feel all required area.");
			return;
		}
		const payload = {
			first_name: item.first_name,
			last_name: item.last_name,
			email: item.email,
			phone: item.phone,
			// password_hash: item.password,
			role: item.role,
			branchId: [Number(item.branchId)],
		};
		updateTeacher(
			{ id: selectedTeacher.id, data: payload },
			{
				onSuccess: () => {
					Notification("success", "Teacher updated successfully");
					handleModalClose();
				},
			}
		);
	};

	const datas = data?.data?.teachers;
	const tableData = datas
		? datas.map((item: any) => ({
				id: item.id,
				first_name: item.first_name || "N/A",
				last_name: item.last_name || "N/A",
				email: item.email || "N/A",
				phone: item.phone || "N/A",
				password_hash: item.password_hash || "N/A",
				role: item.role || "N/A",
				branchId: item.branchId || "N/A",
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
				<h1 style={{ fontSize: 24, margin: 0 }}>Teachers</h1>
				<Button type="primary" onClick={handleAddNewGroup}>
					Add new teacher
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
				title={selectedTeacher ? "Edit Teacher" : "Add new teacher"}
				open={isModalOpen}
				onCancel={handleModalClose}
				footer={[
					<Button key="cancel" onClick={handleModalClose}>
						Cancel
					</Button>,
					selectedTeacher ? (
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
						value={item.password}
						type="password"
						onChange={(e) => handleInputChange("password", e.target.value)}
						placeholder="Password..."
					/>
				</div>

				<div style={{ marginBottom: 16 }}>
					<label>Role</label>
					<Select
						style={{ width: "100%" }}
						value={item.role}
						onChange={(value) => handleInputChange("role", value)}
						placeholder="Select role..."
					>
						<Select.Option value="main teacher">Main</Select.Option>
						<Select.Option value="assistant teacher">Assistant</Select.Option>
					</Select>
				</div>

				<div style={{ marginBottom: 16 }}>
					<label>Branches</label>
					<Select
						mode="multiple"
						style={{ width: "100%" }}
						value={item.branchId}
						onChange={(value) => {
							handleChangeBrnachId(value);
							handleInputChange("branchId", value);
						}}
						options={brachData?.data?.branch.map((branch: any) => {
							return { label: branch.name, value: branch.id };
						})}
						placeholder="Select branch..."
					>
						{brachData?.data?.branch.map((branch: any) => (
							<Select.Option key={branch.id} value={branch.id}>
								{branch.name}
							</Select.Option>
						))}
					</Select>
				</div>
			</Modal>
		</div>
	);
};
export default Teachers;

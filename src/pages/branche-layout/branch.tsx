import type { TableProps } from "antd";
import { Button, Input, Modal, Table } from "antd";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Notification } from "../../helpers";
import { useBranches } from "../../hooks/useBranches";
interface BranchType {
	id: number;
	name: string;
	address: string;
	call_number: string;
	teachers: [];
}
const Branches: React.FC = () => {
	// const [teachers, setTeachers] = useState<any[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedBranch, setSelectedBranch] = useState<BranchType | null>(null);
	const [formData, setFormData] = useState({
		name: "",
		address: "",
		call_number: "",
		teachers: [],
	});
	const { data, useBranchCreate, useBranchUpdate, useBranchDelete } =
		useBranches();
	const { mutate: createBranch, isPending: isCreating } = useBranchCreate();
	const { mutate: updateBranch, isPending: isUpdating } = useBranchUpdate();
	const { mutate: deleteBranch, isPending: isDeleting } = useBranchDelete();
	const columns: TableProps<BranchType>["columns"] = [
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
						<FaEdit />
						Edit
					</Button>
					<Button
						danger
						onClick={() => handleDeleteClick(record.id)}
						loading={isDeleting}
						style={{ backgroundColor: "red", color: "#fff" }}
					>
						<MdDelete />
						Delete
					</Button>
				</div>
			),
		},
	];
	const handleEditClick = (branch: BranchType) => {
		setSelectedBranch(branch);
		setFormData({
			name: branch.name,
			address: branch.address,
			call_number: branch.call_number,
			teachers: branch.teachers,
		});
		setIsModalOpen(true);
	};
	const handleDeleteClick = (branchId: number) => {
		Modal.confirm({
			title: "Delete branch",
			content: "Are you sure do you want to delete this branch?",
			okText: "Yes",
			cancelText: "No",
			onOk: () =>
				deleteBranch(branchId, {
					onSuccess: () =>
						Notification("success", "Branch deleted successfully"),
				}),
		});
	};
	const handleModalClose = () => {
		setIsModalOpen(false);
		setSelectedBranch(null);
		setFormData({
			name: "",
			address: "",
			call_number: "",
			teachers: [],
		});
	};
	const handleInputChange = (field: keyof typeof formData, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};
	const handleAddNewGroup = () => {
		setSelectedBranch(null);
		setIsModalOpen(true);
	};
	const handleCreateGroup = () => {
		if (!formData.name || !formData.address || !formData.call_number) {
			Notification("error", "Feel all required area.");
			return;
		}
		const payload = {
			name: formData.name,
			address: formData.address,
			call_number: formData.call_number,
			// teachers: formData.teachers,
		};
		createBranch(payload, {
			onSuccess: () => {
				Notification("success", "Branch created successfully.");
				handleModalClose();
			},
		});
	};
	const handleUpdateGroup = () => {
		if (!selectedBranch) return;
		if (!formData.name || !formData.call_number || !formData.address) {
			Notification("error", "Feel all required area.");
			return;
		}
		const payload = {
			// id: selectedGroup.id,
			name: formData.name,
			address: formData.address,
			call_number: formData.call_number,
			// teachers: formData.teachers,
		};
		updateBranch(
			{ id: selectedBranch.id, data: payload },
			{
				onSuccess: () => {
					Notification("success", "Branch updated successfully");
					handleModalClose();
				},
			}
		);
	};
	const datas = data?.data?.branch;
	const tableData = datas
		? datas.map((item: any) => ({
				id: item.id,
				name: item.name || "N/A",
				address: item.address || "N/A",
				call_number: item.call_number || "N/A",
				teachers: item.teachers || "N/A",
		  }))
		: [];
	return (
		<div style={{ padding: 24 }}>
			<div style={{ marginBottom: "-38px", textAlign: "left" }}>
				<span style={{ marginTop: "100px", fontSize: "40px" }}>Branches</span>
			</div>

			<div style={{ marginBottom: 16, textAlign: "right" }}>
				<Button type="primary" onClick={handleAddNewGroup}>
					Add new branch
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
				title={selectedBranch ? "Edit Branch" : "Add new branch"}
				open={isModalOpen}
				onCancel={handleModalClose}
				footer={[
					<Button key="cancel" onClick={handleModalClose}>
						Cancel
					</Button>,
					selectedBranch ? (
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
						placeholder="Branch name..."
					/>
				</div>

				<div style={{ marginBottom: 16 }}>
					<label>Address</label>
					<Input
						style={{ width: "100%" }}
						value={formData.address}
						onChange={(e) => handleInputChange("address", e.target.value)}
						placeholder="Address..."
					></Input>
				</div>

				<div style={{ marginBottom: 16 }}>
					<label>Call Number</label>
					<Input
						type="text"
						value={formData.call_number}
						onChange={(e) => handleInputChange("call_number", e.target.value)}
						placeholder="Call Number..."
					/>
				</div>

				{/* <div style={{ marginBottom: 16 }}>
					<label>Teachers</label>
					<Select
						style={{ width: "100%" }}
						value={formData.teachers}
						onChange={(value) => handleInputChange("teachers", value)}
						placeholder="Select status"
					>
						<Select.Option value="new">New</Select.Option>
						<Select.Option value="active">Active</Select.Option>
						<Select.Option value="end">End</Select.Option>
					</Select>
				</div> */}
			</Modal>
		</div>
	);
};
export default Branches;

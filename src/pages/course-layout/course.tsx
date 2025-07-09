import type { TableProps } from "antd";
import { Button, Input, Modal, Select, Table } from "antd";
import { createStyles } from "antd-style";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Notification } from "../../helpers";
import { useCourses } from "../../hooks/useCourses";

interface CourseType {
	id: number;
	title: string;
	description: string;
	price: number;
	duration: string;
	lesson_in_a_week: string;
	lesson_duration: string;
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

const Courses: React.FC = () => {
	const { styles } = useStyle();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedCourse, setSelectedStudent] = useState<CourseType | null>(
		null
	);
	const [item, setFormData] = useState({
		title: "",
		description: "",
		price: 0,
		duration: "",
		lesson_in_a_week: "",
		lesson_duration: "",
	});

	const { data, useCourseCreate, useCourseUpdate, useCourseDelete } =
		useCourses();
	const { mutate: createCourse, isPending: isCreating } = useCourseCreate();
	const { mutate: updateCourse, isPending: isUpdating } = useCourseUpdate();
	const { mutate: deleteCourse, isPending: isDeleting } = useCourseDelete();

	const columns: TableProps<CourseType>["columns"] = [
		{
			title: "Title",
			dataIndex: "title",
			key: "title",
			// width: 150,
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "description",
			// width: 150,
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
			// width: 150,
		},
		{
			title: "Lesson Duration",
			dataIndex: "lesson_duration",
			key: "gender",
			// width: 150,
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
	const handleEditClick = (course: CourseType) => {
		setSelectedStudent(course);
		setFormData({
			title: course.title,
			description: course.description,
			price: course.price,
			duration: course.duration,
			lesson_in_a_week: course.lesson_in_a_week,
			lesson_duration: course.lesson_duration,
		});
		setIsModalOpen(true);
	};
	const handleDeleteClick = (branchId: number) => {
		Modal.confirm({
			title: "Delete Course",
			content: "Are you sure do you want to delete this course?",
			okText: "Yes",
			cancelText: "No",
			onOk: () =>
				deleteCourse(branchId, {
					onSuccess: () =>
						Notification("success", "Course deleted successfully"),
				}),
		});
	};
	const handleModalClose = () => {
		setIsModalOpen(false);
		setSelectedStudent(null);
		setFormData({
			title: "",
			description: "",
			price: 0,
			duration: "",
			lesson_in_a_week: "",
			lesson_duration: "",
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
		if (!item.title || !item.price || !item.duration) {
			Notification("error", "Feel all required area.");
			return;
		}
		const payload = {
			title: item.title,
			description: item.description,
			price: Number(item.price),
			duration: item.duration,
			lesson_in_a_week: Number(item.lesson_in_a_week),
			lesson_duration: item.lesson_duration,
		};
		createCourse(payload, {
			onSuccess: () => {
				Notification("success", "Course created successfully.");
				handleModalClose();
			},
		});
	};
	const handleUpdateGroup = () => {
		if (!selectedCourse) return;
		if (!item.title || !item.price || !item.duration) {
			Notification("error", "Feel all required area.");
			return;
		}
		const payload = {
			title: item.title,
			description: item.description,
			price: Number(item.price),
			duration: item.duration,
			lesson_in_a_week: Number(item.lesson_in_a_week),
			lesson_duration: item.lesson_duration,
		};
		updateCourse(
			{ id: selectedCourse.id, data: payload },
			{
				onSuccess: () => {
					Notification("success", "Course updated successfully");
					handleModalClose();
				},
			}
		);
	};

	const datas = data?.data?.courses;
	const tableData = datas
		? datas.map((item: any) => ({
				id: item.id,
				title: item.title || "N/A",
				description: item.description || "N/A",
				price: item.price || "N/A",
				duration: item.duration,
				lessons_in_a_week: item.lessons_in_a_week || "N/A",
				lesson_duration: item.lesson_duration || "N/A",
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
				<h1 style={{ fontSize: 24, margin: 0 }}>Courses</h1>
				<Button type="primary" onClick={handleAddNewGroup}>
					Add new course
				</Button>
			</div>

			<Table
				columns={columns}
				dataSource={tableData}
				rowKey="id"
				pagination={{ pageSize: 10 }}
				loading={!data}
				scroll={{ x: 500 }}
				className={styles.customTable}
				bordered
				size="middle"
			/>

			<Modal
				title={selectedCourse ? "Edit Course" : "Add new course"}
				open={isModalOpen}
				onCancel={handleModalClose}
				footer={[
					<Button key="cancel" onClick={handleModalClose}>
						Cancel
					</Button>,
					selectedCourse ? (
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
					<label>Title</label>
					<Input
						value={item.title}
						onChange={(e) => handleInputChange("title", e.target.value)}
						placeholder="Title..."
					/>
				</div>
				<div style={{ marginBottom: 16 }}>
					<label>Description</label>
					<Input
						value={item.description}
						onChange={(e) => handleInputChange("description", e.target.value)}
						placeholder="Description..."
					/>
				</div>

				<div style={{ marginBottom: 16 }}>
					<label>Price</label>
					<Input
						style={{ width: "100%" }}
						value={item.price}
						onChange={(e) => handleInputChange("price", e.target.value)}
						placeholder="Price..."
					></Input>
				</div>

				<div style={{ marginBottom: 16 }}>
					<label>Duration</label>
					<Select
						style={{ width: "100%" }}
						value={item.duration}
						onChange={(value) => handleInputChange("duration", value)}
						placeholder="Select duration..."
					>
						<Select.Option value="6 month">6 month</Select.Option>
						<Select.Option value="8 month">8 month</Select.Option>
					</Select>
				</div>
				<div style={{ marginBottom: 16 }}>
					<label>Lesson in week</label>
					<Select
						style={{ width: "100%" }}
						value={item.lesson_in_a_week}
						onChange={(value) => handleInputChange("lesson_in_a_week", value)}
						placeholder="Select week time..."
					>
						<Select.Option value="3">3</Select.Option>
						<Select.Option value="5">5</Select.Option>
					</Select>
				</div>
				<div style={{ marginBottom: 16 }}>
					<label>Lesson duration</label>
					<Select
						style={{ width: "100%" }}
						value={item.lesson_duration}
						onChange={(value) => handleInputChange("lesson_duration", value)}
						placeholder="Select duration..."
					>
						<Select.Option value="180 minutes">2 hours</Select.Option>
						<Select.Option value="270 minutes">4.5 hours</Select.Option>
					</Select>
				</div>
			</Modal>
		</div>
	);
};
export default Courses;

import { EditOutlined } from "@ant-design/icons";
import { PopConfirm, TeacherColumn } from "@components";
import { useGeneral, useTeachers } from "@hooks";
import type { TeacherType } from "@types";
import {
	Button,
	Space,
	Table,
	type TablePaginationConfig,
	type TableProps,
} from "antd";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TeacherModal from "./modal";
const Teachers = () => {
	const [open, setOpen] = useState(false);
	const [update, setUpdate] = useState<TeacherType | null>(null);
	const location = useLocation();
	const { handlePagination } = useGeneral();
	const [params, setParams] = useState({
		page: 1,
		limit: 10,
	});
	const { data, useTeacherDelete } = useTeachers(params);
	const { mutate: deleteTeacher, isPending: isDeleting } = useTeacherDelete();
	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const page = searchParams.get("page") || "1";
		const limit = searchParams.get("limit") || "10";
		if (page && limit) {
			setParams({
				page: Number(page),
				limit: Number(limit),
			});
		}
	}, [location.search]);
	const deleteItem = (id: number) => {
		deleteTeacher(id);
	};
	const updateItem = (teacherData: TeacherType) => {
		setOpen(true);
		setUpdate(teacherData);
	};
	const toggle = () => {
		setOpen(!open);
		if (update) {
			setUpdate(null);
		}
	};
	const handleTableChange = (pagination: TablePaginationConfig) => {
		handlePagination({ pagination, setParams });
	};
	const columns: TableProps<TeacherType>["columns"] = [
		...(TeacherColumn ?? []),
		{
			title: "Action",
			key: "action",
			fixed: "right",
			render: (_, record: TeacherType) => (
				<Space size="middle">
					<Button
						type={"primary"}
						size="small"
						onClick={() => updateItem(record)}
					>
						<EditOutlined />
					</Button>
					<PopConfirm
						handleDelete={() => deleteItem(record.id)}
						loading={isDeleting}
					/>
				</Space>
			),
		},
	];
	return (
		<>
			{open && <TeacherModal open={open} toggle={toggle} update={update} />}
			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<h1 className="mb-4 text-1xl font-bold tracking-tight text-gray-900 md:text-3xl lg:text-1xl dark:text-dark">
					Teachers
				</h1>
				<Button className="mb-4" type="primary" onClick={() => setOpen(true)}>
					Add New Teacher
				</Button>
			</div>
			<Table<TeacherType>
				columns={columns}
				dataSource={data?.data.teachers}
				rowKey={(record) => record.id}
				scroll={{ x: "max-content" }}
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
export default Teachers;

import { EditOutlined } from "@ant-design/icons";
import { CourseColumns, PopConfirm } from "@components";
import { useCourses, useGeneral } from "@hooks";
import type { CourseType } from "@types";
import {
	Button,
	Space,
	Table,
	type TablePaginationConfig,
	type TableProps,
} from "antd";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CourseModal from "./modal";
const Courses: React.FC = () => {
	const [open, setOpen] = useState(false);
	const [update, setUpdate] = useState<CourseType | null>(null);
	const location = useLocation();
	const { handlePagination } = useGeneral();
	const [params, setParams] = useState({
		page: 1,
		limit: 10,
	});
	const { data, useCourseDelete } = useCourses(params);
	const { mutate: deleteGroup, isPending: isDeleting } = useCourseDelete();
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
		// navigate({search:`?page=${page}&limit=${limit}`});
	}, [location.search]);
	const deleteItem = (id: number) => {
		deleteGroup(id);
	};
	const updateItem = (courseData: CourseType) => {
		setOpen(true);
		setUpdate(courseData);
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
	const columns: TableProps<CourseType>["columns"] = [
		...(CourseColumns ?? []),
		{
			title: "Action",
			key: "action",
			render: (_, record: CourseType) => (
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
			{open && <CourseModal open={open} toggle={toggle} update={update} />}
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2 sm:gap-0">
				<h1 className="text-lg sm:text-2xl font-bold tracking-tight text-gray-900">
					Course
				</h1>
				<Button
					className="w-full sm:w-auto"
					type="primary"
					onClick={() => setOpen(true)}
				>
					Add New Course
				</Button>
			</div>
			<div className="overflow-x-auto">
				<Table<CourseType>
					columns={columns}
					dataSource={data?.data.courses}
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
			</div>
		</>
	);
};
export default Courses;

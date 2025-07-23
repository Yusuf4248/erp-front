import { EditOutlined } from "@ant-design/icons";
import { BranchColumn, PopConfirm } from "@components";
import { useBranches, useGeneral } from "@hooks";
import type { BranchType } from "@types";
import {
	Button,
	Space,
	Table,
	type TablePaginationConfig,
	type TableProps,
} from "antd";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BranchModal from "./modal";
const Branchs: React.FC = () => {
	const [open, setOpen] = useState(false);
	const [update, setUpdate] = useState<BranchType | null>(null);
	const location = useLocation();
	const { handlePagination } = useGeneral();
	const [params, setParams] = useState({
		page: 1,
		limit: 10,
	});
	const { data, useBranchDelete } = useBranches(params);

	const { mutate: deleteBranch, isPending: isDeleting } = useBranchDelete();
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
		deleteBranch(id);
	};
	const updateItem = (branchData: BranchType) => {
		setOpen(true);
		setUpdate(branchData);
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
	const columns: TableProps<BranchType>["columns"] = [
		...(BranchColumn ?? []),
		{
			title: "Action",
			key: "action",
			render: (_, record: BranchType) => (
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
			{open && <BranchModal open={open} toggle={toggle} update={update} />}
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2 sm:gap-0">
				<h1 className="text-lg sm:text-2xl font-bold tracking-tight text-gray-900">
					Branches
				</h1>
				<Button
					className="w-full sm:w-auto"
					type="primary"
					onClick={() => setOpen(true)}
				>
					Add New Branch
				</Button>
			</div>
			<div className="overflow-x-auto">
				<Table<BranchType>
					columns={columns}
					dataSource={data?.data.branch}
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
export default Branchs;

import { EditOutlined } from "@ant-design/icons";
import { PopConfirm, RoomsColumn } from "@components";
import { useGeneral, useRoomss } from "@hooks";
import type { RoomsType } from "@types";
import {
	Button,
	Space,
	Table,
	type TablePaginationConfig,
	type TableProps,
} from "antd";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import RoomModal from "./modal";

const Rooms: React.FC = () => {
	const [open, setOpen] = useState(false);
	const [update, setUpdate] = useState<RoomsType | null>(null);
	const location = useLocation();
	const { handlePagination } = useGeneral();
	const [params, setParams] = useState({
		page: 1,
		limit: 10,
	});
	// const navigate = useNavigate();
	const { data, useRoomsDelete } = useRoomss(params);
	const { mutate: deleteRoom, isPending: isDeleting } = useRoomsDelete();
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
		deleteRoom(id);
	};
	const updateItem = (roomData: RoomsType) => {
		setOpen(true);
		setUpdate(roomData);
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
	const columns: TableProps<RoomsType>["columns"] = [
		...(RoomsColumn ?? []),
		{
			title: "Action",
			key: "action",
			render: (_, record: RoomsType) => (
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
			{open && <RoomModal open={open} toggle={toggle} update={update} />}
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2 sm:gap-0">
				<h1 className="text-lg sm:text-2xl font-bold tracking-tight text-gray-900">
					Rooms
				</h1>
				<Button
					className="w-full sm:w-auto"
					type="primary"
					onClick={() => setOpen(true)}
				>
					Add New Room
				</Button>
			</div>
			<div className="overflow-x-auto">
				<Table<RoomsType>
					columns={columns}
					dataSource={data?.data.rooms}
					rowKey={(record) => record.id}
					scroll={{ x: "max-content", y: 500 }}
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
export default Rooms;

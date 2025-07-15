import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
interface PopConfirmProps {
	handleDelete: () => void;
	loading: boolean;
}
export const PopConfirm = ({ handleDelete, loading }: PopConfirmProps) => {
	return (
		<Popconfirm
			title="Delete th item"
			description="Are you sure to delete this item?"
			okText="Yes"
			cancelText="No"
			onConfirm={handleDelete}
		>
			<Button danger type="primary" loading={loading}>
				<DeleteOutlined />
			</Button>
		</Popconfirm>
	);
};

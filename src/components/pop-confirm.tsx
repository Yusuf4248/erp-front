import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
interface PopConfirmProps {
  handleDelete: () => void;
}

const PopConfirm = ({ handleDelete }: PopConfirmProps) => {
  return (
    <Popconfirm
      title="Delete the task"
      description="Are you sure to delete this task?"
      okText="Yes"
      cancelText="No"
      onConfirm={handleDelete}
    >
      <Button type="primary" danger>
        <DeleteOutlined />
      </Button>
    </Popconfirm>
  );
};

export default PopConfirm;

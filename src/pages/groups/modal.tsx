import type { ModalProps } from "@types";
import { Modal } from "antd";
// import { useGroups } from '@hooks'
const GroupModal = ({ open, toggle, update }: ModalProps) => {
	// const { data, useGroupCreate, useGroupUpdate } = useGroups();
	// const { mutate: createGroup, isPending: isCreating } = useGroupCreate();
	// const { mutate: updateGroup, isPending: isUpdating } = useGroupUpdate();
	return (
		<Modal
			title="Group Modal"
			centered
			open={open}
			onCancel={toggle}
			width={600}
		>
			<p>qwertyuio</p>
		</Modal>
	);
};

export default GroupModal;

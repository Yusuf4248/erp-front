import { yupResolver } from "@hookform/resolvers/yup";
import { useBranches } from "@hooks";
import type { ModalProps, RoomsType } from "@types";
import { Button, Form, Input, Modal, Select } from "antd";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { useRoomss } from "../../hooks/useRooms";
const schema = yup.object().shape({
	branchId: yup.number().required("Branch is required"),
	name: yup
		.string()
		.min(3, "Name must be at least 3 characters")
		.required("Name is required"),
	capacity: yup.number().required("Capacity is required"),
});
interface RoomType extends ModalProps {
	update: RoomsType | null;
}
const RoomModal = ({ open, toggle, update }: RoomType) => {
	const { useRoomsUpdate, useRoomsCreate } = useRoomss({});
	const { data: branchData } = useBranches({ page: 1, limit: 100 });
	const branches = branchData?.data.branch || []
	// console.log(branchData);
	const { mutate: createRoom, isPending: isCreating } = useRoomsCreate();
	const { mutate: updateRoom, isPending: isUpdating } = useRoomsUpdate();
	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({
		resolver: yupResolver(schema),
	});
	useEffect(() => {
		if (update?.id) {
			setValue("name", update.name);
			setValue("branchId", +update.branchId);
			setValue("capacity", +update.capacity);
		}
	}, [update]);
	const onSubmit = (data: any) => {
		if (update?.id) {
			updateRoom({ id: update!.id, data });
		} else {
			createRoom(data);
		}
	};
	return (
		<Modal
			title="Room Modal"
			centered
			open={open}
			onCancel={toggle}
			width={600}
			closeIcon
			footer={null}
		>
			<Form
				layout="vertical"
				autoComplete="on"
				onFinish={handleSubmit(onSubmit)}
			>
				<Form.Item
					label="Name"
					name="name"
					validateStatus={errors.name ? "error" : ""}
					help={errors.name?.message}
				>
					<Controller
						name={"name"}
						control={control}
						render={({ field }) => <Input {...field} />}
					/>
				</Form.Item>
				<Form.Item
					label="Branch"
					name={"branchId"}
					validateStatus={errors.branchId ? "error" : ""}
					help={errors.branchId?.message}
				>
					<Controller
						name={"branchId"}
						control={control}
						render={({ field }) => (
							<Select
								{...field}
								placeholder="Select branch..."
								status={errors.branchId ? "error" : ""}
								options={
									branches.map((i: any) => ({
										value: i.id,
										label: i.name,
									})) ?? []
								}
							/>
						)}
					/>
				</Form.Item>

				<Form.Item
					label="Capacity"
					name={"capacity"}
					validateStatus={errors.capacity ? "error" : ""}
					help={errors.capacity?.message}
				>
					<Controller
						name={"capacity"}
						control={control}
						render={({ field }) => (
							<Input {...field} placeholder="Capacity..." />
						)}
					/>
				</Form.Item>
				<Form.Item>
					<Button
						type={"primary"}
						htmlType={"submit"}
						loading={update ? isUpdating : isCreating}
					>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default RoomModal;

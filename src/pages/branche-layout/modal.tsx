import type { BranchType, ModalProps } from "@types";
import { Button, Form, Input, Modal, Select } from "antd";
import { Controller, useForm } from "react-hook-form";
// import { useGroups } from '@hooks'
import { yupResolver } from "@hookform/resolvers/yup";
import { useBranches, useTeachers } from "@hooks";
import { MaskedInput } from "antd-mask-input";
import { useEffect } from "react";
import * as yup from "yup";
const schema = yup.object().shape({
	name: yup
		.string()
		.min(3, "Name must be at least 3 characters")
		.required("Name is required"),
	address: yup.string().required("Address is required"),
	call_number: yup.string().required("Call Number is required"),
	teachers: yup.array().of(yup.number()).required("Teachers are required"),
});
interface BranchProps extends ModalProps {
	update: BranchType | null;
}
const BranchModal = ({ open, toggle, update }: BranchProps) => {
	const { useBranchUpdate, useBranchCreate } = useBranches({
		page: 1,
		limit: 10,
	});
	const { data: teacherData } = useTeachers({ page: 1, limit: 100 });
	const teachers = teacherData?.data.data || [];
	const { mutate: createBranch, isPending: isCreating } = useBranchCreate();
	const { mutate: updateBranch, isPending: isUpdating } = useBranchUpdate();
	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			name: "",
			address: "",
			call_number: "",
			teachers: [],
		},
	});
	useEffect(() => {
		if (update?.id) {
			setValue("name", update.name);
			setValue("address", update.address);
			setValue("call_number", update.call_number);
			setValue(
				"teachers",
				update.teachers.map((i: any) => i.id)
			);
		}
	}, [update]);
	const onSubmit = (data: any) => {
		delete data.teachers;
		if (update?.id) {
			updateBranch(
				{ id: update!.id, data },
				{
					onSuccess: () => {
						toggle();
					},
				}
			);
		} else {
			createBranch(data, {
				onSuccess: () => {
					toggle();
				},
			});
		}
	};
	return (
		<Modal
			title="Branch Modal"
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
					label="Address"
					name={"address"}
					validateStatus={errors.address ? "error" : ""}
					help={errors.address?.message}
				>
					<Controller
						name={"address"}
						control={control}
						render={({ field }) => <Input {...field} />}
					/>
				</Form.Item>

				<Form.Item
					label="Call Number"
					name="call_number"
					validateStatus={errors.call_number ? "error" : ""}
					help={errors.call_number?.message}
				>
					<Controller
						name="call_number"
						control={control}
						render={({ field }) => (
							<MaskedInput
								{...field}
								mask="+998 (00) 000-00-00"
								value={update ? update.call_number : ""}
							/>
						)}
					/>
				</Form.Item>
				<Form.Item
					label="Teachers"
					name="teachers"
					validateStatus={errors ? "error" : ""}
					help={errors.teachers?.message}
				>
					<Controller
						name="teachers"
						control={control}
						render={({ field }) => (
							<Select
								{...field}
								mode="multiple"
								placeholder="Select teacher..."
								options={
									teachers.map((teacehr: any) => ({
										value: teacehr.id,
										label: `${teacehr.first_name} ${teacehr.last_name}`,
									})) || []
								}
							/>
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

export default BranchModal;

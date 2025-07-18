import type { GroupType, ModalProps } from "@types";
import { Button, Form, Input, Modal, Select } from "antd";
import { Controller, useForm } from "react-hook-form";
// import { useGroups } from '@hooks'
import { yupResolver } from "@hookform/resolvers/yup";
import { useCourses, useGroups } from "@hooks";
import { useEffect } from "react";
import * as yup from "yup";
const schema = yup.object().shape({
	name: yup
		.string()
		.min(3, "Name must be at least 3 characters")
		.required("Name is required"),
	start_date: yup.string().required("Start date is required"),
	end_date: yup.string().required("End date is required"),
	status: yup.string().required("Status is required"),
	course: yup.string().required("Course is required"),
});
interface GroupProps extends ModalProps {
	update: GroupType | null;
}
const GroupModal = ({ open, toggle, update }: GroupProps) => {
	const { useGroupCreate, useGroupUpdate } = useGroups({
		page: 1,
		limit: 10,
	});
	const { data: courseData } = useCourses({ page: 1, limit: 100 });
	const courses = courseData?.data.courses || [];
	const { mutate: createGroup, isPending: isCreating } = useGroupCreate();
	const { mutate: updateGroup, isPending: isUpdating } = useGroupUpdate();
	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			name: "",
			status: "",
			start_date: "",
			end_date: "",
			course: "",
		},
	});
	useEffect(() => {
		if (update?.id) {
			setValue("name", update.name);
			setValue("status", update.status);
			setValue("start_date", update.start_date);
			setValue("end_date", update.end_date);
			setValue("course", update.course);
		}
	}, [update]);
	const onSubmit = (data: any) => {
		data["course_id"] = +data.course;
		delete data.course;
		if (update?.id) {
			console.log("update", update);
			updateGroup({ id: update!.id, data });
		} else {
			createGroup(data);
		}
	};
	return (
		<Modal
			title="Group Modal"
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
					label="Course"
					name={"status"}
					validateStatus={errors.course ? "error" : ""}
					help={errors.course?.message}
				>
					<Controller
						name={"course"}
						control={control}
						render={({ field }) => (
							<Select
								{...field}
								placeholder="Select course..."
								status={errors.course ? "error" : ""}
								options={
									courses.map((i: any) => ({
										value: i.id,
										label: i.title,
									})) ?? []
								}
							/>
						)}
					/>
				</Form.Item>

				<Form.Item
					label="Start Date"
					name={"start_date"}
					validateStatus={errors.start_date ? "error" : ""}
					help={errors.start_date?.message}
				>
					<Controller
						name={"start_date"}
						control={control}
						render={({ field }) => <Input type="date" {...field} />}
					/>
				</Form.Item>

				<Form.Item
					label="End Date"
					name={"end_date"}
					validateStatus={errors.end_date ? "error" : ""}
					help={errors.end_date?.message}
				>
					<Controller
						name={"end_date"}
						control={control}
						render={({ field }) => <Input type="date" {...field} />}
					/>
				</Form.Item>

				<Form.Item
					label="Status"
					name={"status"}
					validateStatus={errors.status ? "error" : ""}
					help={errors.status?.message}
				>
					<Controller
						name={"status"}
						control={control}
						render={({ field }) => (
							<Select
								{...field}
								placeholder="Select status..."
								options={[
									{
										value: "active",
										label: "Active",
									},
									{
										value: "new",
										label: "New",
									},
									{
										value: "cancelled",
										label: "Cancelled",
									},
								]}
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

export default GroupModal;

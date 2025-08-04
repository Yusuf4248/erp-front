import { yupResolver } from "@hookform/resolvers/yup";
import { useAttendanceMutations } from "@hooks";
import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
const schema = yup.object().shape({
	description: yup
		.string()
		.min(3, "Title must be at least 3 characters")
		.required("Title is required"),
	status: yup.string().required("Status is required"),
	date: yup
		.mixed()
		.test("is-date", "Start date is required", (value) => {
			return (
				value instanceof dayjs ||
				(typeof value === "string" && dayjs(value).isValid())
			);
		})
		.required("Date is required"),
});
const StudentModal = ({ open, toggle, update }: any) => {
	const { useChangeStudentAttendance } = useAttendanceMutations();
	const { mutate: changeStudentAttendance, isPending: pending } =
		useChangeStudentAttendance();
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
			setValue("description", update.notes);
			setValue("status", update.status);
			setValue("date", dayjs(update.date));
		}
	}, [update]);
	const onSubmit = (data: any) => {
		const updateItem = {
			description: data.notes,
			status: data.status,
			date: dayjs(data.date).format("YYYY-MM-DD"),
			studentId:update?.student.id,
			lessonId:update?.lesson.id,
		};
		if (update?.id) {
			// if (
			// 	data.status === "cancelled" ||
			// 	data.status === "completed" ||
			// 	data.status === "in_progress"
			// ) {
			// 	(updateItem as { date?: string }).date = undefined;
			// }
			changeStudentAttendance(
				{ id: update.id, data: updateItem },
				{
					onSuccess: () => {
						toggle();
					},
				}
			);
		}
	};

	return (
		<Modal
			title="Student Attendance"
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
					label="Title"
					name="title"
					validateStatus={errors.description ? "error" : ""}
					help={errors.description?.message}
				>
					<Controller
						name={"description"}
						control={control}
						render={({ field }) => <Input {...field} />}
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
								options={[
									{ label: "Came", value: "came" },
									{ label: "Did Not Came", value: "did not came" },
									{ label: "Late", value: "late" },
									{ label: "Pending", value: "pending" },
								]}
							/>
						)}
					/>
				</Form.Item>
				<Form.Item>
					<Controller
						name={"date"}
						control={control}
						render={({ field }) => <DatePicker {...field} />}
					/>
				</Form.Item>

				<Form.Item>
					<Button type={"primary"} htmlType={"submit"} loading={pending}>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default StudentModal;

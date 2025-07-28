import type { CourseType, ModalProps } from "@types";
import { Button, Form, Input, Modal, Select } from "antd";
import { Controller, useForm } from "react-hook-form";
// import { useGroups } from '@hooks'
import { yupResolver } from "@hookform/resolvers/yup";
import { useCourses } from "@hooks";
import { useEffect } from "react";
import * as yup from "yup";
const schema = yup.object().shape({
	title: yup
		.string()
		.min(3, "Title must be at least 3 characters")
		.required("Title is required"),
	description: yup.string().required("Description is required"),
	price: yup.number().required("Price is required"),
	duration: yup.number().required("Duration is required"),
	lessons_in_a_week: yup.number().required("Lesson in a week is required"),
	lesson_duration: yup.number().required("Lesson duration is required"),
});
interface CourseProps extends ModalProps {
	update: CourseType | null;
}
const CourseModal = ({ open, toggle, update }: CourseProps) => {
	const { useCourseUpdate, useCourseCreate } = useCourses({
		page: 1,
		limit: 10,
	});
	const { mutate: createCourse, isPending: isCreating } = useCourseCreate();
	const { mutate: updateCourse, isPending: isUpdating } = useCourseUpdate();
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
			setValue("title", update.title);
			setValue("description", update.description);
			setValue("price", update.price);
			setValue("duration", +update.duration);
			setValue("lessons_in_a_week", +update.lesson_in_a_week);
			setValue("lesson_duration", +update.lesson_duration);
		}
	}, [update]);
	const onSubmit = (data: any) => {
		if (update?.id) {
			updateCourse(
				{ id: update!.id, data },
				{
					onSuccess: () => {
						toggle();
					},
				}
			);
		} else {
			createCourse(data, {
				onSuccess: () => {
					toggle();
				},
			});
		}
	};
	return (
		<Modal
			title="Course Modal"
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
					validateStatus={errors.title ? "error" : ""}
					help={errors.title?.message}
				>
					<Controller
						name={"title"}
						control={control}
						render={({ field }) => <Input {...field} />}
					/>
				</Form.Item>
				<Form.Item
					label="Description"
					name={"description"}
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
					label="Price"
					name={"price"}
					validateStatus={errors.price ? "error" : ""}
					help={errors.price?.message}
				>
					<Controller
						name={"price"}
						control={control}
						render={({ field }) => <Input {...field} />}
					/>
				</Form.Item>

				<Form.Item
					label="Duration"
					name={"duration"}
					validateStatus={errors.duration ? "error" : ""}
					help={errors.duration?.message}
				>
					<Controller
						name={"duration"}
						control={control}
						render={({ field }) => (
							<Select
								{...field}
								placeholder="Select duration..."
								options={[
									{
										value: 6,
										label: "6 months",
									},
									{
										value: 8,
										label: "8 months",
									},
								]}
							/>
						)}
					/>
				</Form.Item>

				<Form.Item
					label="Lessons in a Week"
					name={"lessons_in_a_week"}
					validateStatus={errors.lessons_in_a_week ? "error" : ""}
					help={errors.lessons_in_a_week?.message}
				>
					<Controller
						name={"lessons_in_a_week"}
						control={control}
						render={({ field }) => (
							<Select
								{...field}
								placeholder="Select lesson in a week..."
								options={[
									{
										value: 3,
										label: 3,
									},
									{
										value: 5,
										label: 5,
									},
								]}
							/>
						)}
					/>
				</Form.Item>

				<Form.Item
					label="Lesson Duration"
					name={"lesson_duration"}
					validateStatus={errors.lesson_duration ? "error" : ""}
					help={errors.lesson_duration?.message}
				>
					<Controller
						name={"lesson_duration"}
						control={control}
						render={({ field }) => (
							<Select
								{...field}
								placeholder="Select lesson duration..."
								options={[
									{
										value: 120,
										label: "2 hours",
									},
									{
										value: 270,
										label: "4.5 hours",
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

export default CourseModal;

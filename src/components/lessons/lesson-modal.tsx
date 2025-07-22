import type { LessonType, ModalProps } from "@types";
import { Button, Form, Input, Modal, Select } from "antd";
import { Controller, useForm } from "react-hook-form";
// import { useGroups } from '@hooks'
import { yupResolver } from "@hookform/resolvers/yup";
import { useLessons } from "@hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import * as yup from "yup";
const schema = yup.object().shape({
	notes: yup
		.string()
		.min(3, "Title must be at least 3 characters")
		.required("Title is required"),
	status: yup.string().required("Status is required"),
});
interface LessonProps extends ModalProps {
	update: LessonType | null;
}
const LessonModal = ({ open, toggle, update }: LessonProps) => {
	const queryClient = useQueryClient();
	const { useLessonUpdateStatusAndNotes } = useLessons({});
	const { mutate: updateLessonStatusAndNote, isPending: isUpdating } =
		useLessonUpdateStatusAndNotes();
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
			setValue("notes", update.notes);
			setValue("status", update.status);
		}
	}, [update]);
	const onSubmit = (data: any) => {
		const updateItem = { note: data.notes, status: data.status };
		if (update?.id) {
			updateLessonStatusAndNote(
				{ id: update!.id, data: updateItem },
				{
					onSuccess: () => {
						toggle();
						queryClient.invalidateQueries(["lessons", "status&notes"]);
					},
				}
			);
		}
	};
	return (
		<Modal
			title="Lesson Modal"
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
					validateStatus={errors.notes ? "error" : ""}
					help={errors.notes?.message}
				>
					<Controller
						name={"notes"}
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
									{ label: "Yangi", value: "yangi" },
									{ label: "Bekor qilingan", value: "bekor qilingan" },
								]}
							/>
						)}
					/>
				</Form.Item>

				<Form.Item>
					<Button type={"primary"} htmlType={"submit"} loading={isUpdating}>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default LessonModal;

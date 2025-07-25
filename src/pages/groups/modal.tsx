import { yupResolver } from "@hookform/resolvers/yup";
import { useCourses, useGroups, useRoomss } from "@hooks";
import type { GroupType, ModalProps } from "@types";
import type { DatePickerProps } from "antd";
import {
	Button,
	DatePicker,
	Form,
	Input,
	Modal,
	Select,
	TimePicker,
} from "antd";
import type { TimePickerProps } from "antd/lib";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

type GroupFormValues = {
	name: string;
	start_date: Dayjs | string;
	start_time: Dayjs | string;
	status: string;
	course?: string;
	roomId: number;
};

const schema = yup.object().shape({
	name: yup
		.string()
		.min(3, "Name must be at least 3 characters")
		.required("Name is required"),
	start_date: yup
		.mixed()
		.test("is-date", "Start date is required", (value) => {
			return (
				value instanceof dayjs ||
				(typeof value === "string" && dayjs(value).isValid())
			);
		})
		.required("Start date is required"),
	start_time: yup
		.mixed()
		.test("is-time", "Start time is required", (value) => {
			return (
				value instanceof dayjs ||
				(typeof value === "string" && dayjs(value, "HH:mm").isValid())
			);
		})
		.required("Start time is required"),
	status: yup.string().required("Status is required"),
	course: yup.string().required("Course is required"),
	roomId: yup.number().required("Room is required"),
});

interface GroupProps extends ModalProps {
	update: GroupType | null;
}

const GroupModal = ({ open, toggle, update }: GroupProps) => {
	const { useGroupCreate, useGroupUpdate } = useGroups({
		page: 1,
		limit: 10,
	});

	const { data: courseData } = useCourses({});
	const courses = courseData?.data.courses || [];

	const { data: roomData } = useRoomss({});
	const rooms = roomData?.data.rooms || [];

	const { mutate: createGroup, isPending: isCreating } = useGroupCreate();
	const { mutate: updateGroup, isPending: isUpdating } = useGroupUpdate();

	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
		reset,
	} = useForm<GroupFormValues>({
		resolver: yupResolver(schema) as any,
		defaultValues: {
			name: "",
			start_date: "",
			start_time: "",
			status: "",
			course: "",
			roomId: undefined,
		},
	});

	useEffect(() => {
		if (!open) {
			reset();
		} else if (update?.id) {
			setValue("name", update.name);
			setValue("status", update.status);
			setValue("start_date", dayjs(update.start_date));
			setValue("start_time", dayjs(update.start_time, "HH:mm"));
			setValue("course", update.course.title);
			setValue("roomId", Number(update.roomId));
		}
	}, [open, update]);

	const onSubmit = (data: GroupFormValues) => {
		const formattedData: any = {
			...data,
			courseId: Number(data.course),
			start_date: dayjs(data.start_date).format("YYYY-MM-DD"),
			start_time: dayjs(data.start_time).format("HH:mm"),
			end_date: "2025-06-06",
			end_time: "09:00",
		};

		// Remove course from formattedData if present
		if (formattedData.course) {
			delete formattedData.course;
		}

		if (update?.id) {
			updateGroup({ id: update.id, data: formattedData });
		} else {
			createGroup(formattedData);
		}
		toggle();
	};
	const datePickerProps: DatePickerProps = {
		format: "YYYY-MM-DD",
		style: { width: "100%" },
	};
	const timePickerProps: TimePickerProps = {
		format: "HH:mm",
		minuteStep: 15,
		style: { width: "100%" },
	};

	return (
		<Modal
			title={update ? "Edit Group" : "Create Group"}
			centered
			open={open}
			onCancel={toggle}
			width={600}
			footer={null}
			destroyOnClose
		>
			<Form
				layout="vertical"
				autoComplete="off"
				onFinish={handleSubmit(onSubmit)}
			>
				<Form.Item
					label="Name"
					validateStatus={errors.name ? "error" : ""}
					help={errors.name?.message as string}
				>
					<Controller
						name="name"
						control={control}
						render={({ field }) => (
							<Input
								{...field}
								placeholder="Enter group name"
								className="w-full"
							/>
						)}
					/>
				</Form.Item>

				<Form.Item
					label="Course"
					validateStatus={errors.course ? "error" : ""}
					help={errors.course?.message as string}
				>
					<Controller
						name="course"
						control={control}
						render={({ field }) => (
							<Select
								{...field}
								placeholder="Select course..."
								options={courses.map((course: any) => ({
									value: course.id.toString(),
									label: course.title,
								}))}
								className="w-full"
							/>
						)}
					/>
				</Form.Item>

				<Form.Item
					label="Start Date"
					validateStatus={errors.start_date ? "error" : ""}
					help={errors.start_date?.message as string}
				>
					<Controller
						name="start_date"
						control={control}
						render={({ field }) => (
							<DatePicker
								{...field}
								{...datePickerProps}
								value={field.value ? dayjs(field.value) : null}
								className="w-full"
							/>
						)}
					/>
				</Form.Item>

				<Form.Item
					label="Start Time"
					validateStatus={errors.start_time ? "error" : ""}
					help={errors.start_time?.message as string}
				>
					<Controller
						name="start_time"
						control={control}
						render={({ field }) => (
							<TimePicker
								{...field}
								{...timePickerProps}
								value={field.value ? dayjs(field.value, "HH:mm") : null}
								className="w-full"
							/>
						)}
					/>
				</Form.Item>

				<Form.Item
					label="Status"
					validateStatus={errors.status ? "error" : ""}
					help={errors.status?.message as string}
				>
					<Controller
						name="status"
						control={control}
						render={({ field }) => (
							<Select
								{...field}
								placeholder="Select status..."
								options={[
									{ value: "active", label: "Active" },
									{ value: "new", label: "New" },
									{ value: "cancelled", label: "Cancelled" },
								]}
								className="w-full"
							/>
						)}
					/>
				</Form.Item>

				<Form.Item
					label="Room"
					validateStatus={errors.roomId ? "error" : ""}
					help={errors.roomId?.message as string}
				>
					<Controller
						name="roomId"
						control={control}
						render={({ field }) => (
							<Select
								{...field}
								placeholder="Select room..."
								options={rooms.map((room: any) => ({
									value: room.id,
									label: room.name,
								}))}
								className="w-full"
							/>
						)}
					/>
				</Form.Item>

				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						loading={isCreating || isUpdating}
					>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default GroupModal;

import { yupResolver } from "@hookform/resolvers/yup";
import { useStudents } from "@hooks";
import type { ModalProps, StudentType } from "@types";
import { Button, Form, Input, Modal, Select } from "antd";
import MaskedInput from "antd-mask-input";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
const schema = yup.object().shape({
	first_name: yup
		.string()
		.min(3, "First name must be at least 3 characters")
		.required("First name is required"),
	last_name: yup
		.string()
		.min(3, "Last name must be at least 3 characters")
		.required("Last name is required"),
	email: yup.string().email("Invalid email").required("Email is required"),
	phone: yup.string().required("Phone is required"),
	password_hash: yup
		.string()
		.required("Please Enter your password")
		.matches(
			/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
			"Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
		),
	gender: yup.string().required("Gender is required"),
	date_of_birth: yup.string().required("Date of birth is required"),
	lidId: yup.number().required("LID ID is required"),
});
interface StudentProps extends ModalProps {
	update: StudentType | null;
}
const StudentModal = ({ open, toggle, update }: StudentProps) => {
	const { useStudentCreate, useStudentUpdate } = useStudents({
		page: 1,
		limit: 10,
	});
	const { mutate: createStudent, isPending: isCreating } = useStudentCreate();
	const { mutate: updateStudent, isPending: isUpdating } = useStudentUpdate();
	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			first_name: "",
			last_name: "",
			email: "",
			phone: "",
			password_hash: "",
			gender: "",
			date_of_birth: "",
			lidId: 0,
		},
	});
	useEffect(() => {
		if (update?.id) {
			setValue("first_name", update.first_name);
			setValue("last_name", update.last_name);
			setValue("email", update.email);
			setValue("phone", update.phone);
			setValue("password_hash", update.password_hash);
			setValue("gender", update.gender);
			setValue("date_of_birth", update.date_of_birth);
			setValue("lidId", update.lidId);
		}
	}, [update]);
	const onSubmit = (data: any) => {
		data["confirm_password"] = data.password_hash;
		data.phone = data.phone.replace(/[^\d+]/g, "");
		// delete data.confirm_password;
		delete data.lidId;
		delete data.groupsId;
		delete data.eventsId;
		console.log(data)
		if (update?.id) {
			updateStudent({ id: update!.id, data });
		} else {
			createStudent(data);
		}
	};
	return (
		<Modal
			title="Student Modal"
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
					label="First Name"
					name="first_name"
					validateStatus={errors ? "error" : ""}
					help={errors.first_name?.message}
				>
					<Controller
						name={"first_name"}
						control={control}
						render={({ field }) => <Input {...field} />}
					/>
				</Form.Item>
				<Form.Item
					label="Last Name"
					name="last_name"
					validateStatus={errors ? "error" : ""}
					help={errors.last_name?.message}
				>
					<Controller
						name={"last_name"}
						control={control}
						render={({ field }) => <Input {...field} />}
					/>
				</Form.Item>
				<Form.Item
					label="Email"
					name="email"
					validateStatus={errors ? "error" : ""}
					help={errors.email?.message}
				>
					<Controller
						name={"email"}
						control={control}
						render={({ field }) => <Input {...field} />}
					/>
				</Form.Item>
				<Form.Item
					label="Phone"
					name="phone"
					validateStatus={errors.phone ? "error" : ""}
					help={errors.phone?.message}
				>
					<Controller
						name="phone"
						control={control}
						render={({ field }) => (
							<MaskedInput
								{...field}
								mask="+998 (00) 000-00-00"
								value={update ? update.phone : ""}
							/>
						)}
					/>
				</Form.Item>
				<Form.Item
					label="Password"
					name="password"
					validateStatus={errors ? "error" : ""}
					help={errors.password_hash?.message}
				>
					<Controller
						name={"password_hash"}
						control={control}
						render={({ field }) => <Input.Password {...field} />}
					/>
				</Form.Item>
				<Form.Item
					label="Gender"
					name="gender"
					validateStatus={errors ? "error" : ""}
					help={errors.gender?.message}
				>
					<Controller
						name="gender"
						control={control}
						render={({ field }) => (
							<Select
								{...field}
								placeholder="Select gender..."
								options={[
									{ value: "male", label: "Male" },
									{ value: "female", label: "Female" },
									{ value: "other", label: "Other" },
								]}
							/>
						)}
					/>
				</Form.Item>
				<Form.Item
					label="Date of Birth"
					name="date_of_birth"
					validateStatus={errors ? "error" : ""}
					help={errors.date_of_birth?.message}
				>
					<Controller
						name="date_of_birth"
						control={control}
						render={({ field }) => <Input type="date" {...field} />}
					/>
				</Form.Item>
				<Form.Item
					label="LID ID"
					name="lidId"
					validateStatus={errors ? "error" : ""}
					help={errors.lidId?.message}
				>
					<Controller
						name="lidId"
						control={control}
						render={({ field }) => <Input type="number" {...field} />}
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

export default StudentModal;

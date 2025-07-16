import { yupResolver } from "@hookform/resolvers/yup";
import { useBranches, useTeachers } from "@hooks";
import type { ModalProps, TeacherType } from "@types";
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
	password: yup
		.string()
		.required("Please Enter your password")
		.matches(
			/^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$/,
			"Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
		),
	role: yup.string().required("Role is required"),
	branchId: yup.array().of(yup.number()).required("Branch is required"),
});
interface TeacherProps extends ModalProps {
	update: TeacherType | null;
}
const TeacherModal = ({ open, toggle, update }: TeacherProps) => {
	const { useTeacherCreate, useTeacherUpdate } = useTeachers({
		page: 1,
		limit: 10,
	});
	const { data: brachData } = useBranches();
	const fullBranchData = brachData?.data.branch || [];
	const { mutate: createTeacher, isPending: isCreating } = useTeacherCreate();
	const { mutate: updateTeacher, isPending: isUpdating } = useTeacherUpdate();
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
			password: "",
			role: "",
			branchId: [],
		},
	});
	useEffect(() => {
		if (update?.id) {
			setValue("first_name", update.first_name);
			setValue("last_name", update.last_name);
			setValue("email", update.email);
			setValue("phone", update.phone);
			setValue("password", update.password);
			setValue("role", update.role);
			setValue("branchId", update.branchId);
		}
	}, [update]);
	const onSubmit = (data: any) => {
		// data["eventsId"] = data.eventsId.split(",").map((i: string) => +i) || null;
		// data["groupsId"] = data.groupsId.split(",").map((i: string) => +i) || null;
		console.log(data);
		if (update?.id) {
			delete data.branchId;
			delete data.password;
			updateTeacher({ id: update!.id, data });
		} else {
			createTeacher(data);
		}
	};
	return (
		<Modal
			title="Teacher Modal"
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
							<MaskedInput {...field} mask="+998 (00) 000-00-00" value={update?update.phone:''} />
						)}
					/>
				</Form.Item>
				<Form.Item
					label="Password"
					name="password"
					validateStatus={errors ? "error" : ""}
					help={errors.password?.message}
				>
					<Controller
						name={"password"}
						control={control}
						render={({ field }) => <Input.Password {...field} />}
					/>
				</Form.Item>
				<Form.Item
					label="Role"
					name="role"
					validateStatus={errors ? "error" : ""}
					help={errors.role?.message}
				>
					<Controller
						name="role"
						control={control}
						render={({ field }) => (
							<Select
								{...field}
								placeholder="Select role..."
								options={[
									{ value: "main teacher", label: "Main" },
									{ value: "assistant teacher", label: "Assistant" },
								]}
							/>
						)}
					/>
				</Form.Item>
				<Form.Item
					label="Branch"
					name="branch"
					validateStatus={errors ? "error" : ""}
					help={errors.branchId?.message}
				>
					<Controller
						name="branchId"
						control={control}
						render={({ field }) => (
							<Select
								{...field}
								mode="multiple"
								placeholder="Select branch..."
								options={
									fullBranchData.map((branch: any) => ({
										value: branch.id,
										label: branch.name,
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

export default TeacherModal;

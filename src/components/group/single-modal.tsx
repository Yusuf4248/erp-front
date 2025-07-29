import { yupResolver } from "@hookform/resolvers/yup";
import { useGroups, useStudents, useTeachers } from "@hooks";
import { useQueryClient } from "@tanstack/react-query";
import type { ModalProps } from "@types";
import { Button, Form, Modal, Select } from "antd";
import { useEffect } from "react"; // Import useEffect
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
	studentId: yup.array().of(yup.number()).optional(), // Make optional and specify type
	teacherId: yup.array().of(yup.number()).optional(), // Make optional and specify type
});

interface ThisProps extends ModalProps {
	addingTeacher: boolean;
	groupId: number;
}

const AddTeacherorStudentModal = ({
	addingTeacher,
	open,
	toggle,
	groupId,
}: ThisProps) => {
	const { useGroupAddStudent, useGroupAddTeacher } = useGroups({
		page: 1,
		limit: 100,
	});

	// Fetch data conditionally based on addingTeacher prop
	const { data: teachersData } = useTeachers({ page: 1, limit: 100 });
	const { data: studentsData } = useStudents({ page: 1, limit: 100 });

	const originalData = addingTeacher
		? teachersData?.data?.data || []
		: studentsData?.data?.data || [];

	const { mutate: addStudent, isPending: isCreatingSt } = useGroupAddStudent();
	const { mutate: addTeacher, isPending: isCreatingTr } = useGroupAddTeacher();
	const queryClient = useQueryClient();

	const { control, handleSubmit, setValue, reset } = useForm({
		// Add reset here
		resolver: yupResolver(schema),
		defaultValues: {
			teacherId: [],
			studentId: [],
		},
	});

	// Reset form when modal opens/closes or addingTeacher changes
	useEffect(() => {
		if (open) {
			reset({
				teacherId: [],
				studentId: [],
			});
		}
	}, [open, addingTeacher, reset]);

	const onSubmit = (data: any) => {
		const payload = {
			...data,
			status: true,
			start_date: new Date().toISOString(),
			groupId: groupId,
		};

		if (addingTeacher) {
			// Ensure teacherId array is passed, remove studentId
			delete payload.studentId;
			addTeacher(payload, {
				onSuccess: () => {
					toggle();
					queryClient.invalidateQueries({
						queryKey: ["groups", "add-teacher", groupId], // More specific query key
					});
					reset(); // Reset form on success
				},
			});
		} else {
			// Ensure studentId array is passed, remove teacherId
			delete payload.teacherId;
			addStudent(payload, {
				onSuccess: () => {
					toggle();
					queryClient.invalidateQueries({
						queryKey: ["groups", "add-student", groupId], // More specific query key
					});
					reset(); // Reset form on success
				},
			});
		}
	};

	return (
		<Modal
			title={`Add ${addingTeacher ? "Teacher" : "Student"}`}
			centered
			open={open} // Use the prop directly
			closeIcon
			footer={null}
			width={340}
			onCancel={toggle}
		>
			<Form
				layout="vertical"
				autoComplete="on"
				onFinish={handleSubmit(onSubmit)}
			>
				{addingTeacher && ( // Conditionally render based on addingTeacher
					<Form.Item label="Teacher" name="teacherId">
						<Controller
							name="teacherId"
							control={control}
							render={({ field }) => (
								<Select
									mode="multiple"
									style={{ width: "100%" }}
									placeholder="Select teachers"
									options={originalData?.map((item: any) => ({
										label: `${item.id} - ${item.first_name} ${item.last_name}`,
										value: item.id,
									}))}
									onChange={field.onChange} // Pass field.onChange here
									value={field.value} // Pass field.value here
								/>
							)}
						/>
					</Form.Item>
				)}

				{!addingTeacher && ( // Conditionally render based on addingTeacher
					<Form.Item label="Student" name="studentId">
						<Controller
							name="studentId"
							control={control}
							render={({ field }) => (
								<Select
									mode="multiple"
									style={{ width: "100%" }}
									placeholder="Select students"
									options={originalData?.map((item: any) => ({
										label: `${item.id} - ${item.first_name} ${item.last_name}`,
										value: item.id,
									}))}
									onChange={field.onChange} // Pass field.onChange here
									value={field.value} // Pass field.value here
								/>
							)}
						/>
					</Form.Item>
				)}

				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						loading={addingTeacher ? isCreatingTr : isCreatingSt}
					>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default AddTeacherorStudentModal;

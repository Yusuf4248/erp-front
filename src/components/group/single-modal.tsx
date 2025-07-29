import { yupResolver } from "@hookform/resolvers/yup";
import { useGroups, useStudents, useTeachers } from "@hooks";
import { useQueryClient } from "@tanstack/react-query";
import type { ModalProps } from "@types";
import { Button, Form, Modal, Select } from "antd";
import { useEffect, useState } from "react"; // Import useEffect
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
  const { data: teachersData } = useTeachers({ page: 1, limit: 100 }, { enabled: addingTeacher });
  const { data: studentsData } = useStudents({ page: 1, limit: 100 }, { enabled: !addingTeacher });

  const originalData = addingTeacher
    ? teachersData?.data?.data || []
    : studentsData?.data?.data || [];

  const { mutate: addStudent, isPending: isCreatingSt } = useGroupAddStudent();
  const { mutate: addTeacher, isPending: isCreatingTr } = useGroupAddTeacher();
  const queryClient = useQueryClient();

  const { control, handleSubmit, setValue, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      teacherId: [],
      studentId: [],
    },
  });

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
      delete payload.studentId;
      addTeacher(payload, {
        onSuccess: () => {
          toggle();
          queryClient.invalidateQueries({
            queryKey: ["groups", "add-teacher", groupId],
          });
          reset(); 
        },
      });
    } else {
      delete payload.teacherId;
      addStudent(payload, {
        onSuccess: () => {
          toggle();
          queryClient.invalidateQueries({
            queryKey: ["groups", "add-student", groupId], \
          });
          reset();
        },
      });
    }
  };

  return (
    <Modal
      title={`Add ${addingTeacher ? "Teacher" : "Student"}`}
      centered
      open={open} 
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
        {addingTeacher && ( 
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
                  onChange={field.onChange} 
                  value={field.value} 
                />
              )}
            />
          </Form.Item>
        )}

        {!addingTeacher && ( 
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
                  onChange={field.onChange}
                  value={field.value} 
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
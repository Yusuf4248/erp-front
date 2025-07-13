import { Modal, Form, Input, InputNumber } from "antd";
import { type CourseFormValues } from "@types";
import { useEffect } from "react";

type Props = {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: CourseFormValues) => void;
  initialValues?: CourseFormValues | undefined;
};

const CourseModal = ({ visible, onCancel, onSubmit, initialValues }: Props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
      form.resetFields();
    } catch (err) {
      // Validation error
    }
  };

  return (
    <Modal
      open={visible}
      title={initialValues ? "Kursni tahrirlash" : "Yangi kurs qo'shish"}
      onCancel={() => {
        onCancel();
        form.resetFields();
      }}
      onOk={handleOk}
      okText={initialValues ? "Saqlash" : "Qo'shish"}
      cancelText="Bekor qilish"
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Kurs nomi"
          name="title"
          rules={[{ required: true, message: "Kurs nomi majburiy" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Tavsifi"
          name="description"
          rules={[{ required: true, message: "Tavsif majburiy" }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item
          label="Narxi"
          name="price"
          rules={[{ required: true, message: "Narxi majburiy" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Davomiyligi"
          name="duration"
          rules={[{ required: true, message: "Davomiylik majburiy" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Haftadagi darslar soni"
          name="lessons_in_a_week"
          rules={[
            { required: true, message: "Haftadagi darslar soni majburiy" },
          ]}
        >
          <InputNumber min={1} max={7} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Dars davomiyligi"
          name="lesson_duration"
          rules={[{ required: true, message: "Dars davomiyligi majburiy" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CourseModal;

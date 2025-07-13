import { Modal, Form, Input } from "antd";
import { type BranchFormValues } from "@types";
import { useEffect } from "react";
import { Notification } from "@helpers";

type Props = {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: BranchFormValues) => void;
  initialValues?: BranchFormValues | undefined;
};

const BranchModal = ({ visible, onCancel, onSubmit, initialValues }: Props) => {
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
      Notification("error", "Form validation failed");
    }
  };

  return (
    <Modal
      open={visible}
      title={initialValues ? "Filialni tahrirlash" : "Yangi filial qo'shish"}
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
          label="Filial nomi"
          name="name"
          rules={[{ required: true, message: "Filial nomi majburiy" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Manzil"
          name="address"
          rules={[{ required: true, message: "Manzil majburiy" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Telefon"
          name="phone"
          rules={[{ required: true, message: "Telefon majburiy" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BranchModal;

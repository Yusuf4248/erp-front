import { useEffect, useState } from "react";
import { Table, Button, Popconfirm, Space } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { type Branch, type BranchFormValues } from "@types";
import { Notification } from "@helpers";
import { useBranch } from "@hooks";
import BranchModal from "./branch-modal";

const Branch = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 5,
    total: 0,
  });

  const { getBranches, createBranch, updateBranch, deleteBranch } = useBranch();
  const createBranchMutation = createBranch();
  const updateBranchMutation = updateBranch();
  const deleteBranchMutation = deleteBranch();

  useEffect(() => {
    if (getBranches.data?.data?.branch) {
      const mappedBranches = getBranches.data.data.branch.map(
        (branch: any) => ({
          id: branch.id,
          name: branch.name,
          address: branch.address,
          call_number: branch.call_number,
        })
      );
      setBranches(mappedBranches);
      setPagination((prev) => ({
        ...prev,
        total: mappedBranches.length,
      }));
    }
    setLoading(getBranches.isLoading);
  }, [getBranches.data, getBranches.isLoading]);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination);
  };

  const handleCreateOrUpdate = async (values: BranchFormValues) => {
    try {
      if (editingBranch) {
        await updateBranchMutation.mutateAsync({
          id: editingBranch.id,
          data: values,
        });
        Notification("success", "Filial muvaffaqiyatli yangilandi");
      } else {
        await createBranchMutation.mutateAsync(values);
        Notification("success", "Filial muvaffaqiyatli qo'shildi");
      }
      setModalOpen(false);
      setEditingBranch(null);
    } catch (err) {
      Notification("error", "Amalni bajarishda xatolik yuz berdi");
    }
  };

  const handleEdit = (branch: Branch) => {
    setEditingBranch(branch);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteBranchMutation.mutateAsync(id);
      Notification("success", "Filial o'chirildi");
    } catch (err) {
      Notification("error", "Filialni o'chirishda xatolik yuz berdi");
    }
  };

  const columns: ColumnsType<Branch> = [
    {
      title: "Filial nomi",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Manzil",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Telefon",
      dataIndex: "call_number",
      key: "call_number",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Ishonchingiz komilmi?"
            okText="Ha"
            cancelText="Yo'q"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Filiallar ro'yxati</h2>
        <Button
          type="primary"
          onClick={() => {
            setEditingBranch(null);
            setModalOpen(true);
          }}
        >
          Filial qo'shish
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={branches}
        loading={loading}
        rowKey={(record) => record.id}
        pagination={pagination}
        onChange={handleTableChange}
        bordered
      />

      <BranchModal
        visible={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          setEditingBranch(null);
        }}
        onSubmit={handleCreateOrUpdate}
        initialValues={
          editingBranch
            ? {
                name: editingBranch.name,
                address: editingBranch.address,
                call_number: editingBranch.call_number,
              }
            : undefined
        }
      />
    </div>
  );
};

export default Branch;

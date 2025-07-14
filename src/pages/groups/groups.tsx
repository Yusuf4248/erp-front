import { useEffect, useState } from "react";
import { Table, Button, Tag, Space } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import GroupModal from "./group-modal";
import { type Group, type GroupFormValues, GroupStatus } from "@types";
import { Notification } from "@helpers";
import { useGroup } from "@hooks";
import { PopConfirm } from "@components";
import { EditOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";

const Groups = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 5,
    total: 0,
    showSizeChanger: true,
    pageSizeOptions: ["3", "5", "10", "20"],
  });

  const { getGroups, createGroup, updateGroup, deleteGroup } = useGroup({
    page: pagination.current!,
    limit: pagination.pageSize!,
  });
  const createGroupMutation = createGroup();
  const updateGroupMutation = updateGroup();
  const deleteGroupMutation = deleteGroup();

  useEffect(() => {
    if (getGroups.data?.data?.data) {
      setGroups(getGroups.data.data.data);
      setPagination((prev) => ({
        ...prev,
        total: getGroups?.data?.data.total ?? getGroups?.data?.data.data.length,
      }));
    }
    setLoading(getGroups.isLoading);
  }, [getGroups.data, getGroups.isLoading]);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setSearchParams({
      page: String(pagination.current ?? 1),
      limit: String(pagination.pageSize ?? 5),
    });
    setPagination((prev) => ({
      ...prev,
      current: pagination.current ?? prev.current,
      pageSize: pagination.pageSize ?? prev.pageSize,
    }));
  };
  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 5;
    setPagination((prev) => ({
      ...prev,
      current: page,
      pageSize: limit,
    }));
  }, [searchParams]);

  const handleCreateOrUpdate = async (values: GroupFormValues) => {
    try {
      if (editingGroup) {
        await updateGroupMutation.mutateAsync({
          id: editingGroup.id,
          data: values,
        });
        Notification("success", "Guruh muvaffaqiyatli yangilandi");
      } else {
        await createGroupMutation.mutateAsync(values);
        Notification("success", "Guruh muvaffaqiyatli qo'shildi");
      }
      setModalOpen(false);
      setEditingGroup(null);
      getGroups.refetch();
    } catch (err) {
      Notification("error", "Amalni bajarishda xatolik yuz berdi");
    }
  };

  const handleEdit = (group: Group) => {
    setEditingGroup(group);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteGroupMutation.mutateAsync(id);
      Notification("success", "Guruh o'chirildi");
      getGroups.refetch();
    } catch (err) {
      Notification("error", "Guruhni o'chirishda xatolik yuz berdi");
    }
  };

  const statusColorMap: Record<string, string> = {
    [GroupStatus.NEW]: "blue",
    [GroupStatus.ACTIVE]: "green",
    [GroupStatus.COMPLETED]: "gold",
    [GroupStatus.CANCELLED]: "red",
    [GroupStatus.PENDING]: "orange",
  };

  const columns: ColumnsType<Group> = [
    {
      title: "Nomi",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={statusColorMap[status] || "default"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Kurs nomi",
      dataIndex: "course",
      key: "course",
      render: (course) => <span>{course.title}</span>,
    },
    {
      title: "Boshlanish",
      dataIndex: "start_date",
      key: "start_date",
    },
    {
      title: "Tugash",
      dataIndex: "end_date",
      key: "end_date",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>
            <EditOutlined />
          </Button>
          <PopConfirm handleDelete={() => handleDelete(record.id)} />
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Guruhlar ro'yxati</h2>
        <Button
          type="primary"
          onClick={() => {
            setEditingGroup(null);
            setModalOpen(true);
          }}
        >
          Guruh qo'shish
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={groups}
        loading={loading}
        rowKey={(record) => record.id}
        pagination={pagination}
        onChange={handleTableChange}
        bordered
      />

      <GroupModal
        visible={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          setEditingGroup(null);
        }}
        onSubmit={handleCreateOrUpdate}
        initialValues={editingGroup || undefined}
      />
    </div>
  );
};

export default Groups;

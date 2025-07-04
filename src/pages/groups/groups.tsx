import { useEffect, useState } from "react";
import { Table, Button, Tag, Popconfirm, Space } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import GroupModal from "./group-modal";
import { groupService } from "@services";
import { type Group, type GroupFormValues, GroupStatus } from "@types";
import { Notification } from "@helpers";

const Groups = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 5,
    total: 0,
  });

  const fetchGroups = async (page: number, pageSize: number) => {
    setLoading(true);
    try {
      const response = await groupService.getGroups();
      const data = response?.data?.data || [];
      setGroups(data);
      setPagination({
        ...pagination,
        current: page,
        pageSize,
        total: data.length,
      });
    } catch (err) {
      Notification("error", "Guruhlarni yuklashda xatolik yuz berdi");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGroups(pagination.current!, pagination.pageSize!);
  }, []);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    fetchGroups(pagination.current!, pagination.pageSize!);
  };

  const handleCreateOrUpdate = async (values: GroupFormValues) => {
    try {
      if (editingGroup) {
        await groupService.updateGroup(values, editingGroup.id);
        Notification("success", "Guruh muvaffaqiyatli yangilandi");
      } else {
        await groupService.createGroup(values);
        Notification("success", "Guruh muvaffaqiyatli qo'shildi");
      }
      setModalOpen(false);
      setEditingGroup(null);
      fetchGroups(pagination.current!, pagination.pageSize!);
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
      await groupService.deleteGroup(id);
      Notification("success", "Guruh o'chirildi");
      fetchGroups(pagination.current!, pagination.pageSize!);
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
      title: "Kurs ID",
      dataIndex: "course_id",
      key: "course_id",
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

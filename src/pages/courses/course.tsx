import { useEffect, useState } from "react";
import { Table, Button, Popconfirm, Space } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { type Course, type CourseFormValues } from "@types";
import { Notification } from "@helpers";
import { useCourse } from "@hooks";
import CourseModal from "./course-modal";

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 5,
    total: 0,
  });

  const { getCourses, createCourse, updateCourse, deleteCourse } = useCourse();
  const createCourseMutation = createCourse();
  const updateCourseMutation = updateCourse();
  const deleteCourseMutation = deleteCourse();

  useEffect(() => {
    if (getCourses.data?.data?.courses) {
      const mappedCourses = getCourses.data.data.courses.map((course: any) => ({
        id: course.id,
        title: course.title,
        description: course.description,
        price: course.price,
        duration: course.duration,
        lessons_in_a_week: course.lessons_in_a_week,
        lesson_duration: course.lesson_duration,
      }));
      setCourses(mappedCourses);
      setPagination((prev) => ({
        ...prev,
        total: mappedCourses.length,
      }));
    }
    setLoading(getCourses.isLoading);
  }, [getCourses.data, getCourses.isLoading]);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination);
  };

  const handleCreateOrUpdate = async (values: CourseFormValues) => {
    try {
      if (editingCourse) {
        await updateCourseMutation.mutateAsync({
          id: editingCourse.id,
          data: values,
        });
        Notification("success", "Kurs muvaffaqiyatli yangilandi");
      } else {
        await createCourseMutation.mutateAsync(values);
        Notification("success", "Kurs muvaffaqiyatli qo'shildi");
      }
      setModalOpen(false);
      setEditingCourse(null);
    } catch (err) {
      Notification("error", "Amalni bajarishda xatolik yuz berdi");
    }
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteCourseMutation.mutateAsync(id);
      Notification("success", "Kurs o'chirildi");
    } catch (err) {
      Notification("error", "Kursni o'chirishda xatolik yuz berdi");
    }
  };

  const columns: ColumnsType<Course> = [
    {
      title: "Kurs nomi",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Tavsifi",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Narxi",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Davomiyligi",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Haftadagi darslar soni",
      dataIndex: "lessons_in_a_week",
      key: "lessons_in_a_week",
    },
    {
      title: "Dars davomiyligi",
      dataIndex: "lesson_duration",
      key: "lesson_duration",
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
        <h2 className="text-xl font-semibold">Kurslar ro'yxati</h2>
        <Button
          type="primary"
          onClick={() => {
            setEditingCourse(null);
            setModalOpen(true);
          }}
        >
          Kurs qo'shish
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={courses}
        loading={loading}
        rowKey={(record) => record.id}
        pagination={pagination}
        onChange={handleTableChange}
        bordered
      />

      <CourseModal
        visible={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          setEditingCourse(null);
        }}
        onSubmit={handleCreateOrUpdate}
        initialValues={editingCourse || undefined}
      />
    </div>
  );
};

export default Courses;

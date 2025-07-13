import { useMutation, useQuery } from "@tanstack/react-query";
import { courseService } from "@services";
import type { Course } from "@types";

export const useCourse = () => {
  const getCourses = useQuery({
    queryKey: ["courses"],
    queryFn: async () => courseService.getCourses(),
  });

  const createCourse = () =>
    useMutation({
      mutationFn: async (course: Course) => courseService.createCourse(course),
      onSuccess: () => {
        getCourses.refetch();
      },
    });

  const updateCourse = () =>
    useMutation({
      mutationFn: async ({ id, data }: { id: number; data: Course }) =>
        courseService.updateCourse(data, id),
      onSuccess: () => {
        getCourses.refetch();
      },
    });

  const deleteCourse = () =>
    useMutation({
      mutationFn: async (id: number) => courseService.deleteCourse(id),
      onSuccess: () => {
        getCourses.refetch();
      },
    });

  return {
    getCourses,
    createCourse,
    updateCourse,
    deleteCourse,
  };
};

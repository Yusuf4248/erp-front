import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {  courseService } from "../service";

export const useCourses = () => {
	const queryClient = useQueryClient();
	const { data } = useQuery({
		queryKey: ["course"],
		queryFn: async () => courseService.getCourse(),
	});
	const useCourseCreate = () => {
		return useMutation({
			mutationFn: async (data: any) => courseService.createCourse(data),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["course"] });
			},
		});
	};
	const useCourseUpdate = () => {
		return useMutation({
			mutationFn: async ({ id, data }: { id: number; data: any }) =>
				courseService.updateCourse(id, data),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["course"] });
			},
		});
	};
	const useCourseDelete = () => {
		return useMutation({
			mutationFn: async (id: number) => courseService.deleteCourse(id),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["course"] });
			},
		});
	};
	return { useCourseCreate, data, useCourseUpdate, useCourseDelete };
};

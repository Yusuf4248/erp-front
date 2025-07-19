import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {  courseService } from "@service";
import type { ParamsType } from '@types'

export const useCourses = (params:ParamsType|{}) => {
	const queryClient = useQueryClient();
	const { data } = useQuery({
		queryKey: ["course",params],
		queryFn: async () => courseService.getCourse(params),
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

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { teacherService } from "../service";

export const useTeachers = () => {
	const queryClient = useQueryClient();
	const { data } = useQuery({
		queryKey: ["teacher"],
		queryFn: async () => teacherService.getTeacher(),
	});
	const useTeacherCreate = () => {
		return useMutation({
			mutationFn: async (data: any) => teacherService.createTeacher(data),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["teacher"] });
			},
		});
	};
	const useTeacherUpdate = () => {
		return useMutation({
			mutationFn: async ({ id, data }: { id: number; data: any }) =>
				teacherService.updateTeacher(id, data),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["teacher"] });
			},
		});
	};
	const useTeacherDelete = () => {
		return useMutation({
			mutationFn: async (id: number) => teacherService.deleteTeacher(id),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["teacher"] });
			},
		});
	};
	return { useTeacherCreate, data, useTeacherUpdate, useTeacherDelete };
};

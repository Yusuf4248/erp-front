import { teacherService } from "@service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ParamsType } from "@types";

const hasPageAndLimit = (p: any): p is { page: any; limit: any } =>
	p && typeof p.page !== "undefined" && typeof p.limit !== "undefined";

export const useTeachers = (params: ParamsType | {}, id: number = 0) => {
	const queryClient = useQueryClient();
	const { data } = useQuery({
		enabled: hasPageAndLimit(params),
		queryKey: ["teacher", params],
		queryFn: async () => teacherService.getTeacher(params),
	});
	const { data: teacherDataById } = useQuery({
		enabled: !!id,
		queryKey: ["teacher", id],
		queryFn: async () => teacherService.getTeacherById(id),
	});

	// const { data: teacherGroups } = useQuery({
	// 	enabled: !!id,
	// 	queryKey: ["teacherGroups", id],
	// 	queryFn: async () => teacherService.getAllTeacherGroups(id),
	// });

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
	const useTeacherUploadAvatar = () => {
		return useMutation({
			mutationFn: async ({ id, body }: { id: number; body: FormData }) =>
				teacherService.uploadAvatar(id, body),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["teacher"] });
			},
		});
	};
	return {
		useTeacherCreate,
		data,
		// teacherGroups,
		useTeacherUpdate,
		useTeacherDelete,
		teacherDataById,
		useTeacherUploadAvatar,
	};
};

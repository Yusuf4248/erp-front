import { teacherService } from "@service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ParamsType } from "@types";

const hasPageAndLimit = (p: any): p is { page: any; limit: any } =>
	p && typeof p.page !== "undefined" && typeof p.limit !== "undefined";
export const useTeachers = (params: ParamsType | {}) => {
	const queryClient = useQueryClient();
	const queryKey = ["teacher", JSON.stringify(params)];
	const { data } = useQuery({
		enabled: hasPageAndLimit(params),
		queryKey,
		queryFn: async () => teacherService.getTeacher(params),
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
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
	const useTeacherChangePassword = () => {
		return useMutation({
			mutationFn: async ({ id, data }: { id: number; data: any }) =>
				teacherService.changePassword(id, data),
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
		useTeacherUpdate,
		useTeacherChangePassword,
		useTeacherDelete,
		useTeacherUploadAvatar,
	};
};
export const useTeacherById = (id: number) => {
	const queryKey = ["teacher", "byId", id];
	const { data: teacherDataById } = useQuery({
		enabled: !!id,
		queryKey,
		queryFn: async () => teacherService.getTeacherById(id),
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
	});
	return { teacherDataById };
};
export const useTeacherGroups = () => {
	const queryKey = ["teacherGroups"];
	const { data: teacherGroup } = useQuery({
		queryKey,
		queryFn: async () => teacherService.getTeacherGroups(),
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
	});
	return { teacherGroup };
};
export const useGroupDetailsForTeacher = (id: number) => {
	const queryKey = ["groupDetailsForTeacher", id];
	const { data: groupDetailsForTeacher } = useQuery({
		enabled: !!id,
		queryKey,
		queryFn: async () => teacherService.getGroupDetailsForTeacher(id),
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
	});
	return { groupDetailsForTeacher };
};


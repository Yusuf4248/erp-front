import { studentService } from "@service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ParamsType } from "@types";

export const useStudents = (params: ParamsType | {}, id: number = 0) => {
	const queryClient = useQueryClient();
	const queryKey = ["student", JSON.stringify(params)];
	const { data } = useQuery({
		enabled: !id,
		queryKey,
		queryFn: async () => studentService.getStudent(params),
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
	});
	const { data: dataById } = useQuery({
		enabled: !!id,
		queryKey: ["student-by-id"],
		queryFn: async () => studentService.getStudentById(id),
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
	});
	const useStudentCreate = () => {
		return useMutation({
			mutationFn: async (data: any) => studentService.createStudent(data),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["student"] });
			},
		});
	};
	const useStudentUpdate = () => {
		return useMutation({
			mutationFn: async ({ id, data }: { id: number; data: any }) =>
				studentService.updateStudent(id, data),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["student"] });
			},
		});
	};
	const useStudentChangePassword = () => {
		return useMutation({
			mutationFn: async ({ id, data }: { id: number; data: any }) =>
				studentService.changePassword(id, data),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["student-by-id"] });
			},
		});
	};
	const useStudentUploadAvatar = () => {
		return useMutation({
			mutationFn: async ({ id, body }: { id: number; body: FormData }) =>
				studentService.uploadAvatar(id, body),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["student-by-id"] });
			},
		});
	};
	const useStudentDelete = () => {
		return useMutation({
			mutationFn: async (id: number) => studentService.deleteStudent(id),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["student"] });
			},
		});
	};
	return {
		useStudentCreate,
		data,
		useStudentUpdate,
		useStudentDelete,
		dataById,
		useStudentChangePassword,
		useStudentUploadAvatar,
	};
};

export const useStudentGroups = (id: number) => {
	const queryKey = ["student-groups"];

	const { data: studentGroups } = useQuery({
		enabled: !!id,
		queryKey,
		queryFn: async () => studentService.getStudentGroups(id),
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
	});
	return { studentGroups };
};

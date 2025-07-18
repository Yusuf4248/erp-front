import { groupsService } from "@service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ParamsType } from "@types";

export const useGroups = (params: ParamsType | {}, id = 0) => {
	const queryClient = useQueryClient();
	const { data } = useQuery({
		queryKey: ["groups", params],
		queryFn: async () => groupsService.getGroup(params),
	});
	const { data: dataById } = useQuery({
		queryKey: ["groupById"],
		queryFn: async () => groupsService.getGroupById(id),
	});
	const useGroupCreate = () => {
		return useMutation({
			mutationFn: async (data: any) => groupsService.createGroup(data),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["groups"] });
			},
		});
	};
	const useGroupUpdate = () => {
		return useMutation({
			mutationFn: async ({ id, data }: { id: number; data: any }) =>
				groupsService.updateGroup(id, data),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["groups"] });
			},
		});
	};
	const useGroupDelete = () => {
		return useMutation({
			mutationFn: async (id: number) => groupsService.deleteGroup(id),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["groups"] });
			},
		});
	};

	const useGroupAddStudent = () => {
		return useMutation({
			mutationFn: async ({
				groupId,
				studentId,
			}: {
				groupId: number;
				studentId: number;
			}) => groupsService.addStudentToGroup(groupId, studentId),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["groups", "add-student"] });
			},
		});
	};

	const useGroupRemoveStudent = () => {
		return useMutation({
			mutationFn: async ({
				groupId,
				studentId,
			}: {
				groupId: number;
				studentId: number;
			}) => groupsService.removeStudentFromGroup(groupId, studentId),
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: ["groups", "remove-student"],
				});
			},
		});
	};

	const useGroupAddTeacher = () => {
		return useMutation({
			mutationFn: async ({
				groupId,
				teacherId,
			}: {
				groupId: number;
				teacherId: number;
			}) => groupsService.addTeacherToGroup(groupId, teacherId),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["groups", "add-teacher"] });
			},
		});
	};
	const useGroupRemoveTeacher = () => {
		return useMutation({
			mutationFn: async ({
				groupId,
				teacherId,
			}: {
				groupId: number;
				teacherId: number;
			}) => groupsService.removeTeacherFromGroup(groupId, teacherId),
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: ["groups", "remove-teacher"],
				});
			},
		});
	};

	return {
		useGroupCreate,
		data,
		useGroupUpdate,
		useGroupDelete,
		dataById,
		useGroupAddStudent,
		useGroupRemoveStudent,
		useGroupAddTeacher,
		useGroupRemoveTeacher,
	};
};

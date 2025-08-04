import { groupsService } from "@service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ParamsType } from "@types";
export const useGroups = (params: ParamsType | {}) => {
	const queryClient = useQueryClient();
	const queryKey = ["groups", JSON.stringify(params)];
	const { data } = useQuery({
		queryKey,
		queryFn: async () => groupsService.getGroup(params),
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
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
	return {
		data,
		useGroupCreate,
		useGroupUpdate,
		useGroupDelete,
	};
};
export const useGroupById = (id: number) => {
	const { data: dataById } = useQuery({
		enabled: !!id,
		queryKey: ["groupById", id],
		queryFn: async () => groupsService.getGroupById(id),
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
	});
	return { dataById };
};
export const useGroupStudents = (id: number) => {
	const { data: students } = useQuery({
		enabled: !!id,
		queryKey: ["group-students"],
		queryFn: async () => groupsService.getGroupStudents(id),
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
	});
	return { students };
};
export const useGroupLessons = (id: number) => {
	const { data: lessons } = useQuery({
		enabled: !!id,
		queryKey: ["group-lessons"],
		queryFn: async () => groupsService.getGroupLessons(id),
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
	});
	return { lessons };
};
export const useGroupTeachers = (id: number) => {
	const { data: teachers } = useQuery({
		enabled: !!id,
		queryKey: ["group-teachers"],
		queryFn: async () => groupsService.getGroupTeachers(id),
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
	});
	return { teachers };
};
export const useGroupStudentsById = (id: number) => {
	const { data: studentsById } = useQuery({
		enabled: !!id,
		queryKey: ["group-student",id],
		queryFn: async () => groupsService.getGroupStudentsById(id),
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
	});
	return { studentsById };
};
export const useGroupMutations = () => {
	const queryClient = useQueryClient();
	const useGroupAddStudent = () => {
		return useMutation({
			mutationFn: async (data: any) => groupsService.addStudentToGroup(data),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["group-students"] });
			},
		});
	};
	const useGroupAddTeacher = () => {
		return useMutation({
			mutationFn: async (data: any) => groupsService.addTeacherToGroup(data),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["group-teachers"] });
			},
		});
	};
	return {
		useGroupAddStudent,
		useGroupAddTeacher,
	};
};

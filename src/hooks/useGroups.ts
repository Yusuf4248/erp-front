import { groupsService } from "@service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ParamsType } from "@types";

export const useGroups = (params: ParamsType) => {
	const queryClient = useQueryClient();
	const { data } = useQuery({
		queryKey: ["groups", params],
		queryFn: async () => groupsService.getGroup(params),
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
	return { useGroupCreate, data, useGroupUpdate, useGroupDelete };
};

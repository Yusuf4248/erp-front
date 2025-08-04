import { branchService } from "@service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ParamsType } from "@types";

export const useBranches = (params: ParamsType | {}) => {
	const queryClient = useQueryClient();
	const { data } = useQuery({
		queryKey: ["branches", params],
		queryFn: async () => branchService.getBranch(params),
	});
	const useBranchCreate = () => {
		return useMutation({
			mutationFn: async (data: any) => branchService.createBranch(data),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["branches"] });
			},
		});
	};
	const useBranchUpdate = () => {
		return useMutation({
			mutationFn: async ({ id, data }: { id: number; data: any }) =>
				branchService.updateBranch(id, data),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["branches"] });
			},
		});
	};
	const useBranchDelete = () => {
		return useMutation({
			mutationFn: async (id: number) => branchService.deleteBrnach(id),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["branches"] });
			},
		});
	};
	return { useBranchCreate, data, useBranchUpdate, useBranchDelete };
};

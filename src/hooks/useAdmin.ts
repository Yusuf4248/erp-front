import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminService } from "@service";

export const useAdmin = () => {
	const { data, isLoading, error } = useQuery({
		queryKey: ["admin-profile"],
		queryFn: adminService.getAdminProfile,
	});
	return { data, isLoading, error };
};
export const useAdmins = () => {
	const queryClient = useQueryClient();
	const useAdminUpdate = () => {
		return useMutation({
			mutationFn: async ({ id, data }: { id: number; data: any }) =>
				adminService.updateAdminProfile(id, data),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["admin-profile"] });
			},
		});
	};
	const changePassword = () => {
		return useMutation({
			mutationFn: async ({ id, data }: { id: number; data: any }) =>
				adminService.changePassword(id, data),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["admin-profile"] });
			},
		});
	};
	return { useAdminUpdate,changePassword };
};

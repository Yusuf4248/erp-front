import { roomsService } from "@service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ParamsType } from "@types";

export const useRoomss = (params: ParamsType | {}) => {
	const queryClient = useQueryClient();
	const { data } = useQuery({
		queryKey: ["rooms", params],
		queryFn: async () => roomsService.getRooms(params),
	});
	const useRoomsCreate = () => {
		return useMutation({
			mutationFn: async (data: any) => roomsService.createRooms(data),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["rooms"] });
			},
		});
	};
	const useRoomsUpdate = () => {
		return useMutation({
			mutationFn: async ({ id, data }: { id: number; data: any }) =>
				roomsService.updateRooms(id, data),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["rooms"] });
			},
		});
	};
	const useRoomsDelete = () => {
		return useMutation({
			mutationFn: async (id: number) => roomsService.deleteRooms(id),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["rooms"] });
			},
		});
	};

	return {
		useRoomsCreate,
		data,
		useRoomsUpdate,
		useRoomsDelete,
	};
};

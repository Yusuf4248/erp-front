import { useMutation, useQuery } from "@tanstack/react-query";
import { groupService } from "@services";
import { type GroupFormValues } from "@types";
import type { PaginationParams } from "@types";

export const useGroup = (params: PaginationParams) => {
  const getGroups = useQuery({
    queryKey: ["groups", params],
    queryFn: async () => groupService.getGroups(params),
  });

  const createGroup = () =>
    useMutation({
      mutationFn: async (group: GroupFormValues) =>
        groupService.createGroup(group),
      onSuccess: () => {
        getGroups.refetch();
      },
    });

  const updateGroup = () =>
    useMutation({
      mutationFn: async ({ id, data }: { id: number; data: GroupFormValues }) =>
        groupService.updateGroup(data, id),
      onSuccess: () => {
        getGroups.refetch();
      },
    });

  const deleteGroup = () =>
    useMutation({
      mutationFn: async (id: number) => groupService.deleteGroup(id),
      onSuccess: () => {
        getGroups.refetch();
      },
    });

  return {
    getGroups,
    createGroup,
    updateGroup,
    deleteGroup,
  };
};

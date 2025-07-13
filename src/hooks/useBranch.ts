import { useMutation, useQuery } from "@tanstack/react-query";
import { branchService } from "@services";
import type { BranchFormValues } from "@types";

export const useBranch = () => {
  const getBranches = useQuery({
    queryKey: ["branches"],
    queryFn: async () => branchService.getBranches(),
  });

  const createBranch = () =>
    useMutation({
      mutationFn: async (branch: BranchFormValues) =>
        branchService.createBranch(branch),
      onSuccess: () => {
        getBranches.refetch();
      },
    });

  const updateBranch = () =>
    useMutation({
      mutationFn: async ({
        id,
        data,
      }: {
        id: number;
        data: BranchFormValues;
      }) => branchService.updateBranch(data, id),
      onSuccess: () => {
        getBranches.refetch();
      },
    });

  const deleteBranch = () =>
    useMutation({
      mutationFn: async (id: number) => branchService.deleteBranch(id),
      onSuccess: () => {
        getBranches.refetch();
      },
    });

  return {
    getBranches,
    createBranch,
    updateBranch,
    deleteBranch,
  };
};

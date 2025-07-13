import { apiConfig } from "@api/config";
import { ApiUrls } from "@api/api-urls";
import type { BranchFormValues } from "@types";

export const branchService = {
  async getBranches() {
    const res = await apiConfig().getRequest(ApiUrls.BRANCHES);
    return res;
  },
  async createBranch(model: BranchFormValues): Promise<any> {
    const res = await apiConfig().postRequest(ApiUrls.BRANCHES, model);
    return res;
  },
  async updateBranch(model: BranchFormValues, id: number) {
    const res = await apiConfig().patchRequest(
      `${ApiUrls.BRANCHES}/${id}`,
      model
    );
    return res;
  },
  async deleteBranch(id: number) {
    const res = await apiConfig().deleteRequest(`${ApiUrls.BRANCHES}/${id}`);
    return res;
  },
};

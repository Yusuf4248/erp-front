import { apiConfig } from "@api/config";
import { ApiUrls } from "@api/api-urls";
import type { GroupFormValues, PaginationParams } from "@types";
export const groupService = {
  async getGroups(params: PaginationParams): Promise<any> {
    const res = await apiConfig().getRequest(ApiUrls.GROUPS, params);
    return res;
  },
  async createGroup(model: GroupFormValues): Promise<any> {
    const res = await apiConfig().postRequest(ApiUrls.GROUPS, model);
    return res;
  },
  async updateGroup(model: GroupFormValues, id: number) {
    const res = await apiConfig().patchRequest(
      `${ApiUrls.GROUPS}/${id}`,
      model
    );
    return res;
  },
  async deleteGroup(id: number) {
    const res = await apiConfig().deleteRequest(`${ApiUrls.GROUPS}/${id}`);
    return res;
  },
};

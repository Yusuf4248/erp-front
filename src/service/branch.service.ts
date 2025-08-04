import { ApiUrls } from "@api/api-urls";
import { apiConfig } from "@api/config";
import type { ParamsType } from "@types";

export const branchService = {
	async getBranch(params: ParamsType|{}) {
		const res = await apiConfig().getRequest(ApiUrls.BRANCHES, params);
		return res;
	},
	async deleteBrnach(id: number) {
		const res = await apiConfig().deleteRequest(`${ApiUrls.BRANCHES}/${id}`);
		return res;
	},
	async updateBranch(id: number, body: object) {
		const res = await apiConfig().updateRequest(
			`${ApiUrls.BRANCHES}/${id}`,
			body
		);
		return res;
	},
	async createBranch(body: object) {
		const res = await apiConfig().postRequest(`${ApiUrls.BRANCHES}`, body);
		return res;
	},
};

import { ApiUrls } from "@api/api-urls";
import { apiConfig } from "@api/config";
import type { ParamsType } from "@types";

export const groupsService = {
	async getGroup(params: ParamsType) {
		const res = await apiConfig().getRequest(ApiUrls.GROUPS, params);
		return res;
	},
	async deleteGroup(id: number) {
		const res = await apiConfig().deleteRequest(`${ApiUrls.GROUPS}/${id}`);
		return res;
	},
	async updateGroup(id: number, body: object) {
		const res = await apiConfig().updateRequest(
			`${ApiUrls.GROUPS}/${id}`,
			body
		);
		return res;
	},
	async createGroup(body: object) {
		const res = await apiConfig().postRequest(`${ApiUrls.GROUPS}`, body);
		return res;
	},
};

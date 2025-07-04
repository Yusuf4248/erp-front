import { ApiUrls } from "@api/api-urls";
import { apiConfig } from "@api/config";

export const groupsService = {
	async getGroup() {
		const res = await apiConfig().getRequest(ApiUrls.GROUPS);
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
	async createGroup( body: object) {
		const res = await apiConfig().postRequest(
			`${ApiUrls.GROUPS}`,
			body
		);
		return res;
	},
};

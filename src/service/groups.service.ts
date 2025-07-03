import { ApiUrls } from "@api/api-urls";
import { apiConfig } from "@api/config";

export const groupsService = {
	async getGroup() {
		const res = await apiConfig().getRequest(ApiUrls.GROUPS);
		return res;
	},
};

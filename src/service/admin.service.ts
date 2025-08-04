import { ApiUrls } from "@api/api-urls";
import { apiConfig } from "@api/config";

export const adminService = {
	async getAdminProfile() {
		const res = await apiConfig().getRequest(ApiUrls.ADMIN_PROFILE);
		return res;
	},
	async updateAdminProfile(id: number, data: any) {
		const res = await apiConfig().updateRequest(ApiUrls.UPDATE_ADMIN(id), data);
		return res;
	},
	async changePassword(id: number, data: any) {
		const res = await apiConfig().updateRequest(ApiUrls.ADMIN_CHANGE_PASSWORD(id), data);
		return res;
	},

};

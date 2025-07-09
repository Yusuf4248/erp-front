import { ApiUrls } from "@api/api-urls";
import { apiConfig } from "@api/config";
export const logoutService = {
	async signOut(role: string) {
		const res = await apiConfig().getRequest(`/${role}-auth${ApiUrls.LOGOUT}`);
		return res;
	},
};

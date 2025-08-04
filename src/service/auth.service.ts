import { ApiUrls } from "@api/api-urls";
import { apiConfig } from "@api/config";
import type { SignInType } from "@types";
export const authService = {
	async signIn(model: SignInType, role: string) {
		const res = await apiConfig().postRequest(
			`/${role}-auth${ApiUrls.AUTH}`,
			model
		);
		return res;
	},
	async forgotPassword(model: any) {
		const res = await apiConfig().postRequest(
			ApiUrls.FORGOT_PASSWORD,
			model
		);
		return res;
	},
	async verifyOtp(model: any) {
		const res = await apiConfig().postRequest(
			ApiUrls.VERIFY_OTP,
			model
		);
		return res;
	},
	async setNewPassword(model: any) {
		const res = await apiConfig().postRequest(
			ApiUrls.SET_NEW_PASSWORD,
			model
		);
		return res;
	},
};

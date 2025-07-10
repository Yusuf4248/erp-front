import { ApiUrls } from "@api/api-urls";
import { apiConfig } from "@api/config";

export const teacherService = {
	async getTeacher() {
		const res = await apiConfig().getRequest(ApiUrls.TEACHER);
		return res;
	},
	async deleteTeacher(id: number) {
		const res = await apiConfig().deleteRequest(`${ApiUrls.TEACHER}/${id}`);
		return res;
	},
	async updateTeacher(id: number, body: object) {
		const res = await apiConfig().updateRequest(
			`${ApiUrls.TEACHER}/${id}`,
			body
		);
		return res;
	},
	async createTeacher(body: object) {
		const res = await apiConfig().postRequest(`${ApiUrls.TEACHER}`, body);
		return res;
	},
};

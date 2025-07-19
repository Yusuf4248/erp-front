import { ApiUrls } from "@api/api-urls";
import { apiConfig } from "@api/config";
import type { ParamsType } from "@types";

export const courseService = {
	async getCourse(params: ParamsType|{}) {
		const res = await apiConfig().getRequest(ApiUrls.COURSES, params);
		return res;
	},
	async deleteCourse(id: number) {
		const res = await apiConfig().deleteRequest(`${ApiUrls.COURSES}/${id}`);
		return res;
	},
	async updateCourse(id: number, body: object) {
		const res = await apiConfig().updateRequest(
			`${ApiUrls.COURSES}/${id}`,
			body
		);
		return res;
	},
	async createCourse(body: object) {
		const res = await apiConfig().postRequest(`${ApiUrls.COURSES}`, body);
		return res;
	},
};

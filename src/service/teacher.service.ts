import { ApiUrls } from "@api/api-urls";
import { apiConfig } from "@api/config";
import type { ParamsType } from "@types";

export const teacherService = {
	async getTeacher(params: ParamsType|{}) {
		const res = await apiConfig().getRequest(ApiUrls.TEACHER, params);
		return res;
	},
	async getTeacherById(id: number) {
		const res = await apiConfig().getRequest(`${ApiUrls.TEACHER}/${id}`);
		return res;
	},
	async getAllTeacherGroups(id: number) {
		const res = await apiConfig().getRequest(ApiUrls.GET_ALL_TEACHER_GROUPS(id));
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
	async uploadAvatar(id: number, body: FormData) {
		const res = await apiConfig().postRequest(
			`${ApiUrls.TEACHER_PROFILE_AVATAR(id)}`,
			body
		);
		return res;
	},
};

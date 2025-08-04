import { ApiUrls } from "@api/api-urls";
import { apiConfig } from "@api/config";
import type { ParamsType } from "@types";

export const studentService = {
	async getStudent(params: ParamsType|{}) {
		const res = await apiConfig().getRequest(ApiUrls.STUDENTS, params);
		return res;
	},
	async getStudentById(id:number) {
		const res = await apiConfig().getRequest(`${ApiUrls.STUDENTS}/${id}`);
		return res;
	},
	async getStudentGroups(id:number) {
		const res = await apiConfig().getRequest(`${ApiUrls.GET_STUDENT_GROUPS(id)}`);
		return res;
	},
	async deleteStudent(id: number) {
		const res = await apiConfig().deleteRequest(`${ApiUrls.STUDENTS}/${id}`);
		return res;
	},
	async updateStudent(id: number, body: object) {
		const res = await apiConfig().updateRequest(
			`${ApiUrls.STUDENTS}/${id}`,
			body
		);
		return res;
	},
	async uploadAvatar(id: number, body: FormData) {
		const res = await apiConfig().postRequest(
			`${ApiUrls.UPLOAD_STUDENT_AVATAR(id)}`,
			body
		);
		return res;
	},
	async changePassword(id: number, body: object) {
		const res = await apiConfig().updateRequest(
			`${ApiUrls.STUDENT_CHANGE_PASSWORD(id)}`,
			body
		);
		return res;
	},
	async createStudent(body: object) {
		const res = await apiConfig().postRequest(`${ApiUrls.STUDENTS}`, body);
		return res;
	},
};

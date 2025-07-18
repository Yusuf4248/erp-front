import { ApiUrls } from "@api/api-urls";
import { apiConfig } from "@api/config";
import type { ParamsType } from "@types";

export const groupsService = {
	async getGroup(params: ParamsType | {}) {
		const res = await apiConfig().getRequest(ApiUrls.GROUPS, params);
		return res;
	},
	async getGroupById(id: Number) {
		const res = await apiConfig().getRequest(
			`${ApiUrls.GROUPS}/${id ? id : 0}`
		);
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

	async addStudentToGroup(groupId: number, studentId: number) {
		const res = await apiConfig().updateRequest(
			`${ApiUrls.addStudent(groupId, studentId)}`,
			{}
		);
		return res;
	},
	async removeStudentFromGroup(groupId: number, studentId: number) {
		const res = await apiConfig().updateRequest(
			`${ApiUrls.removeStudent(groupId, studentId)}`,
			{}
		);
		return res;
	},
	async addTeacherToGroup(groupId: number, teacherId: number) {
		const res = await apiConfig().updateRequest(
			`${ApiUrls.addTeacher(groupId, teacherId)}`,
			{}
		);
		return res;
	},
	async removeTeacherFromGroup(groupId: number, teacherId: number) {
		const res = await apiConfig().updateRequest(
			`${ApiUrls.removeTeacher(groupId, teacherId)}`,
			{}
		);
		return res;
	},
};

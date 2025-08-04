import { ApiUrls } from "@api/api-urls";
import { apiConfig } from "@api/config";

export const attendanceService = {
	async bulkUpdateAttendance(body: object) {
		const res = await apiConfig().postRequest(ApiUrls.ATTENDANCE_BULK_UPDATE, body);
		return res;
	},
	async changeStudentAttendance(id: number,body:any) {
		const res = await apiConfig().updateRequest(ApiUrls.CHANGE_STUDENT_ATTENDANCE(id), body);
		return res;
	},

	async getAllAttendanceByLessonId(id: number) {
		const res = await apiConfig().getRequest(ApiUrls.GET_ALL_ATTENDANCE_BY_LESSON_ID(id));
		return res;
	},
	async getAllStudentAttendanceByGroupId(studentId: number, groupId: number) {
		const res = await apiConfig().getRequest(
			ApiUrls.GET_ALL_STUDENT_ATTENDANCE_BY_GROUP_ID(studentId, groupId)
		);
		return res;
	},
};
import { ApiUrls } from "@api/api-urls";
import { apiConfig } from "@api/config";

export const attendanceService = {
	async bulkUpdateAttendance(body: object) {
		const res = await apiConfig().postRequest(ApiUrls.ATTENDANCE_BULK_UPDATE, body);
		return res;
	},
	async getAllAttendanceByLessonId(id: number) {
		const res = await apiConfig().getRequest(ApiUrls.GET_ALL_ATTENDANCE_BY_LESSON_ID(id));
		return res;
	},
};
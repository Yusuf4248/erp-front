import { useMutation, useQuery } from "@tanstack/react-query";
import { attendanceService } from "../service";

export const useAttendance = (id: number=0) => {
	const useAttendanceBulkUpdate = () => {
		return useMutation({
			mutationFn: (body: object) => attendanceService.bulkUpdateAttendance(body),
		});
	};
	const useAttendanceGetAllByLessonId = () => {
		return useQuery({
			queryKey: ["attendance", id],
			queryFn: () => attendanceService.getAllAttendanceByLessonId(id),
		});
	};
	return {
		useAttendanceBulkUpdate,
		useAttendanceGetAllByLessonId,
	};
};

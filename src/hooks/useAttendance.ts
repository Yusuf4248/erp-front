import {
	useMutation,
	useQueries,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { attendanceService } from "../service";
export const useAttendanceByLessonId = (lessonId: number) => {
	const { data, isLoading, error } = useQuery({
		enabled: !!lessonId,
		queryKey: ["attendance", "lesson", lessonId],
		queryFn: () => attendanceService.getAllAttendanceByLessonId(lessonId),
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
	});
	return { data, isLoading, error };
};
export const useAttendanceByLessonIds = (lessonIds: number[]) => {
	const queries = lessonIds.map((lessonId) => ({
		enabled: !!lessonId,
		queryKey: ["attendance", "lesson", lessonId],
		queryFn: () => attendanceService.getAllAttendanceByLessonId(lessonId),
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
	}));
	const results = useQueries({
		queries,
		combine: (results) => {
			return {
				data: results.map((result) => result.data),
				pending: results.some((result) => result.isPending),
				error: results.find((result) => result.error)?.error,
			};
		},
	});
	return results;
};
export const useAttendanceMutations = () => {
	const queryClient = useQueryClient();
	const useAttendanceBulkUpdate = () => {
		return useMutation({
			mutationFn: (body: object) =>
				attendanceService.bulkUpdateAttendance(body),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["attendance"] });
			},
		});
	};
	const useChangeStudentAttendance = () => {
		return useMutation({
			mutationFn: ({ id, body }: any) =>
				attendanceService.changeStudentAttendance(id, body),
			// onSuccess:()=>{
			// 	queryClient.invalidateQueries
			// }
		});
	};
	return {
		useAttendanceBulkUpdate,
		useChangeStudentAttendance,
	};
};
export const useStudentAttendanceByGroupId = (
	studentId: number,
	groupId: number
) => {
	const { data, isLoading, error } = useQuery({
		enabled: !!studentId && !!groupId,
		queryKey: ["attendance", "student", studentId, groupId],
		queryFn: () =>
			attendanceService.getAllStudentAttendanceByGroupId(studentId, groupId),
	});
	return { data, isLoading, error };
};

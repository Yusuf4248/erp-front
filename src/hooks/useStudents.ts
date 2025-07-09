import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { studentService } from "../service";

export const useStudents = () => {
	const queryClient = useQueryClient();
	const { data } = useQuery({
		queryKey: ["student"],
		queryFn: async () => studentService.getStudent(),
	});
	const useStudentCreate = () => {
		return useMutation({
			mutationFn: async (data: any) => studentService.createStudent(data),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["student"] });
			},
		});
	};
	const useStudentUpdate = () => {
		return useMutation({
			mutationFn: async ({ id, data }: { id: number; data: any }) =>
				studentService.updateStudent(id, data),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["student"] });
			},
		});
	};
	const useStudentDelete = () => {
		return useMutation({
			mutationFn: async (id: number) => studentService.deleteStudent(id),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["student"] });
			},
		});
	};
	return { useStudentCreate, data, useStudentUpdate, useStudentDelete };
};

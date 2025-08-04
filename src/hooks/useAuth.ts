import { useMutation } from "@tanstack/react-query";
import { authService } from "../service";
import { type SignInType } from "./../types/auth";

export const useAuth = () => {
	return useMutation({
		mutationFn: async ({ data, role }: { data: SignInType; role: string }) =>
			authService.signIn(data, role),
	});
	
};
export const useForgotPassword = () => {
	return useMutation({
		mutationFn: async (data: any) => authService.forgotPassword(data),
	});
};
export const useVerifyOtp = () => {
	return useMutation({
		mutationFn: async (data: any) => authService.verifyOtp(data),
	});
};
export const useSetNewPassword = () => {
	return useMutation({
		mutationFn: async (data: any) => authService.setNewPassword(data),
	});
};
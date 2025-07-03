import { Notification } from "@helpers";
import axiosInstance from ".";

export function apiConfig() {
	async function getRequest(url: string, params: object = {}) {
		try {
			const res = await axiosInstance.get(url, { params });
			return res;
		} catch (error) {
			console.log(error);
		}
	}
	async function postRequest(url: string, body: object = {}) {
		try {
			const res = await axiosInstance.post(url, body);
			return res;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			Notification("error", error?.message);
		}
	}

	return {
		getRequest,
		postRequest,
	};
}

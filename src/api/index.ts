import { removeItem } from "@helpers";
import axios from "axios";

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
	const access_token = localStorage.getItem("access_token");
	if (access_token) {
		config.headers["Authorization"] = `Bearer ${access_token}`;
	}
	return config;
});

axiosInstance.interceptors.response.use(
	(res) => res,
	async (err) => {
		if (err.response && err.response.status === 401) {
			removeItem("access_token");
			removeItem("role");
			window.location.href = "/";
		}
		return Promise.reject(err);
	}
);

export default axiosInstance;

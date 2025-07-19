import { ApiUrls } from "@api/api-urls";
import { apiConfig } from "@api/config";
import type { ParamsType } from "@types";

export const roomsService = {
	async getRooms(params: ParamsType|{}) {
		const res = await apiConfig().getRequest(ApiUrls.ROOMS, params);
		return res;
	},
	async deleteRooms(id: number) {
		const res = await apiConfig().deleteRequest(`${ApiUrls.ROOMS}/${id}`);
		return res;
	},
	async updateRooms(id: number, body: object) {
		const res = await apiConfig().updateRequest(`${ApiUrls.ROOMS}/${id}`, body);
		return res;
	},
	async createRooms(body: object) {
		const res = await apiConfig().postRequest(`${ApiUrls.ROOMS}`, body);
		return res;
	},
};

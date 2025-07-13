import { apiConfig } from "@api/config";
import { ApiUrls } from "@api/api-urls";
import type { Course } from "@types";

export const courseService = {
  async getCourses() {
    const res = await apiConfig().getRequest(ApiUrls.COURSES);
    return res;
  },
  async createCourse(model: Course): Promise<any> {
    const res = await apiConfig().postRequest(ApiUrls.COURSES, model);
    return res;
  },
  async updateCourse(model: Course, id: number) {
    const res = await apiConfig().patchRequest(
      `${ApiUrls.COURSES}/${id}`,
      model
    );
    return res;
  },
  async deleteCourse(id: number) {
    const res = await apiConfig().deleteRequest(`${ApiUrls.COURSES}/${id}`);
    return res;
  },
};

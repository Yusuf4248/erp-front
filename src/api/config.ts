import axiosInstance from ".";
import { Notification } from "@helpers";

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
      Notification("success", res.data.message);
      return res;
    } catch (error: any) {
      Notification("error", error?.message);
    }
  }
  async function putRequest(url: string, body: object = {}) {
    try {
      const res = await axiosInstance.put(url, body);
      return res;
    } catch (error: any) {
      Notification("error", error?.message);
    }
  }
  async function patchRequest(url: string, body: object = {}) {
    try {
      const res = await axiosInstance.patch(url, body);
      return res;
    } catch (error: any) {
      Notification("error", error?.message);
    }
  }
  async function deleteRequest(url: string, body: object = {}) {
    try {
      const res = await axiosInstance.delete(url, body);
      return res;
    } catch (error: any) {
      Notification("error", error?.message);
    }
  }
  return {
    getRequest,
    postRequest,
    putRequest,
    deleteRequest,
    patchRequest,
  };
}

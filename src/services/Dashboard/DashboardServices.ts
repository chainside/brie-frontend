import { FilterDashboard } from "../../types/types";
import axiosInstance from "../axiosConfig";

const GET_DASHBOARD_INFO = {
    path: "dashboard",
    method: "GET"
}

export const getDashboardInfo = async (filter: FilterDashboard) => {
    const api = GET_DASHBOARD_INFO.path;


    return await axiosInstance(api, {
        withCredentials: true,
        method: GET_DASHBOARD_INFO.method,
        params: {
            ...filter
        },
    }).then((res) => {
        return res.data
    }).catch(() => {
        return null;
    });
}
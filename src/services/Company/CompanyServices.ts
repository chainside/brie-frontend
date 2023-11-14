import axiosInstance from "../axiosConfig";

const GET_COUNTRIES = {
    path: "company/getCountries",
    method: "GET"
}

export const getCountries = async () => {
    const api = GET_COUNTRIES.path;


    return await axiosInstance(api, {
        withCredentials: true,
        method: GET_COUNTRIES.method,

    }).then((res) => {
        return res.data
    }).catch(() => {
        return null;
    });
}
import axios from "axios";

const axiosInstance = axios.create({

    baseURL: `${process.env.REACT_APP_API_BASE_URL}/api/v1`
});

export default axiosInstance;

import axios, { AxiosError } from "axios";
import { CONFIG_URL } from "./config.enum";
const axiosClient = axios.create({
    baseURL: CONFIG_URL.BASE_URL,
    headers: {
        TokenCybersoft: CONFIG_URL.BASE_TOKEN,
        "Content-Type": "application/json",
    },
});

// setup response interceptor
interface ErrorResponse {
    content: string;
}
axiosClient.interceptors.response.use(
    (response) => {
        // call api thành công, ta có thể modify response trước khi trả ra cho nơi gọi api request
        // response.data (format của axios) .content là ( format do backend thiết kế)
        return response.data;
    },
    (error: AxiosError<ErrorResponse>) => {
        Promise.reject(error.response?.data);
    }
);
export default axiosClient;

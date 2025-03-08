import axios from "axios";
import { accessTokenUrl } from "./ApiUrl";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// set headers
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken")
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// extend the life span of access token when refresh token is valid

axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true
            const refreshToken = localStorage.getItem("refreshToken")

            if (!refreshToken) {
                return Promise.reject(error)
            }

            try {
                const response = await axiosInstance.post(accessTokenUrl, {}, {
                    headers: {
                        "Authorization": `Bearer ${refreshToken}`
                    }
                })
                const accessToken = response.data.data.accessToken

                axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`

                originalRequest.headers["Authorization"] = `Bearer ${accessToken}`

                localStorage.setItem("accessToken", accessToken)
                return axiosInstance(originalRequest)

            } catch (refreshError) {
                return Promise.reject(refreshError)
            }
        }
        return Promise.reject(error)
    }
)


export default axiosInstance
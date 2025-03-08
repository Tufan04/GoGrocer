import axiosInstance from "../config/AxiosInstance"
import { userDetailsUrl } from "../config/ApiUrl"

const fetchUserDetails = async () => {
    try {
        const response = await axiosInstance.get(userDetailsUrl)
        return response.data
    } catch (error) {
        return error
    }
}

export default fetchUserDetails
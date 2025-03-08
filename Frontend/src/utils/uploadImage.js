import { uploadImageUrl } from "../config/ApiUrl"
import axiosInstance from "../config/AxiosInstance"
import { errorToast } from "./ToastHandler"

const uploadImage = async (image) => {
    try {
        const formData = new FormData()
        formData.append("image", image)

        const response = await axiosInstance.post(uploadImageUrl, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        return response

    } catch (error) {
        errorToast(error)
        return 
    }
}

export default uploadImage
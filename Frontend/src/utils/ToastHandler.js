import toast from "react-hot-toast"

export const errorToast = (error) => {
    toast.error(error?.response?.data?.message)
}

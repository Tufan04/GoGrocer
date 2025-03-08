import { getCartUrl, removeFromCartUrl, updateCartUrl } from "../config/ApiUrl"
import axiosInstance from "../config/AxiosInstance"
import { setCartProducts } from "../redux/cartSlice"
import { errorToast } from "./ToastHandler"


export const fetchCartProducts = async (dispatch) => {
    try {
        const response = await axiosInstance.get(getCartUrl)
        if (response?.data.success) {
            dispatch(setCartProducts(response?.data.data))
        }
    } catch (error) {
        errorToast(error)
    }
    return
}

export const updateCartProduct = async (cartProductId, newQuantity,dispatch) => {
    try {
        const response = await axiosInstance.put(updateCartUrl, {
            cartProductId: cartProductId,
            quantity: newQuantity
        })
        if (response.data?.success) {
            fetchCartProducts(dispatch)
        }
    } catch (error) {
        errorToast(error)
    }
}
export const deleteCartProduct = async (cartProductId,dispatch) => {
    try {
        const response = await axiosInstance.delete(removeFromCartUrl, {
            data: {
                cartProductId: cartProductId,
            }
        })
        if (response.data?.success) {
            fetchCartProducts(dispatch)
        }
    } catch (error) {
        errorToast(error)
    }
}
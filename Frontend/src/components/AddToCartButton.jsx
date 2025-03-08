import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { deleteCartProduct, fetchCartProducts, updateCartProduct } from "../utils/fetchCartProducts"
import { errorToast } from "../utils/ToastHandler"
import axiosInstance from "../config/AxiosInstance"
import { addToCartUrl } from "../config/ApiUrl"
import toast from "react-hot-toast"
import { FaMinus, FaPlus } from "react-icons/fa6";


function AddToCartButton({ product }) {
    const dispatch = useDispatch()
    const cartProducts = useSelector((state) => state.cart.cartProducts)
    const [quantity, setQuantity] = useState(0)
    const [isExistInCart, setIsExistInCart] = useState()
    const [cartItemDetails, setCartItemDetails] = useState()

    useEffect(() => {
        const checkingitem = cartProducts.some(item => item.productId?._id === product._id)
        setIsExistInCart(checkingitem)

        const item = cartProducts.find(item => item.productId?._id === product._id)
        setQuantity(item?.quantity)
        setCartItemDetails(item)
    }, [product, cartProducts])

    const addToCartProduct = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        try {
            const response = await axiosInstance.post(addToCartUrl, {
                productId: product._id,
            })
            if (response.data?.success) {
                fetchCartProducts(dispatch)
            }
        } catch (error) {
            errorToast(error)
        }
    }

    const incrementProductHandler = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (quantity < 10) {
            updateCartProduct(cartItemDetails?._id, quantity + 1, dispatch)
        }
        else {
            toast.error("You can add maximum 10")
        }
    }
    const decrementProductHandler = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (quantity > 1) {
            updateCartProduct(cartItemDetails?._id, quantity - 1, dispatch)
        }
        else {
            deleteCartProduct(cartItemDetails?._id, dispatch)
        }
    }
    return (
        <div>
            {
                isExistInCart ? (
                    <div className="bg-green-700 border border-green-600 rounded-md text-md text-white font-semibold px-2 py-1 w-16 flex gap-1 justify-between items-center cursor-pointer"
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                        }}>
                        <div className="font-bold h-full"
                            onClick={decrementProductHandler}>
                            <FaMinus size={14}/>
                        </div>
                        <div>{quantity}</div>
                        <div className="font-bold h-full"
                            onClick={incrementProductHandler}>
                            <FaPlus size={14}/>
                        </div>

                    </div>
                ) : (
                    <button className="bg-green-50 border border-green-600 rounded-md text-sm text-green-600 font-semibold px-4 py-1"
                        onClick={addToCartProduct}
                    >
                        ADD
                    </button>
                )
            }
        </div>
    )
}

export default AddToCartButton
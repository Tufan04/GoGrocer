import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { deleteCartProduct, fetchCartProducts, updateCartProduct } from "../utils/fetchCartProducts.js";
import { errorToast } from "../utils/ToastHandler.js";
import axiosInstance from "../config/AxiosInstance";
import { addToCartUrl } from "../config/ApiUrl";
import toast from "react-hot-toast";
import { FaMinus, FaPlus } from "react-icons/fa6";

function AddToCartButton({ product }) {
    const dispatch = useDispatch();
    const cartProducts = useSelector((state) => state.cart.cartProducts);
    const [quantity, setQuantity] = useState(0);
    const [isExistInCart, setIsExistInCart] = useState(false);
    const [cartItemDetails, setCartItemDetails] = useState(null);
    const [loading, setLoading] = useState(false); // State for showing the loader

    useEffect(() => {
        const item = cartProducts.find(item => item.productId?._id === product._id);
        setIsExistInCart(!!item);
        setQuantity(item?.quantity || 0);
        setCartItemDetails(item);
    }, [product, cartProducts]);

    const addToCartProduct = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setLoading(true);
        try {
            const response = await axiosInstance.post(addToCartUrl, {
                productId: product._id,
            });
            if (response.data?.success) {
                fetchCartProducts(dispatch);
            }
        } catch (error) {
            errorToast(error);
        }
        setLoading(false);
    };

    const incrementProductHandler = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (quantity < 10) {
            setLoading(true);
            await updateCartProduct(cartItemDetails?._id, quantity + 1, dispatch);
            setLoading(false);
        } else {
            toast.error("You can add a maximum of 10");
        }
    };

    const decrementProductHandler = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (quantity > 1) {
            setLoading(true);
            await updateCartProduct(cartItemDetails?._id, quantity - 1, dispatch);
            setLoading(false);
        } else {
            setLoading(true);
            await deleteCartProduct(cartItemDetails?._id, dispatch);
            setLoading(false);
        }
    };

    return (
        <div>
            {isExistInCart ? (
                <div
                    className="bg-green-700 border border-green-600 rounded-md text-md text-white font-semibold px-2 py-1 w-16 flex gap-1 justify-between items-center cursor-pointer"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                >
                    <div className="font-bold h-full" onClick={decrementProductHandler}>
                        <FaMinus size={14} />
                    </div>
                    {
                        loading ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                        ) : (
                            <div>{quantity}</div>
                        )
                    }
                    <div className="font-bold h-full" onClick={incrementProductHandler}>
                        <FaPlus size={14} />
                    </div>
                </div>
            ) : (
                <button
                    className="bg-green-50 border border-green-600 rounded-md text-sm text-green-600 font-semibold px-4 py-1 flex justify-center items-center"
                    onClick={addToCartProduct}
                    disabled={loading}
                >
                    {loading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-green-600"></div>
                    ) : (
                        "ADD"
                    )}
                </button>
            )}
        </div>
    );
}

export default AddToCartButton;

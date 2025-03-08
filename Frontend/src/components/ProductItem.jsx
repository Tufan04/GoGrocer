import React, { useState } from 'react'
import ConfirmBox from "../components/ConfirmBox"
import EditProductItem from "./EditProductItem"
import axiosInstance from "../config/AxiosInstance"
import { deleteProductUrl } from "../config/ApiUrl"
import { errorToast } from "../utils/ToastHandler.js"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { deleteProduct } from "../redux/productSlice"

function ProductItem({ item }) {
    const [openEdit, setOpenEdit] = useState(false)
    const [openDeleteConfirmBox, setOpenDeleteConfirmBox] = useState(false)
    const [productItemData, setProductItemData] = useState({
        ...item
    })
    const dispatch = useDispatch()
    const deleteProductHandler = async () => {
        try {
            const response = await axiosInstance.delete(
                deleteProductUrl, {
                data: {
                    id: productItemData._id
                }
            })
            if (!response) {
                toast.error(response.data.message)
            }
            if (response.data.success) {
                toast.success(response.data.message)
                dispatch(deleteProduct(productItemData._id))
                setOpenDeleteConfirmBox(false)
            }
        } catch (error) {
            errorToast(error)
        }
    }
    return (
        <div className="mt-4">
            <div className="w-40 rounded-xl overflow-hidden shadow-lg p-4 flex flex-col justify-center items-center bg-white">
                {/* product Image */}
                <img
                    className="w-full h-24 object-cover rounded-md"
                    src={item.image[0]}
                    alt={item.name}
                />

                {/* product Name */}
                <h2 className="mt-3 text-base font-semibold text-gray-800 w-full text-center truncate">
                    {item.name.length > 15 ? `${item.name.slice(0, 15)}...` : item.name}
                </h2>

                {/* Unit & Price */}
                <div className="w-full flex justify-between mt-2">
                    <p className="text-sm text-gray-600 mt-1">{item.unit}</p>
                    <p className="text-sm font-semibold text-gray-900 mt-1">₹{item.price}</p>
                </div>
                {/* Edit and delete  */}
                <div className="w-full flex justify-around mt-3">
                    <div className="w-fit px-2 py-1 bg-green-200 cursor-pointer rounded font-semibold text-green-800"
                        onClick={() => { setOpenEdit(true) }}
                    >
                        Edit
                    </div>
                    <div className="w-fit px-2 py-1 bg-red-200 cursor-pointer rounded font-semibold text-red-800"
                        onClick={() => { setOpenDeleteConfirmBox(true) }}
                    >
                        Delete
                    </div>
                </div>
            </div>

            {
                openEdit &&
                <EditProductItem
                    productItemData={item}
                    close={() => setOpenEdit(false)} />
            }
            {
                openDeleteConfirmBox &&
                <ConfirmBox
                    cancel={() => setOpenDeleteConfirmBox(false)}
                    confirm={deleteProductHandler}
                />
            }
        </div>
    )
}

export default ProductItem